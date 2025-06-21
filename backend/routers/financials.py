from fastapi import APIRouter, HTTPException, Query
from typing import Optional
from backend.services.financial_service import get_financial_data, get_financial_periods
from fastapi.concurrency import run_in_threadpool

router = APIRouter()


@router.get("")
async def get_financials(
        company_number: int,
        statement_type: str = Query(..., enum=["balance_sheet", "profit_and_loss", "cashflow"]),
        start_year: Optional[int] = None,
        end_year: Optional[int] = None
):
    """
    Get financial statements for a company.

    The data is returned in a structured format suitable for table display.

    Parameters:
    - company_number: Company number (corresponds to company_detail.id).
    - statement_type: Type of financial statement.
    - start_year: Start year for data filter (e.g., 2018). Optional.
    - end_year: End year for data filter (e.g., 2022). Optional.
    """
    try:
        data = await run_in_threadpool(
            get_financial_data,
            company_number,
            statement_type,
            start_year,
            end_year
        )
        return data
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/periods")
async def get_periods():
    """Get available time periods (years) for all financial statements."""
    try:
        periods = await run_in_threadpool(
            get_financial_periods
        )
        return {"periods": periods}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))