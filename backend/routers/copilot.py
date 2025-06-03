from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any
import asyncio
import requests
from concurrent.futures import ThreadPoolExecutor

from backend.services.copilot_service import get_copilot_response

router = APIRouter()


class CopilotRequest(BaseModel):
    user_query: str
    company_ids: Optional[List[int]] = None
    context: Optional[dict] = None  # This field seems unused in the current logic, consider removing if not needed
    raw_only: bool = False  # Skip Gemini if True


def make_request(url: str, method: str = "GET", json_data: dict = None, headers: dict = None) -> Dict[str, Any]:
    """Helper function to make HTTP requests"""
    try:
        if method.upper() == "GET":
            response = requests.get(url, headers=headers, timeout=30)
        else:
            response = requests.post(url, json=json_data, headers=headers, timeout=30)

        response.raise_for_status()  # Raises an HTTPError for bad responses
        return response.json()
    except requests.exceptions.RequestException as e:
        # More specific error message for debugging
        error_message = f"Request to {url} failed: {str(e)}"
        if hasattr(e, 'response') and e.response is not None:
            error_message += f" | Status: {e.response.status_code} | Body: {e.response.text[:200]}"
        raise Exception(error_message)


@router.post("/ask")
async def ask_copilot(request: CopilotRequest):
    """
    Get response from financial copilot

    Parameters:
    - user_query: User's question or request
    - company_ids: Optional list of company IDs for context
    - raw_only: Skip Gemini if True
    """

    # Define base URLs
    overview_base_url = "http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/overview/company"
    charts_url = "http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/charts/parameters"
    # Ensure this ngrok URL is current and correct
    colab_url = "https://67fb-34-143-130-17.ngrok-free.app/retrieve_context"

    # Define headers for different endpoints
    standard_headers = {
        'Content-Type': 'application/json'
    }
    ngrok_headers = {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'  # For ngrok
    }

    # Prepare tasks for parallel execution
    all_tasks_lambdas = []
    num_overview_tasks = 0

    # Overview tasks: one for each company_id
    if request.company_ids:
        for company_id in request.company_ids:
            # Ensure company_id is valid before forming URL
            if not isinstance(company_id, int) or company_id <= 0:
                # Skip invalid company_id or raise an error
                # For now, let's skip and potentially log
                print(f"Skipping invalid company_id: {company_id}")
                continue

            current_overview_url = f"{overview_base_url}/{company_id}"
            all_tasks_lambdas.append(
                lambda url=current_overview_url: make_request(url, "GET", headers=standard_headers)
            )
            num_overview_tasks += 1

    # Charts task
    # Ensure company_ids for charts_payload is a list, even if empty or None from request
    chart_company_ids = request.company_ids if request.company_ids else []
    # The charts endpoint might need at least one ID, or handle empty list.
    # Using a default like [123] if empty might be problematic if 123 is not always valid.
    # Adjust based on how your /charts/parameters endpoint handles empty company_numbers.
    # For now, let's pass what's given or an empty list.
    chart_payload = {
        "company_numbers": chart_company_ids,  # Pass the actual list or empty
        "parameters": ["dummy_param"],  # This seems like a placeholder, ensure it's what charts endpoint expects
        "chart_type": "line"
    }
    all_tasks_lambdas.append(
        lambda: make_request(charts_url, "POST", chart_payload, standard_headers)
    )

    # Colab task
    colab_payload = {"query": request.user_query}
    all_tasks_lambdas.append(
        lambda: make_request(colab_url, "POST", colab_payload, ngrok_headers)
    )

    # Execute all requests in parallel using ThreadPoolExecutor
    all_responses: List[Dict[str, Any]] = []
    loop = asyncio.get_event_loop()
    with ThreadPoolExecutor(max_workers=len(all_tasks_lambdas) or 1) as executor:
        futures = [loop.run_in_executor(executor, task_lambda) for task_lambda in all_tasks_lambdas]
        results = await asyncio.gather(*futures, return_exceptions=True)

    # Build the all_responses list with partial data even if some tasks fail
    all_responses = []
    for r in results:
        if isinstance(r, Exception):
            all_responses.append({"error": str(r)})
        else:
            all_responses.append(r)

    # Parse results
    overview_data_list: List[Dict[str, Any]] = []
    if num_overview_tasks > 0:
        overview_data_list = all_responses[:num_overview_tasks]

    # The chart_data and colab_data will follow the overview_data in the all_responses list
    chart_data_index = num_overview_tasks
    colab_data_index = num_overview_tasks + 1

    chart_data: Dict[str, Any] = {}
    if len(all_responses) > chart_data_index:
        chart_data = all_responses[chart_data_index]

    colab_data: Dict[str, Any] = {}
    if len(all_responses) > colab_data_index:
        colab_data = all_responses[colab_data_index]

    refined_context = colab_data.get("context", "")

    if request.raw_only:
        return {
            "llm_response": None,
            "company_overviews": overview_data_list,  # Changed from overview/stats
            "chart_data": chart_data,
            "colab_data": colab_data
        }

    try:
        gemini_result = await get_copilot_response(
            user_query=request.user_query,
            refined_context=refined_context
        )
    except Exception as e:
        # If Gemini itself fails, log or handle, but don't stop the entire response
        return {
            "error": f"Gemini call failed: {str(e)}",
            "company_overviews": overview_data_list,
            "chart_data": chart_data,
            "colab_data": colab_data
        }

    return {
        "llm_response": gemini_result.get("response"),
        "company_overviews": overview_data_list,  # Changed from overview/stats
        "chart_data": chart_data,
        "colab_data": colab_data,
        "context_info": {
            "ner_entities": colab_data.get("ner_entities", []),
            "num_chunks": colab_data.get("num_chunks", 0),
            "context_length": len(refined_context)
        }
    }

"""future context when embedding is totally complete:FINANCIAL_KEYWORDS = {
    # Original keywords
    'revenue', 'profit', 'ebitda', 'margin', 'growth', 
    'cash flow', 'balance sheet', 'income statement',
    'valuation', 'dividend', 'assets', 'liabilities',
    'equity', 'debt', 'operating income', 'net income',
    'ratios', 'liquidity', 'MD&A', 'financial position',
    
    # Requested new keywords
    'letter to shareholders', 'legal issues', 'auditor report', 
    'investor relations', 'esg',
    
    # Additional comprehensive keywords
    'annual report', 'quarterly report', 'earnings', 'financial statements',
    'cash flow statement', 'statement of changes in equity', 'notes to accounts',
    'independent auditor', 'management discussion', 'corporate governance',
    'risk factors', 'business overview', 'segment analysis', 'subsidiaries',
    'related party transactions', 'contingent liabilities', 'credit rating',
    'dividend policy', 'share capital', 'reserves', 'borrowings',
    'working capital', 'capital expenditure', 'depreciation', 'amortization',
    'provisions', 'deferred tax', 'tax expense', 'earnings per share',
    'book value', 'return on equity', 'return on assets', 'debt to equity',
    'current ratio', 'quick ratio', 'interest coverage', 'asset turnover',
    'environmental', 'social', 'governance', 'sustainability'
}
"""