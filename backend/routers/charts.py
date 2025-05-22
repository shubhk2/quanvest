from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from pydantic import BaseModel
from backend.services.chart_service import generate_parameter_chart, generate_ratio_chart
import logging

# Set up logger
logger = logging.getLogger(__name__)

router = APIRouter()

class ChartRequest(BaseModel):
    company_numbers: List[int]
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
    logger.info(f"Chart parameters request received: {request}")
    try:
        if not request.company_numbers:
            logger.warning("No company numbers provided in request")
            raise HTTPException(status_code=400, detail="No company numbers provided")
            
        if not request.parameters:
            logger.warning("No parameters provided in request")
            raise HTTPException(status_code=400, detail="No parameters provided")
            
        chart_data = generate_parameter_chart(
            request.company_numbers,
            request.parameters,
            request.start_year,
            request.end_year,
            request.chart_type
        )
        logger.info("Chart data generated successfully")
        return chart_data
    except Exception as e:
        logger.error(f"Error generating chart: {str(e)}", exc_info=True)
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
    logger.info(f"Chart ratios request received: {request}")
    try:
        if not request.company_numbers:
            logger.warning("No company numbers provided in request")
            raise HTTPException(status_code=400, detail="No company numbers provided")
            
        if not request.parameters:
            logger.warning("No parameters provided in request")
            raise HTTPException(status_code=400, detail="No parameters provided")
            
        chart_data = generate_ratio_chart(
            request.company_numbers,
            request.parameters,
            request.start_year,
            request.end_year,
            request.chart_type
        )
        logger.info("Ratio chart data generated successfully")
        return chart_data
    except Exception as e:
        logger.error(f"Error generating ratio chart: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
