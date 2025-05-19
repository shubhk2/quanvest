from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from pydantic import BaseModel
from backend.services.ratio_service import get_predefined_ratios, calculate_custom_ratio

router = APIRouter()

class CustomRatioRequest(BaseModel):
    company_numbers: List[int]
    numerator: str
    denominator: str
    year: Optional[int] = None

@router.get("/predefined")
async def get_ratios(
    company_numbers: List[int] = Query(...),
    ratio_types: Optional[List[str]] = Query(None),
    start_year: Optional[int] = None,
    end_year: Optional[int] = None
):
    """
    Get predefined financial ratios for companies
    
    Parameters:
    - company_ids: List of company IDs to compare
    - ratio_types: Types of ratios (profitability, liquidity, solvency, etc.)
    - start_year: Start year for data filter
    - end_year: End year for data filter
    """
    try:
        ratios = get_predefined_ratios(company_numbers, ratio_types, start_year, end_year)
        return ratios
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/custom")
async def calculate_ratio(request: CustomRatioRequest):
    """
    Calculate custom ratio using user-specified parameters
    
    Parameters:
    - company_ids: List of company IDs to calculate for
    - numerator: Parameter to use as numerator
    - denominator: Parameter to use as denominator
    - year: Specific year for calculation (optional)
    """
    try:
        result = calculate_custom_ratio(
            request.company_numbers,
            request.numerator,
            request.denominator,
            request.year
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
