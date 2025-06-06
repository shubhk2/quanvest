import os
import logging
from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import requests
from concurrent.futures import ThreadPoolExecutor

from backend.services.copilot_service import get_copilot_response
from backend.db_setup import connect_to_db

logger = logging.getLogger(__name__)

router = APIRouter()


class CopilotRequest(BaseModel):
    user_query: str
    company_ids: Optional[List[int]] = None
    context: Optional[dict] = None
    raw_only: bool = False


def make_request(url: str, method: str = "GET", json_data: dict = None, headers: dict = None) -> Dict[str, Any]:
    """Helper function to make HTTP requests - UNCHANGED"""
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        else:
            response = requests.post(url, json=json_data, headers=headers, timeout=30)

        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        error_message = f"Request to {url} failed: {str(e)}"
        if hasattr(e, 'response') and e.response is not None:
            error_message += f" | Status: {e.response.status_code} | Body: {e.response.text[:200]}"
        raise Exception(error_message)


def get_company_numbers_from_db(resolved_companies: List[Dict[str, Any]]) -> List[int]:
    """
    NEW FUNCTION: Get company_numbers from PostgreSQL using resolved companies.
    Uses your existing connect_to_db() function.
    Includes improved resource management with try/finally.
    """
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
            full_name = company.get('full_name', '')

            # Strategy 1: Try exact ticker match first
            cursor.execute(
                "SELECT company_number FROM company_detail WHERE UPPER(ticker) = UPPER(%s)",
                (ticker,)
            )
            result = cursor.fetchone()
            if result:
                company_numbers.append(result[0])
                continue

            # Strategy 2: Try fuzzy full_name matching
            cursor.execute(
                "SELECT company_number FROM company_detail WHERE full_name ILIKE %s LIMIT 1",
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


@router.post("/ask")
async def ask_copilot(request: CopilotRequest):
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
        "http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/overview/company"
    )
    charts_url = os.getenv(
        "CHARTS_URL",
        "http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/charts/parameters"
    )
    colab_url = os.getenv(
        "COLAB_URL",
        "https://fb96-34-87-133-178.ngrok-free.app"
    )
    financials_base_url = os.getenv(
        "FINANCIALS_BASE_URL",
        "http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/financials"
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