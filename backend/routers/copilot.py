# Copilot Service - Updated for Hybrid RAG Integration
import os
import logging
import time  # Import time module
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import requests
from concurrent.futures import ThreadPoolExecutor
from backend.services.copilot_service import get_copilot_response
from backend.db_setup import connect_to_db
import aiohttp

logger = logging.getLogger(__name__)
router = APIRouter()


class CopilotRequest(BaseModel):
    user_query: str
    company_ids: Optional[List[int]] = None
    context: Optional[dict] = None
    raw_only: bool = False


async def make_request(url: str, method: str = "POST", json_data: dict = None, headers: dict = None) -> Dict[
    str, Any]:
    """Async HTTP request to prevent thread pool starvation"""
    try:
        timeout = aiohttp.ClientTimeout(total=20)

        async with aiohttp.ClientSession(timeout=timeout) as session:
            if method.upper() == "GET":
                async with session.get(url, headers=headers) as response:
                    response.raise_for_status()
                    return await response.json()
            else:
                async with session.post(url, json=json_data, headers=headers) as response:
                    response.raise_for_status()
                    return await response.json()
    except Exception as e:
        raise Exception(f"Async request to {url} failed: {str(e)}")


def make_request(url: str, method: str = "GET", json_data: dict = None, headers: dict = None) -> Dict[str, Any]:
    """Synchronous HTTP request - your original function"""
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        else:
            response = requests.post(url, json=json_data, headers=headers, timeout=30)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        raise Exception(f"Request to {url} failed: {str(e)}")


def get_company_numbers_from_db(resolved_companies: List[Dict[str, Any]]) -> List[int]:
    """Get company_numbers from PostgreSQL using resolved companies."""
    if not resolved_companies:
        return []

    conn = None
    cursor = None
    company_numbers = []

    try:
        conn = connect_to_db()
        cursor = conn.cursor()

        for company in resolved_companies:
            ticker = company.get('ticker', '')
            full_name = company.get('full_name', '').lower()

            # Strategy 1: Try exact ticker match first
            cursor.execute(
                "SELECT id FROM company_detail WHERE UPPER(ticker) = UPPER(%s)",
                (ticker,)
            )
            result = cursor.fetchone()
            if result:
                company_numbers.append(result[0])
                continue

            # Strategy 2: Try fuzzy full_name matching
            cursor.execute(
                "SELECT id FROM company_detail WHERE lower(company_detail.full_name) ILIKE %s LIMIT 1",
                (f"%{full_name}%",)
            )
            result = cursor.fetchone()
            if result:
                company_numbers.append(result[0])

    except Exception as e:
        logger.error(f"Database error: {str(e)}", exc_info=True)
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()

    return company_numbers


def build_financials_url(base_url: str, endpoint_mode: str, company_id: int,
                         statement_type: str, parameters: List[str] = None) -> str:
    """Build appropriate financials URL based on endpoint mode"""
    if endpoint_mode == "parameters" and parameters:
        # The POST endpoint requires company_number and statement_type as query params
        return f"{base_url}/parameters?company_number={company_id}&statement_type={statement_type}"
    else:
        return f"{base_url}?company_number={company_id}&statement_type={statement_type}&start_year=2021&end_year=2023"


def build_ratios_url(base_url: str, endpoint_mode: str) -> str:
    """Build appropriate ratios URL based on endpoint mode"""
    if endpoint_mode == "parameters":
        return f"{base_url}/parameters"
    else:
        return base_url


def prepare_financials_payload(endpoint_mode: str, company_id: int, statement_type: str,
                               parameters: List[str] = None) -> Dict[str, Any]:
    """Prepare payload for financials request"""
    if endpoint_mode == "parameters" and parameters:
        # The payload only contains what's in the Pydantic model (body)
        return {
            "parameters": parameters,
            "start_year": 2021,
            "end_year": 2023
        }
    return None  # GET request, no payload needed


def prepare_ratios_payload(endpoint_mode: str, company_ids: List[int],
                           parameters: List[str] = None) -> Dict[str, Any]:
    """Prepare payload for ratios request"""
    if endpoint_mode == "parameters" and parameters:
        return {
            "company_numbers": company_ids,
            "parameters": parameters,
            "start_year": 2021,
            "end_year": 2023
        }
    return None


def prepare_chart_request(chart_endpoint_type: str, company_ids: List[int],
                          parameters: List[str]) -> Dict[str, Any]:
    """Prepare chart request based on endpoint type"""
    return {
        "company_numbers": company_ids,
        "parameters": parameters[:5],  # Limit to 5 parameters for chart clarity
        "start_year": 2021,
        "end_year": 2023,
        "chart_type": "line"
    }


@router.post("/ask")
async def ask_copilot(request: CopilotRequest):
    """Enhanced Copilot endpoint with intelligent routing and parameter filtering"""
    request_start_time = time.time()
    logger.info("Copilot /ask endpoint called.")

    # Environment URLs
    overview_base_url = os.getenv("OVERVIEW_BASE_URL", "https://quanvest.me/overview/company")
    charts_base_url = os.getenv("CHARTS_BASE_URL", "https://quanvest.me/charts")
    colab_url = os.getenv("COLAB_URL", "https://d446-35-186-162-107.ngrok-free.app")
    financials_base_url = os.getenv("FINANCIALS_BASE_URL", "https://quanvest.me/financials")
    ratio_base_url = os.getenv("RATIO_BASE_URL", "https://quanvest.me/ratios")
    shareholding_base_url = os.getenv("SHAREHOLDING_BASE_URL", "https://quanvest.me/shareholding_pattern")

    standard_headers = {'Content-Type': 'application/json'}
    ngrok_headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }

    # Step 1: Get enhanced context from Flask
    enhanced_context_data = {}
    display_recommendations = {}
    classification = {}

    try:
        logger.info("Calling Flask /enhanced_retrieve for hybrid context")
        colab_call_start_time = time.time()
        enhanced_response = await make_request(
            f"{colab_url}/enhanced_retrieve",
            "POST",
            {"query": request.user_query},
            ngrok_headers
        )
        colab_call_duration = time.time() - colab_call_start_time
        logger.info(f"Flask /enhanced_retrieve call completed in {colab_call_duration:.2f} seconds.")

        enhanced_context_data = enhanced_response
        combined_context = enhanced_response.get('combined_context', '')
        classification = enhanced_response.get('classification', {})
        display_recommendations = classification.get('display_components', {})

        logger.info(f"Classification: {classification} ")
        logger.info(f"Display recommendations: {display_recommendations}")

    except Exception as e:
        logger.error(f"Enhanced retrieve failed: {str(e)}")
        enhanced_context_data = {"error": str(e)}

        # Fix: Don't use empty context, create minimal context from classification
        if "timeout" in str(e).lower():
            combined_context = f"Query classified as: {request.user_query}\nDataSource: hybrid analysis requested\nNote: Some context retrieval timed out but continuing with available data."
        else:
            combined_context = f"Processing query: {request.user_query}\nFallback context due to retrieval issues."

        display_recommendations = {
            "llm_response": True,
            "table": False,
            "chart": False,
            "company_overview": False,
            "shareholding": False
        }
        classification = {
            "required_sql_tables": [],
            "endpoint_type": "financials",
            "endpoint_mode": "base"
        }

    # Step 2: Extract classification details
    endpoint_type = classification.get('endpoint_type', 'financials')
    endpoint_mode = classification.get('endpoint_mode', 'base')
    chart_endpoint_type = classification.get('chart_endpoint_type', 'parameters')
    chart_parameters = classification.get('chart_parameters', [])
    identified_parameters = classification.get('identified_parameters', {})
    required_sql_tables = classification.get('required_sql_tables', [])

    # Step 3: Determine company IDs
    company_ids_to_use = request.company_ids
    if not company_ids_to_use:
        resolved_companies = enhanced_context_data.get('resolved_companies', [])
        if resolved_companies:
            company_ids_to_use = get_company_numbers_from_db(resolved_companies)
            logger.info(f"Extracted company IDs: {company_ids_to_use}")

    # Step 4: Check if shareholding data is needed based on classification
    fetch_shareholding = 'shareholder' in required_sql_tables
    if fetch_shareholding:
        display_recommendations['shareholding'] = True
        logger.info("Shareholding data fetch enabled based on query classification")

    # Step 5: Prepare parallel tasks with intelligent routing
    all_tasks_lambdas = []
    task_order = []  # Keep track of task types for proper segmentation

    # Company Overview tasks (conditional)
    if display_recommendations.get('company_overview', False) and company_ids_to_use:
        for company_id in company_ids_to_use:
            if isinstance(company_id, int) and company_id > 0:
                current_overview_url = f"{overview_base_url}/{company_id}"
                all_tasks_lambdas.append(
                    lambda url=current_overview_url: make_request(url, "GET", headers=standard_headers)
                )
                task_order.append('overview')
        logger.info(f"Added {len(company_ids_to_use)} overview tasks")

    # Shareholding Pattern tasks (conditional) - Using classification data
    if fetch_shareholding and company_ids_to_use:
        for company_id in company_ids_to_use:
            if isinstance(company_id, int) and company_id > 0:
                shareholding_url = f"{shareholding_base_url}?company_number={company_id}"
                all_tasks_lambdas.append(
                    lambda url=shareholding_url: make_request(url, "GET", headers=standard_headers)
                )
                task_order.append('shareholding')
        logger.info(f"Added {len(company_ids_to_use)} shareholding pattern tasks")

    # Chart tasks (conditional with intelligent endpoint selection)
    if display_recommendations.get('chart', False) and company_ids_to_use and chart_parameters:
        chart_url = f"{charts_base_url}/{chart_endpoint_type}"
        chart_payload = prepare_chart_request(chart_endpoint_type, company_ids_to_use, chart_parameters)

        all_tasks_lambdas.append(
            lambda: make_request(chart_url, "POST", chart_payload, standard_headers)
        )
        task_order.append('chart')
        logger.info(f"Added chart task for {chart_endpoint_type} with parameters: {chart_parameters[:3]}")
    else:
        all_tasks_lambdas.append(lambda: {})  # Empty placeholder
        task_order.append('chart')

    # Financial/Ratio data tasks (conditional with parameter filtering)
    if display_recommendations.get('table', False) and company_ids_to_use:
        if endpoint_type == 'ratios':
            # Use ratios endpoint
            ratio_url = build_ratios_url(ratio_base_url, endpoint_mode)
            ratio_payload = prepare_ratios_payload(
                endpoint_mode,
                company_ids_to_use,
                identified_parameters.get('financial_ratios', [])
            )

            if endpoint_mode == "parameters" and ratio_payload:
                # Capture url and payload in lambda to avoid scope issues
                all_tasks_lambdas.append(
                    lambda url=ratio_url, payload=ratio_payload: make_request(url, "POST", payload, standard_headers)
                )
                task_order.append('financial')
                logger.info(f"Added filtered ratios task with parameters: {ratio_payload['parameters']}")
            else:
                # Use base ratios endpoint (full table)
                for cid in company_ids_to_use:
                    full_ratio_url = f"{ratio_base_url}?company_numbers={cid}&start_year=2021&end_year=2023"
                    all_tasks_lambdas.append(
                        lambda url=full_ratio_url: make_request(url, "GET", headers=standard_headers)
                    )
                    task_order.append('financial')
                logger.info("Added full ratios table tasks")

        else:
            # Use financials endpoint
            for cid in company_ids_to_use:
                for table in identified_parameters.keys():
                    if table in ['balance_sheet', 'profit_and_loss', 'cashflow'] and identified_parameters[table]:
                        fin_url = build_financials_url(
                            financials_base_url, endpoint_mode, cid, table, identified_parameters[table]
                        )
                        fin_payload = prepare_financials_payload(
                            endpoint_mode, cid, table, identified_parameters[table]
                        )

                        if endpoint_mode == "parameters" and fin_payload:
                            # Correctly capture url and payload for the lambda
                            all_tasks_lambdas.append(
                                lambda url=fin_url, payload=fin_payload: make_request(url, "POST", payload, standard_headers)
                            )
                            task_order.append('financial')
                            logger.info(f"Added filtered {table} task with parameters: {fin_payload['parameters']}")
                        else:
                            all_tasks_lambdas.append(
                                lambda url=fin_url: make_request(url, "GET", headers=standard_headers)
                            )
                            task_order.append('financial')
                            logger.info(f"Added full {table} table task")
    else:
        all_tasks_lambdas.append(lambda: {})  # Empty placeholder
        task_order.append('financial')

    # Step 6: Execute parallel tasks
    loop = asyncio.get_event_loop()
    results = []
    if all_tasks_lambdas:
        parallel_fetch_start_time = time.time()
        with ThreadPoolExecutor(max_workers=len(all_tasks_lambdas)) as executor:
            futures = [loop.run_in_executor(executor, task_lambda) for task_lambda in all_tasks_lambdas]
            results = await asyncio.gather(*futures, return_exceptions=True)
        parallel_fetch_duration = time.time() - parallel_fetch_start_time
        logger.info(f"Parallel data fetch completed in {parallel_fetch_duration:.2f} seconds for {len(all_tasks_lambdas)} tasks.")

    # Step 7: Process results
    all_responses = []
    for r in results:
        if isinstance(r, Exception):
            logger.error(f"Error in parallel fetch: {str(r)}")
            all_responses.append({"error": str(r)})
        else:
            all_responses.append(r)

    # Step 8: Segment response data based on task order
    company_overviews = []
    shareholding_data = []
    chart_data = {}
    financial_data = []

    # Segment responses based on task_order
    response_idx = 0
    for task_type in task_order:
        if response_idx >= len(all_responses):
            break

        if task_type == 'overview':
            company_overviews.append(all_responses[response_idx])
            response_idx += 1
        elif task_type == 'shareholding':
            shareholding_data.append(all_responses[response_idx])
            response_idx += 1
        elif task_type == 'chart':
            chart_data = all_responses[response_idx]
            response_idx += 1
        elif task_type == 'financial':
            financial_data.append(all_responses[response_idx])
            response_idx += 1

    # Step 9: Return raw data if requested
    if request.raw_only:
        return {
            "llm_response": None,
            "enhanced_context_data": enhanced_context_data,
            "company_overviews": company_overviews,
            "shareholding_data": shareholding_data,
            "chart_data": chart_data,
            "financial_data": financial_data,
            "display_recommendations": display_recommendations,
            "classification": classification
        }

    # Step 10: Prepare data context for Gemini (future custom templates)
    context_data = {
        "endpoint_type": endpoint_type,
        "endpoint_mode": endpoint_mode,
        "identified_parameters": identified_parameters,
        "required_sql_tables": required_sql_tables,
        "company_count": len(company_ids_to_use) if company_ids_to_use else 0,
        "has_charts": bool(chart_data and not chart_data.get('error')),
        "has_financials": bool(
            financial_data and not any(
                isinstance(d, dict) and d.get('error') for d in financial_data
            )
        ),
        "has_shareholding": bool(shareholding_data and not any(isinstance(d, dict) and d.get('error') for d in shareholding_data)),
        "query_type": classification.get('query_type', 'comprehensive')
    }

    # Step 11: Generate LLM response
    try:
        gemini_call_start_time = time.time()
        gemini_result = await get_copilot_response(
            user_query=request.user_query,
            refined_context=combined_context,
            context_data=context_data  # Pass context data for future template selection
        )
        gemini_call_duration = time.time() - gemini_call_start_time
        logger.info(f"Gemini API call completed in {gemini_call_duration:.2f} seconds.")
    except Exception as e:
        logger.error(f"Gemini call failed: {str(e)}")
        return {
            "error": f"Gemini call failed: {str(e)}",
            "enhanced_context_data": enhanced_context_data,
            "company_overviews": company_overviews,
            "shareholding_data": shareholding_data,
            "chart_data": chart_data,
            "financial_data": financial_data,
            "display_recommendations": display_recommendations,
            "classification": classification
        }

    # Step 12: Return comprehensive response
    total_request_duration = time.time() - request_start_time
    logger.info(f"Total copilot request processed in {total_request_duration:.2f} seconds.")
    return {
        "llm_response": gemini_result.get("response"),
        "enhanced_context_data": enhanced_context_data,
        "company_overviews": company_overviews,
        "shareholding_data": shareholding_data,
        "chart_data": chart_data,
        "financial_data": financial_data,
        "display_recommendations": display_recommendations,
        "classification": classification,
        "context_info": {
            "endpoint_routing": {
                "endpoint_type": endpoint_type,
                "endpoint_mode": endpoint_mode,
                "chart_endpoint_type": chart_endpoint_type
            },
            "parameter_filtering": {
                "total_parameters": sum(len(params) for params in identified_parameters.values()),
                "filtered_tables": list(identified_parameters.keys()),
                "chart_parameters": chart_parameters
            },
            "data_availability": {
                "company_overviews": len([d for d in company_overviews if not (isinstance(d, dict) and d.get('error'))]),
                "shareholding_patterns": len([d for d in shareholding_data if not (isinstance(d, dict) and d.get('error'))]),
                "charts": 1 if chart_data and not chart_data.get('error') else 0,
                "financial_tables": len([d for d in financial_data if not (isinstance(d, dict) and d.get('error'))])
            },
            "resolved_companies": enhanced_context_data.get("resolved_companies", []),
            "total_context_length": len(combined_context)
        }
    }


@router.post("/ask_legacy")
async def ask_legacy_copilot(request: CopilotRequest):
    """
    Description:
    This endpoint processes a user's query and optionally a list of company IDs. If no company
    IDs are provided, it attempts to resolve them by calling a Colab-based resolution endpoint.
    Once resolved, it retrieves:
      1) Overview data for each company
      2) Financial data (profit_and_loss) for each company
      3) Chart data (parameters)
      4) Refined context from Colab
    Then calls Gemini API to generate an LLM response based on the refined context.

    Parameters:
    - user_query (str): The user's question
    - company_ids (List[int], optional): Explicitly provided company numbers
    - context (dict, optional): Any extra context
    - raw_only (bool): If True, skip Gemini and just return the raw parallel fetch data
    """

    # Updated to pull base URLs from environment variables and improved logging
    overview_base_url = os.getenv(
        "OVERVIEW_BASE_URL",
        "https://quanvest.me/overview/company"
    )
    charts_url = os.getenv(
        "CHARTS_URL",
        "https://quanvest.me/charts/parameters"
    )
    colab_url = os.getenv(
        "COLAB_URL",
    )
    financials_base_url = os.getenv(
        "FINANCIALS_BASE_URL",
        "https://quanvest.me/financials"
    )

    standard_headers = {'Content-Type': 'application/json'}
    ngrok_headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
    }

    company_ids_to_use = request.company_ids

    if not company_ids_to_use:
        logger.info("No company_ids provided; attempting auto-resolution via Colab.")
        try:
            resolve_response = make_request(
                f"{colab_url}/resolve_companies",
                "POST",
                {"query": request.user_query},
                ngrok_headers
            )
            resolved_companies = resolve_response.get('resolved_companies', [])
            company_ids_to_use = get_company_numbers_from_db(resolved_companies)
            logger.info(f"Auto-resolved company IDs: {company_ids_to_use}")
        except Exception as e:
            logger.error(f"Company resolution failed: {str(e)}")
            company_ids_to_use = []

    all_tasks_lambdas = []
    num_overview_tasks = 0
    num_charts_tasks = 0
    num_financials_tasks = 0

    # Overview tasks
    if company_ids_to_use:
        for company_id in company_ids_to_use:
            if not isinstance(company_id, int) or company_id <= 0:
                logger.warning(f"Skipping invalid company_id: {company_id}")
                continue
            current_overview_url = f"{overview_base_url}/{company_id}"
            all_tasks_lambdas.append(
                lambda url=current_overview_url: make_request(url, "GET", headers=standard_headers)
            )
            num_overview_tasks += 1

    # Charts task (single post request if we do have company IDs)
    if company_ids_to_use:
        chart_payload = {
            "company_numbers": company_ids_to_use,  # as required
            "parameters": ["sales"],
            "chart_type": "line"
        }
        all_tasks_lambdas.append(
            lambda: make_request(charts_url, "POST", chart_payload, standard_headers)
        )
        num_charts_tasks = 1
    else:
        all_tasks_lambdas.append(lambda: {})
        num_charts_tasks = 1

    # Financials tasks: example using "profit_and_loss" for each company
    if company_ids_to_use:
        for cid in company_ids_to_use:
            if cid > 0:
                fin_url = f"{financials_base_url}?company_number={cid}&statement_type=profit_and_loss&start_year=2021&end_year=2023"
                all_tasks_lambdas.append(
                    lambda url=fin_url: make_request(url, "GET", headers=standard_headers)
                )
                num_financials_tasks += 1
    else:
        # Return empty if no companies
        all_tasks_lambdas.append(lambda: {})
        num_financials_tasks = 1

    # Colab retrieval
    colab_payload = {"query": request.user_query}
    all_tasks_lambdas.append(
        lambda: make_request(f"{colab_url}/retrieve_context", "POST", colab_payload, ngrok_headers)
    )

    loop = asyncio.get_event_loop()
    results = []
    with ThreadPoolExecutor(max_workers=len(all_tasks_lambdas) or 1) as executor:
        futures = [loop.run_in_executor(executor, task_lambda) for task_lambda in all_tasks_lambdas]
        results = await asyncio.gather(*futures, return_exceptions=True)

    all_responses: List[Dict[str, Any]] = []
    for r in results:
        if isinstance(r, Exception):
            logger.error(f"Error in parallel fetch: {str(r)}", exc_info=True)
            all_responses.append({"error": str(r)})
        else:
            all_responses.append(r)

    # Segment out each type of data from the gathered responses
    # 1) Overview
    overview_data_list: List[Dict[str, Any]] = []
    if num_overview_tasks > 0:
        overview_data_list = all_responses[:num_overview_tasks]
    logger.info(f"Fetched {num_overview_tasks} overview results")

    # 2) Charts
    chart_data_index = num_overview_tasks
    chart_data = all_responses[chart_data_index] if len(all_responses) > chart_data_index else {}

    # 3) Financial data
    financials_data_start = num_overview_tasks + num_charts_tasks
    financials_data_end = financials_data_start + num_financials_tasks
    financial_data_list = all_responses[financials_data_start:financials_data_end]
    logger.info(f"Fetched {num_financials_tasks} financial results")

    # 4) Colab
    colab_data_index = financials_data_end
    colab_data = {}
    if len(all_responses) > colab_data_index:
        colab_data = all_responses[colab_data_index]

    refined_context = colab_data.get("context", "")

    if request.raw_only:
        return {
            "llm_response": None,
            "company_overviews": overview_data_list,
            "chart_data": chart_data,
            "financial_data": financial_data_list,
            "colab_data": colab_data
        }

    # Attempt Gemini call
    try:
        gemini_result = await get_copilot_response(
            user_query=request.user_query,
            refined_context=refined_context
        )
    except Exception as e:
        logger.error(f"Gemini call failed: {str(e)}", exc_info=True)
        return {
            "error": f"Gemini call failed: {str(e)}",
            "company_overviews": overview_data_list,
            "chart_data": chart_data,
            "financial_data": financial_data_list,
            "colab_data": colab_data
        }

    return {
        "llm_response": gemini_result.get("response"),
        "company_overviews": overview_data_list,
        "chart_data": chart_data,
        "financial_data": financial_data_list,
        "colab_data": colab_data,
        "context_info": {
            "ner_entities": colab_data.get("ner_entities", []),
            "num_chunks": colab_data.get("num_chunks", 0),
            "context_length": len(refined_context)
        }
    }
