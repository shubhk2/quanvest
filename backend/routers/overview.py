from fastapi import APIRouter, HTTPException
from backend.services.overview_service import get_company_overview, get_company_stats

router = APIRouter()

@router.get("/company/{company_id}")
async def company_overview(company_id: int):
    """
    Get textual overview and stats for a company
    
    Parameters:
    - company_id: Company ID
    """
    try:
        # Get company textual overview
        overview = get_company_overview(company_id)
        
        # Get company stats (market cap, EBITDA, margins, etc.)
        stats = get_company_stats(company_id)
        
        return {
            "overview": overview,
            "stats": stats
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
