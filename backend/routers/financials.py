from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from app.services.financial_service import get_financial_data, get_financial_periods

router = APIRouter()

@router.get("/")
async def get_financials(
    company_id: int,
    statement_type: str = Query(..., enum=["balance_sheet", "profit_and_loss", "cashflow", "quarterly_results"]),
    start_year: Optional[int] = None,
    end_year: Optional[int] = None
):
    """
    Get financial statements for a company
    
    Parameters:
    - company_id: Company ID
    - statement_type: Type of financial statement
    - start_year: Start year for data filter (optional)
    - end_year: End year for data filter (optional)
    """
    try:
        data = get_financial_data(company_id, statement_type, start_year, end_year)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/periods")
async def get_periods(company_id: int, statement_type: str = Query(..., enum=["balance_sheet", "profit_and_loss", "cashflow", "quarterly_results"])):
    """Get available time periods for a company's financial statements"""
    try:
        periods = get_financial_periods(company_id, statement_type)
        return {"periods": periods}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
