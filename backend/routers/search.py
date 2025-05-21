from fastapi import APIRouter, Query, HTTPException
from backend.services.search_service import search_companies, search_parameters

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/companies")
async def search_companies_route(
    q: str = Query(..., min_length=1, description="Search term for company name"),
    limit: int = Query(10, ge=1, le=50)
):
    try:
        results = search_companies(q, limit)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/parameters")
async def search_parameters_route(
    q: str = Query(..., min_length=1, description="Search term for parameter"),
    limit: int = Query(10, ge=1, le=50)
):
    try:
        results = search_parameters(q, limit)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
