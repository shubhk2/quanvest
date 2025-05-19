from fastapi import APIRouter, HTTPException
from backend.services.overview_service import get_company_overview, get_company_stats

router = APIRouter()

@router.get("/company/{company_number}")
async def company_overview(company_number: int):
    """
    Get textual overview and stats for a company
    
    Parameters:
    - company_id: Company ID
    """
    try:
        # Get company textual overview
        overview = get_company_overview(company_number)
        
        # Get company stats (market cap, EBITDA, margins, etc.)
        stats = get_company_stats(company_number)
        
        return {
            "overview": overview,
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
