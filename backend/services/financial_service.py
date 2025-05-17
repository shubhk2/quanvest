from typing import Optional, List, Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from backend.db_setup import connect_to_db

def get_financial_data(company_number: int, statement_type: str, start_year: Optional[int] = None, end_year: Optional[int] = None) -> Dict[str, Any]:
    """
    Get financial statement data for a company
    
    Parameters:
    - company_id: ID of the company
    - statement_type: Type of statement (balance_sheet, profit_and_loss, cashflow, quarterly_results)
    - start_year: Start year for filtering data
    - end_year: End year for filtering data
    """
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get company details
    cursor.execute("SELECT id,full_name FROM company_detail WHERE company_number = %s", (company_number,))
    ids = cursor.fetchall()
    if not ids:
        raise ValueError(f"Company with ID {company_number} not found")
    company=ids[0][1]
    flat_ids=[c[0] for c in ids]
    placeholders= ','.join(['%s'] * len(flat_ids))
    
    # Build query with optional date filtering
    query = f"SELECT * FROM {statement_type} WHERE company_id IN ({placeholders})"
    params = [flat_ids]
    
    if start_year:
        query += " AND EXTRACT(YEAR FROM report_date) >= %s"
        params.append(start_year)
    
    if end_year:
        query += " AND EXTRACT(YEAR FROM report_date) <= %s"
        params.append(end_year)
    
    query += " ORDER BY report_date"
    
    # Execute query
    cursor.execute(query, params)
    data = cursor.fetchall()
    
    # Close connection
    cursor.close()
    conn.close()
    
    # Return formatted data
    return {
        "company": company,
        "statement_type": statement_type,
        "data": data
    }

def get_financial_periods(company_id: int, statement_type: str) -> List[Dict[str, Any]]:
    """
    Get available time periods for a company's financial statements
    
    Parameters:
    - company_id: ID of the company
    - statement_type: Type of statement
    """
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get distinct dates
    cursor.execute(
        f"SELECT DISTINCT report_date FROM {statement_type} WHERE company_id = %s ORDER BY report_date",
        (company_id,)
    )
    dates = cursor.fetchall()
    
    # Close connection
    cursor.close()
    conn.close()
    
    return dates
