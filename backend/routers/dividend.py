from fastapi import APIRouter, HTTPException, Query
from backend.services.dividend_service import get_dividend_file_id

router = APIRouter()

@router.get("/")
async def get_dividend(company_number: int = Query(..., description="Company number")):
    """
    Returns a string representing the file id for the given company_number.
    """
    try:
        file_id = get_dividend_file_id(company_number)
        return {"company_number": company_number, "dividend_file_id": file_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
