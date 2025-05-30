from fastapi import FastAPI, BackgroundTasks,HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import glob
from datetime import datetime
# from app.classifier import classify_text
# from db_mongo import save_to_mongodb, get_classified_data
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor
import logging

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if os.environ.get('DEBUG') else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Import our modules
from backend.db_setup import connect_to_db, create_tables, load_data

# Load environment variables
load_dotenv()
logger.debug("Environment variables loaded")

from backend.routers import home, financials, ratios, overview, charts, copilot
from backend.routers import search  # add this import
from backend.vector_store import db  # <-- add this import

logger.info("Starting Financial Data API")
app = FastAPI(title="Financial Data API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
logger.debug("CORS middleware configured")

# Include routers
logger.debug("Registering routers")
app.include_router(home.router)
app.include_router(financials.router, prefix="/financials")
app.include_router(ratios.router, prefix="/ratios")
app.include_router(overview.router, prefix="/overview")
app.include_router(charts.router, prefix="/charts")
app.include_router(copilot.router, prefix="/copilot")
app.include_router(search.router)  # add this line
logger.info("All routers registered")



@app.get("/")
async def root():
    logger.debug("Root endpoint called")
    return {"message": "Welcome to the Financial Data API"}


@app.get("/vector_search")
def vector_search(query: str = Query(..., description="User's question")):
    logger.debug(f"Vector search called with query: {query}")
    results = db.similarity_search(query, k=5)
    return {
        "results": [
            {"score": None, "text": doc.page_content, "metadata": doc.metadata}
            for doc in results
        ]
    }

# @app.get("/companies")
# async def get_companies():
#     """Get list of all companies"""
#     try:
#         conn = connect_to_db()
#         cursor = conn.cursor(cursor_factory=RealDictCursor)
#         cursor.execute("SELECT * FROM company_detail ORDER BY full_name")
#         companies = cursor.fetchall()
#         cursor.close()
#         conn.close()
#         return {"companies": companies}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
#
#
#


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting application server")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
