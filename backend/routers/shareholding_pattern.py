from fastapi import APIRouter, HTTPException, Query
from backend.services.shareholding_pattern_service import get_shareholding_pattern_file_id

router = APIRouter()

@router.get("")
async def get_shareholding_pattern(company_number: int = Query(..., description="Company number")):
    """
    Returns a string representing the file id for the given company_number (shareholding pattern).
    """
    try:
        file_id = get_shareholding_pattern_file_id(company_number)
        return {"company_number": company_number, "shareholding_pattern_file_id": file_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
