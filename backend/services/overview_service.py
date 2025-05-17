from backend.db_setup import connect_to_db
from psycopg2.extras import RealDictCursor


def get_company_overview(company_id):
    """
    Get company overview text from the company_overview table
    
    Parameters:
    - company_id: Company ID from company_detail table
    
    Returns:
    - Overview text for the company
    """
    conn = connect_to_db()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # First get the company_number from company_detail using the company_id
            cursor.execute(
                "SELECT company_number FROM company_detail WHERE id = %s",
                (company_id,)
            )
            result = cursor.fetchone()
            if not result:
                return {"error": "Company not found"}
            
            company_number = result["company_number"]
            
            # Now get the overview text from company_overview using company_number
            cursor.execute(
                "SELECT overview_text FROM company_overview WHERE company_number = %s",
                (company_number,)
            )
            overview_result = cursor.fetchone()
            if not overview_result:
                return {"overview_text": "No overview available"}
            
            return overview_result
    finally:
        conn.close()

def get_company_stats(company_id):
    """
    Get company financial statistics derived from financial tables
    
    Parameters:
    - company_id: Company ID
    
    Returns:
    - Dictionary with key financial metrics
    """
    conn = connect_to_db()
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            # Since we don't have a specific stats table yet, we'll collect some key metrics
            # from the most recent financial statements
            
            # Get latest year data from profit_and_loss
            cursor.execute(
                """
                SELECT report_date, parameter, value 
                FROM profit_and_loss 
                WHERE company_id = %s 
                AND report_date = (
                    SELECT MAX(report_date) FROM profit_and_loss WHERE company_id = %s
                )
                """,
                (company_id, company_id)
            )
            pl_results = cursor.fetchall()
            
            # Get latest year data from balance_sheet
            cursor.execute(
                """
                SELECT report_date, parameter, value 
                FROM balance_sheet 
                WHERE company_id = %s 
                AND report_date = (
                    SELECT MAX(report_date) FROM balance_sheet WHERE company_id = %s
                )
                """,
                (company_id, company_id)
            )
            bs_results = cursor.fetchall()
            
            # Prepare the stats dictionary
            stats = {
                "latest_data_date": None,
                "key_metrics": {}
            }
            
            # Extract important metrics from P&L
            if pl_results:
                stats["latest_data_date"] = pl_results[0]["report_date"].isoformat()
                
                for row in pl_results:
                    if row["parameter"] in ["Revenue", "Net Income", "EBITDA", "Operating Income"]:
                        stats["key_metrics"][row["parameter"]] = row["value"]
            
            # Extract important metrics from Balance Sheet
            if bs_results:
                if not stats["latest_data_date"]:
                    stats["latest_data_date"] = bs_results[0]["report_date"].isoformat()
                
                for row in bs_results:
                    if row["parameter"] in ["Total Assets", "Total Liabilities", "Total Equity"]:
                        stats["key_metrics"][row["parameter"]] = row["value"]
            
            # Calculate some basic ratios if we have the required data
            metrics = stats["key_metrics"]
            if "Net Income" in metrics and "Total Equity" in metrics and metrics["Total Equity"] != 0:
                metrics["ROE"] = round(metrics["Net Income"] / metrics["Total Equity"], 4)
                
            if "Net Income" in metrics and "Total Assets" in metrics and metrics["Total Assets"] != 0:
                metrics["ROA"] = round(metrics["Net Income"] / metrics["Total Assets"], 4)
                
            if "Revenue" in metrics and "Net Income" in metrics and metrics["Revenue"] != 0:
                metrics["Net Profit Margin"] = round(metrics["Net Income"] / metrics["Revenue"], 4)
            
            return stats
    finally:
        conn.close()
