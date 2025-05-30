from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from backend.services.copilot_service import get_copilot_response

router = APIRouter()

class CopilotRequest(BaseModel):
    user_query: str
    company_ids: Optional[List[int]] = None
    context: Optional[dict] = None

@router.post("/ask")
async def ask_copilot(request: CopilotRequest):
    """
    Get response from financial copilot
    
    Parameters:
    - user_query: User's question or request
    - company_ids: Optional list of company IDs for context
    - context: Additional context for the query
    """
    try:
        response = get_copilot_response(
            request.user_query,
            request.company_ids,
            request.context
        )
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
"""
we need some endpoints and some parallel programming code now using concurrent.futures' ThreadPoolExecutor and fastapi's asycn.wait() depending on whickever is suited best for the situation,our task is to update /copilot endpoint response accoreing to: PHASE 1: Data Fetch & Aggregation Layer (FastAPI → Gemini Layer) These must be called in parallel to avoid latency.  ✅ Backend Changes Task Description [ ] Create async wrapper for Gemini route If not done already, make Gemini call handler async to parallelize API calls [ ] Parallel API Calls Use asyncio.gather to call: ① /overview/company/{id} ② /charts/parameters (for now pass a dummy param or default chart) ③ Your future Colab/Notebook endpoint if needed [ ] Merge API results into a final response Return a structured object like: { "llm_response": ..., "overview": ..., "chart_html": ..., "financials": ... } [ ] Standardize financial metrics output Create a Pydantic schema that returns Balance Sheet, P&L, Cash Flow JSON cleanly for frontend [ ] (Optional) Add a flag like raw_only=true to API if Gemini should be skipped (debug mode)  also integrate colab for vector searching and ner to find the context quickly and send it to our backend so that we can send the context to geminiapi through: Add a small API (e.g., Flask) inside the Colab notebook.  Expose it using ngrok.  Your EC2 FastAPI can then make HTTP requests to the ngrok URL. Note:I have already created flask endpoint on colab and will enter ngok link myself,you write the rest of the code"""
