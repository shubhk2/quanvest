from fastapi import FastAPI, BackgroundTasks,HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional
import glob
from datetime import datetime
# from app.classifier import classify_text
from db_mongo import save_to_mongodb, get_classified_data
import os
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

# Import our modules
from db_setup import connect_to_db, create_tables, load_data
app = FastAPI(title="Financial Text Classifier")

class ClassifiedChunk(BaseModel):
    text: str
    score: float
    chunk_index: Optional[int] = None
    section_heading: Optional[str] = None
    embedding_vector: Optional[List[float]] = None

class ClassificationResponse(BaseModel):
    status: str
    message: str

class ClassifiedData(BaseModel):
    ticker: str
    year: int
    month: int
    source_file: Optional[str] = None
    metadata: Dict[str, str] = Field(default_factory=dict)
    MDnA: List[ClassifiedChunk] = Field(default_factory=list)
    Risk_Factors: List[ClassifiedChunk] = Field(default_factory=list)
    Company_Segment: List[ClassifiedChunk] = Field(default_factory=list)
    Company_Infrastructure: List[ClassifiedChunk] = Field(default_factory=list)
    Shareholder_Performance: List[ClassifiedChunk] = Field(default_factory=list)
    Company_Subsidiaries: List[ClassifiedChunk] = Field(default_factory=list)
    ESG: List[ClassifiedChunk] = Field(default_factory=list)
    Employee_Info: List[ClassifiedChunk] = Field(default_factory=list)
    Letter_To_Shareholders: List[ClassifiedChunk] = Field(default_factory=list)
    Business_Overview: List[ClassifiedChunk] = Field(default_factory=list)
    Corporate_Governance_Report: List[ClassifiedChunk] = Field(default_factory=list)
    Corporate_Social_Responsibility: List[ClassifiedChunk] = Field(default_factory=list)
    Auditor_Report: List[ClassifiedChunk] = Field(default_factory=list)
    Shareholder_Information: List[ClassifiedChunk] = Field(default_factory=list)










# Load environment variables
load_dotenv()

app = FastAPI(title="Financial Data API")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)





@app.get("/")
async def root():
    return {"message": "Welcome to the Financial Data API"}

@app.get("/results", response_model=List[ClassifiedData])
async def get_results(ticker: str = None, date: str = None):
    """Get classification results, optionally filtered by ticker and date"""
    return get_classified_data(ticker, date)






@app.get("/companies")
async def get_companies():
    """Get list of all companies"""
    try:
        conn = connect_to_db()
        cursor = conn.cursor(cursor_factory=RealDictCursor)
        cursor.execute("SELECT * FROM company_detail ORDER BY name")
        companies = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"companies": companies}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/company/{company_id}")
async def get_company_data(company_id: int, statement_type: Optional[str] = None):
    """
    Get financial data for a company

    Parameters:
    - company_id: ID of the company
    - statement_type: Type of financial statement (profit_and_loss, balance_sheet, cashflow)
                      If not provided, returns all types
    """
    valid_types = ["profit_and_loss", "balance_sheet", "cashflow"]

    try:
        conn = connect_to_db()
        cursor = conn.cursor(cursor_factory=RealDictCursor)

        # Get company details
        cursor.execute("SELECT * FROM company_detail WHERE id = %s", (company_id,))
        company = cursor.fetchone()

        if not company:
            raise HTTPException(status_code=404, detail="Company not found")

        result = {"company": company, "financial_data": {}}

        # Determine which statement types to fetch
        types_to_fetch = [statement_type] if statement_type else valid_types

        # Validate statement type
        if statement_type and statement_type not in valid_types:
            raise HTTPException(status_code=400,
                                detail=f"Invalid statement type. Must be one of: {', '.join(valid_types)}")

        # Fetch data for each statement type
        for table in types_to_fetch:
            cursor.execute(f"SELECT * FROM {table} WHERE company_id = %s ORDER BY report_date", (company_id,))
            data = cursor.fetchall()
            result["financial_data"][table] = data

        cursor.close()
        conn.close()
        return result

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

