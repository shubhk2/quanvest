from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List
from app.services.copilot_service import get_copilot_response

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
