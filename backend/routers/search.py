from fastapi import APIRouter, Query, HTTPException
from backend.services.search_service import search_companies, search_parameters
import logging

# Set up logger
logger = logging.getLogger(__name__)

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/companies")
async def search_companies_route(
    q: str = Query(..., min_length=1, description="Search term for company name"),
    limit: int = Query(10, ge=1, le=50)
):
    logger.debug(f"Searching companies with query: '{q}', limit: {limit}")
    try:
        results = search_companies(q, limit)
        logger.info(f"Company search returned {len(results)} results")
        return {"results": results}
    except Exception as e:
        logger.error(f"Error in company search: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/parameters")
async def search_parameters_route(
    q: str = Query(..., min_length=1, description="Search term for parameter"),
    limit: int = Query(10, ge=1, le=50)
):
    logger.debug(f"Searching parameters with query: '{q}', limit: {limit}")
    try:
        results = search_parameters(q, limit)
        logger.info(f"Parameter search returned {len(results)} results")
        return {"results": results}
    except Exception as e:
        logger.error(f"Error in parameter search: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
