from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from pydantic import BaseModel
from app.services.chart_service import generate_parameter_chart, generate_ratio_chart

router = APIRouter()

class ChartRequest(BaseModel):
    company_ids: List[int]
    parameters: List[str]
    start_year: Optional[int] = None
    end_year: Optional[int] = None
    chart_type: str = "line"  # line, bar, etc.

@router.post("/parameters")
async def chart_parameters(request: ChartRequest):
    """
    Generate chart for financial parameters
    
    Parameters:
    - company_ids: List of company IDs to include
    - parameters: List of financial parameters to chart
    - start_year: Start year for data
    - end_year: End year for data
    - chart_type: Type of chart to generate
    """
    try:
        chart_data = generate_parameter_chart(
            request.company_ids,
            request.parameters,
            request.start_year,
            request.end_year,
            request.chart_type
        )
        return chart_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ratios")
async def chart_ratios(request: ChartRequest):
    """
    Generate chart for financial ratios
    
    Parameters:
    - company_ids: List of company IDs to include
    - parameters: List of ratio parameters to chart
    - start_year: Start year for data
    - end_year: End year for data
    - chart_type: Type of chart to generate
    """
    try:
        chart_data = generate_ratio_chart(
            request.company_ids,
            request.parameters,
            request.start_year,
            request.end_year,
            request.chart_type
        )
        return chart_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
