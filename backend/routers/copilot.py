from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
import asyncio
import httpx

from backend.services.copilot_service import get_copilot_response

router = APIRouter()

class CopilotRequest(BaseModel):
    user_query: str
    company_ids: Optional[List[int]] = None
    context: Optional[dict] = None
    raw_only: bool = False  # Skip Gemini if True

@router.post("/ask")
async def ask_copilot(request: CopilotRequest):
    """
    Get response from financial copilot
    
    Parameters:
    - user_query: User's question or request
    - company_ids: Optional list of company IDs for context
    - context: Additional context for the query
    """
    tasks = []
    overview_url = f"http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/overview/company/{request.company_ids[0]}" if request.company_ids else None
    charts_url = "http://ec2-15-206-84-119.ap-south-1.compute.amazonaws.com:8000/charts/parameters"

    async with httpx.AsyncClient() as client:
        if overview_url:
            tasks.append(client.get(overview_url))
        # For demonstration, we send dummy chart data
        tasks.append(client.post(charts_url, json={
            "company_numbers": request.company_ids or [123],
            "parameters": ["dummy_param"],
            "chart_type": "line"
        }))
        # Colab/Notebook endpoint (user will fill actual ngrok URL)
        colab_url = "https://<USER-PROVIDED-NGROK-LINK>/run"
        tasks.append(client.post(colab_url, json={"message": request.user_query}))

        # Run calls in parallel
        try:
            responses = await asyncio.gather(*tasks)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Parallel fetch failed: {str(e)}")

    # Parse results in the same order tasks were added
    overview_data = responses[0].json() if overview_url else {}
    chart_data = responses[1].json()
    colab_data = responses[2].json()
    refined_context = colab_data.get("refined_context", "")

    # If raw_only is True, return raw data
    if request.raw_only:
        return {
            "llm_response": None,
            "overview": overview_data.get("overview", {}),
            "stats": overview_data.get("stats", {}),
            "chart_data": chart_data,
            "colab_data": colab_data
        }

    # Otherwise, call Gemini via get_copilot_response
    try:
        # The gemini call is synchronous in our example
        gemini_result = await get_copilot_response(
            user_query=request.user_query,
            refined_context=refined_context
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Gemini call failed: {str(e)}")

    # Merge everything into a final API response
    return {
        "llm_response": gemini_result.get("response"),
        "overview": overview_data.get("overview", {}),
        "stats": overview_data.get("stats", {}),
        "chart_data": chart_data,
        "colab_data": colab_data
    }
