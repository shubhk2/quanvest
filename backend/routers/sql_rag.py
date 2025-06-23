# FastAPI Backend for SQL Context Retrieval - No Classes Version
# This will be added to your main FastAPI server as new endpoints

from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.concurrency import run_in_threadpool
from pydantic import BaseModel
from typing import List, Dict, Optional
import logging
import time  # Import time module
import psycopg2
from psycopg2.extras import RealDictCursor
from backend.db_setup import connect_to_db # Ensure this is correctly set up in your db_setup module
import os
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Database configuration


# Valid tables for context retrieval
VALID_TABLES = [
    'profit_and_loss',
    'balance_sheet',
    'cashflow',
    'financial_ratios',
    'shareholder'
]


# Request/Response models
class SQLContextRequest(BaseModel):
    company_ticker: str
    required_tables: List[str]


class SQLContextResponse(BaseModel):
    status: str
    company_ticker: str
    company_id: Optional[int] = None
    company_name: Optional[str] = None
    contexts: Dict[str, str]
    error: Optional[str] = None


# Database helper functions
def get_db_connection():
    """Get database connection"""
    try:
        conn = connect_to_db()
        return conn
    except Exception as e:
        logger.error(f"Database connection failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")


def get_company_info(ticker: str) -> Optional[Dict]:
    """
    Get company ID and name from company_detail table
    """
    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Query to get company information
        query = """
        SELECT id, ticker, full_name
        FROM company_detail
        WHERE UPPER(ticker) = UPPER(%s)
        """
        start_time = time.time()
        cursor.execute(query, (ticker,))
        result = cursor.fetchone()
        duration = time.time() - start_time
        logger.info(f"DB query for company_info on ticker '{ticker}' took {duration:.4f} seconds.")

        cursor.close()
        conn.close()

        if result:
            return {
                'id': result['id'],
                'ticker': result['ticker'],
                'full_name': result['full_name']
            }
        else:
            logger.warning(f"Company not found for ticker: {ticker}")
            return None

    except Exception as e:
        logger.error(f"Error getting company info: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error retrieving company info: {str(e)}")


def retrieve_table_context(company_id: int, table_name: str) -> Optional[str]:
    """
    Retrieve context from a specific table for the given company
    """
    if table_name not in VALID_TABLES:
        logger.warning(f"Invalid table name: {table_name}")
        return None

    try:
        conn = get_db_connection()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Query to get context from the specified table
        query = f"""
        SELECT context
        FROM {table_name}
        WHERE company_number = %s
        AND context IS NOT NULL
        AND context != ''
        """
        start_time = time.time()
        cursor.execute(query, (company_id,))
        results = cursor.fetchall()
        duration = time.time() - start_time
        logger.info(f"DB query for context on table '{table_name}' took {duration:.4f} seconds.")

        cursor.close()
        conn.close()

        if results:
            # Combine all context entries for this table
            contexts = [result['context'] for result in results if result['context']]
            combined_context = "\n\n".join(contexts)
            logger.info(
                f"Retrieved context from {table_name} for company {company_id}: {len(combined_context)} characters")
            return combined_context
        else:
            logger.info(f"No context found in {table_name} for company {company_id}")
            return None

    except Exception as e:
        logger.error(f"Error retrieving context from {table_name}: {str(e)}")
        return None


def retrieve_all_contexts(company_id: int, required_tables: List[str]) -> Dict[str, str]:
    """
    Retrieve contexts from all required tables for the given company ID.
    """
    contexts = {}
    start_time = time.time()
    # Retrieve context from each required table
    for table_name in required_tables:
        if table_name in VALID_TABLES:
            context = retrieve_table_context(company_id, table_name)
            if context:
                contexts[table_name] = context
            else:
                logger.info(f"No context available for {table_name}")
        else:
            logger.warning(f"Skipping invalid table: {table_name}")
    duration = time.time() - start_time
    logger.info(f"Total time to retrieve all contexts for company {company_id}: {duration:.4f} seconds.")
    return contexts


# --- New synchronous helper functions for async execution ---

def check_db_connection():
    """Synchronous function to check DB connection."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT 1")
    cursor.fetchone()
    cursor.close()
    conn.close()
    return True


def get_all_companies(limit: int):
    """Synchronous function to list available companies."""
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    query = "SELECT id, ticker, full_name FROM company_detail ORDER BY ticker LIMIT %s"
    cursor.execute(query, (limit,))
    results = cursor.fetchall()
    cursor.close()
    conn.close()
    return [dict(row) for row in results]


def calculate_table_stats():
    """Synchronous function to get statistics about context availability."""
    conn = get_db_connection()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    stats = {}
    for table in VALID_TABLES:
        try:
            query = f"""
            SELECT
                COUNT(*) as total_rows,
                COUNT(CASE WHEN context IS NOT NULL AND context != '' THEN 1 END) as rows_with_context
            FROM {table}
            """
            cursor.execute(query)
            result = cursor.fetchone()
            stats[table] = {
                "total_rows": result['total_rows'],
                "rows_with_context": result['rows_with_context'],
                "context_coverage": round(
                    (result['rows_with_context'] / result['total_rows'] * 100), 2) if result['total_rows'] > 0 else 0
            }
        except Exception as e:
            stats[table] = {"error": str(e)}
    cursor.close()
    conn.close()
    return stats


# Create router for RAG endpoints
router = APIRouter(prefix="/rag_flask", tags=["rag_flask"])


@router.get("/")
async def rag_root():
    """Root endpoint for RAG Flask integration"""
    return {"message": "Financial Data SQL Context API for RAG Flask Integration", "version": "1.0.0"}


@router.get("/health")
async def rag_health_check():
    """Health check endpoint for RAG integration"""
    try:
        # Test database connection in a thread pool
        await run_in_threadpool(check_db_connection)
        return {
            "status": "healthy",
            "database_connection": "ok",
            "valid_tables": VALID_TABLES,
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "database_connection": "failed",
            "error": str(e)
        }


@router.post("/retrieve_sql_context", response_model=SQLContextResponse)
async def retrieve_sql_context_endpoint(request: SQLContextRequest):
    """
    Main endpoint to retrieve SQL context data
    This is the endpoint that Flask server will call
    """
    request_start_time = time.time()
    try:
        logger.info(f"Retrieving SQL context for {request.company_ticker}, tables: {request.required_tables}")

        # Get company information asynchronously
        company_info = await run_in_threadpool(get_company_info, request.company_ticker)
        if not company_info:
            return SQLContextResponse(
                status="error",
                company_ticker=request.company_ticker,
                contexts={},
                error=f"Company not found: {request.company_ticker}"
            )

        # Retrieve contexts from required tables asynchronously
        contexts = await run_in_threadpool(retrieve_all_contexts, company_info['id'], request.required_tables)

        response = SQLContextResponse(
            status="success",
            company_ticker=request.company_ticker,
            company_id=company_info['id'],
            company_name=company_info['full_name'],
            contexts=contexts
        )

        total_duration = time.time() - request_start_time
        logger.info(f"Successfully retrieved contexts for {len(contexts)} tables in {total_duration:.2f} seconds.")
        return response

    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in retrieve_sql_context: {str(e)}")
        return SQLContextResponse(
            status="error",
            company_ticker=request.company_ticker,
            contexts={},
            error=str(e)
        )


@router.post("/company_lookup")
async def company_lookup(ticker: str):
    """Test endpoint to verify company lookup"""
    try:
        company_info = await run_in_threadpool(get_company_info, ticker)
        if company_info:
            return {
                "status": "found",
                "company_info": company_info
            }
        else:
            return {
                "status": "not_found",
                "ticker": ticker
            }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }


@router.post("/table_context")
async def table_context(company_id: int, table_name: str):
    """Test endpoint to check context availability for specific table"""
    try:
        if table_name not in VALID_TABLES:
            return {
                "status": "error",
                "error": f"Invalid table name. Valid tables: {VALID_TABLES}"
            }

        context = await run_in_threadpool(retrieve_table_context, company_id, table_name)
        return {
            "status": "success",
            "company_id": company_id,
            "table_name": table_name,
            "context_available": context is not None,
            "context_length": len(context) if context else 0,
            "context_preview": context[:200] + "..." if context and len(context) > 200 else context
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }


@router.get("/list_companies")
async def list_companies(limit: int = 10):
    """List available companies in the database"""
    try:
        results = await run_in_threadpool(get_all_companies, limit)
        return {
            "status": "success",
            "companies": results,
            "count": len(results)
        }
    except Exception as e:
        logger.error(f"Error listing companies: {str(e)}")
        return {
            "status": "error",
            "error": str(e)
        }


@router.get("/table_stats")
async def get_table_stats():
    """Get statistics about context availability in each table"""
    try:
        stats = await run_in_threadpool(calculate_table_stats)
        return {
            "status": "success",
            "table_statistics": stats
        }
    except Exception as e:
        logger.error(f"Error getting table stats: {str(e)}")
        return {
            "status": "error",
            "error": str(e)
        }


# Instructions for integration into your main FastAPI app:
"""
To integrate this into your main FastAPI application (main.py), add these lines:

from fastapi_sql_context_no_classes import rag_router

app = FastAPI()
app.include_router(rag_router)

This will add all the RAG-related endpoints under the /rag_flask prefix:
- /rag_flask/retrieve_sql_context (main endpoint)
- /rag_flask/health
- /rag_flask/test_company_lookup
- /rag_flask/test_table_context
- /rag_flask/list_companies
- /rag_flask/table_stats

Your Flask server will call: https://quanvest.me/rag_flask/retrieve_sql_context
"""

# Standalone app for testing (you can remove this when integrating)
if __name__ == "__main__":
    import uvicorn

    # Create standalone app for testing
    test_app = FastAPI(title="RAG SQL Context Service - Standalone Test")
    test_app.include_router(router)

    print("Starting FastAPI SQL Context Retrieval Service...")
    print(f"Valid tables: {VALID_TABLES}")
    print("Available endpoints:")
    print("  - /rag_flask/retrieve_sql_context")
    print("  - /rag_flask/health")
    print("  - /rag_flask/test_company_lookup")
    print("  - /rag_flask/list_companies")

    uvicorn.run(test_app, host="0.0.0.0", port=8000)