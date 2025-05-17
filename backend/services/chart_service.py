from backend.db_setup import connect_to_db
from psycopg2.extras import RealDictCursor
from typing import List, Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)

def get_table_for_parameter(parameter: str) -> str:
    """
    Determine which table to query based on the parameter
    
    Parameters:
    - parameter: financial parameter name
    
    Returns:
    - Table name where the parameter can be found
    """
    # Map parameters to their respective tables
    # This is a simplified approach, in reality you'd have a more comprehensive mapping
    pl_parameters = ["Revenue", "Cost of Sales", "Gross Profit", "Net Income", "EBITDA", "Operating Income"]
    bs_parameters = ["Total Assets", "Current Assets", "Total Liabilities", "Current Liabilities", "Total Equity"]
    cf_parameters = ["Operating Cash Flow", "Investing Cash Flow", "Financing Cash Flow", "Net Cash Flow"]
    qr_parameters = ["Quarterly Revenue", "Quarterly Profit", "EPS"]
    
    if parameter in pl_parameters:
        return "profit_and_loss"
    elif parameter in bs_parameters:
        return "balance_sheet"
    elif parameter in cf_parameters:
        return "cashflow"
    elif parameter in qr_parameters:
        return "quarterly_results"
    else:
        # Default to profit_and_loss or consider raising an error
        return "profit_and_loss"

def generate_parameter_chart(
    company_ids: List[int],
    parameters: List[str],
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    chart_type: str = "line"
) -> Dict[str, Any]:
    """
    Generate chart data for financial parameters
    
    Parameters:
    - company_ids: List of company IDs to include
    - parameters: List of financial parameters to chart
    - start_year: Start year for data
    - end_year: End year for data
    - chart_type: Type of chart to generate
    
    Returns:
    - Dictionary with chart data
    """
    conn = connect_to_db()
    try:
        chart_data = {
            "labels": [],  # Years/dates
            "datasets": []
        }
        
        # Get company names for labels
        company_names = {}
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT id, full_name FROM company_detail WHERE id = ANY(%s)",
                (company_ids,)
            )
            for row in cursor.fetchall():
                company_names[row["id"]] = row["full_name"]
        
        # Build date filter
        date_filter = ""
        date_params = []
        if start_year:
            date_filter += " AND EXTRACT(YEAR FROM report_date) >= %s"
            date_params.append(start_year)
        if end_year:
            date_filter += " AND EXTRACT(YEAR FROM report_date) <= %s"
            date_params.append(end_year)
        
        # Collect data for each parameter and company
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            for parameter in parameters:
                table = get_table_for_parameter(parameter)
                
                for company_id in company_ids:
                    query = f"""
                    SELECT report_date, value 
                    FROM {table} 
                    WHERE company_id = %s AND parameter = %s {date_filter}
                    ORDER BY report_date ASC
                    """
                    
                    query_params = [company_id, parameter] + date_params
                    cursor.execute(query, query_params)
                    results = cursor.fetchall()
                    
                    if results:
                        # Format data for chart
                        dataset = {
                            "label": f"{company_names.get(company_id, f'Company {company_id}')} - {parameter}",
                            "data": [float(row["value"]) for row in results],
                            # You can add styling properties here based on chart library
                        }
                        
                        # Add to datasets
                        chart_data["datasets"].append(dataset)
                        
                        # Update labels (dates) if not already set
                        if not chart_data["labels"]:
                            chart_data["labels"] = [row["report_date"].strftime("%Y-%m-%d") for row in results]
        
        # Add chart type to the response
        chart_data["chart_type"] = chart_type
        
        return chart_data
        
    except Exception as e:
        logger.error(f"Error generating parameter chart: {str(e)}")
        raise
    finally:
        conn.close()

def calculate_ratio(
    conn, 
    company_id: int, 
    ratio_name: str, 
    report_date
) -> float:
    """
    Calculate a financial ratio for a company at a specific date
    
    Parameters:
    - conn: Database connection
    - company_id: Company ID
    - ratio_name: Name of the ratio to calculate
    - report_date: Date for which to calculate the ratio
    
    Returns:
    - Calculated ratio value
    """
    with conn.cursor(cursor_factory=RealDictCursor) as cursor:
        # Implement common financial ratios
        if ratio_name == "Gross Margin":
            # Gross Margin = Gross Profit / Revenue
            cursor.execute(
                """
                SELECT 
                    (SELECT value FROM profit_and_loss WHERE company_id = %s AND report_date = %s AND parameter = 'Gross Profit') /
                    NULLIF((SELECT value FROM profit_and_loss WHERE company_id = %s AND report_date = %s AND parameter = 'Revenue'), 0) AS ratio
                """,
                (company_id, report_date, company_id, report_date)
            )
            
        elif ratio_name == "Net Margin":
            # Net Margin = Net Income / Revenue
            cursor.execute(
                """
                SELECT 
                    (SELECT value FROM profit_and_loss WHERE company_id = %s AND report_date = %s AND parameter = 'Net Income') /
                    NULLIF((SELECT value FROM profit_and_loss WHERE company_id = %s AND report_date = %s AND parameter = 'Revenue'), 0) AS ratio
                """,
                (company_id, report_date, company_id, report_date)
            )
            
        elif ratio_name == "ROE":
            # ROE = Net Income / Total Equity
            cursor.execute(
                """
                SELECT 
                    (SELECT value FROM profit_and_loss WHERE company_id = %s AND report_date = %s AND parameter = 'Net Income') /
                    NULLIF((SELECT value FROM balance_sheet WHERE company_id = %s AND report_date = %s AND parameter = 'Total Equity'), 0) AS ratio
                """,
                (company_id, report_date, company_id, report_date)
            )
            
        elif ratio_name == "Current Ratio":
            # Current Ratio = Current Assets / Current Liabilities
            cursor.execute(
                """
                SELECT 
                    (SELECT value FROM balance_sheet WHERE company_id = %s AND report_date = %s AND parameter = 'Current Assets') /
                    NULLIF((SELECT value FROM balance_sheet WHERE company_id = %s AND report_date = %s AND parameter = 'Current Liabilities'), 0) AS ratio
                """,
                (company_id, report_date, company_id, report_date)
            )
            
        elif ratio_name == "Debt to Equity":
            # Debt to Equity = Total Liabilities / Total Equity
            cursor.execute(
                """
                SELECT 
                    (SELECT value FROM balance_sheet WHERE company_id = %s AND report_date = %s AND parameter = 'Total Liabilities') /
                    NULLIF((SELECT value FROM balance_sheet WHERE company_id = %s AND report_date = %s AND parameter = 'Total Equity'), 0) AS ratio
                """,
                (company_id, report_date, company_id, report_date)
            )
        else:
            # Default to returning 0 if ratio not supported
            return 0
            
        result = cursor.fetchone()
        return float(result["ratio"]) if result and result["ratio"] is not None else 0

def generate_ratio_chart(
    company_ids: List[int],
    ratios: List[str],
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    chart_type: str = "line"
) -> Dict[str, Any]:
    """
    Generate chart data for financial ratios
    
    Parameters:
    - company_ids: List of company IDs to include
    - ratios: List of ratio parameters to chart
    - start_year: Start year for data
    - end_year: End year for data
    - chart_type: Type of chart to generate
    
    Returns:
    - Dictionary with chart data
    """
    conn = connect_to_db()
    try:
        chart_data = {
            "labels": [],  # Years/dates
            "datasets": []
        }
        
        # Get company names for labels
        company_names = {}
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT id, full_name FROM company_detail WHERE id = ANY(%s)",
                (company_ids,)
            )
            for row in cursor.fetchall():
                company_names[row["id"]] = row["full_name"]
        
        # Build date filter for query
        date_filter = ""
        date_params = []
        if start_year:
            date_filter += " AND EXTRACT(YEAR FROM report_date) >= %s"
            date_params.append(start_year)
        if end_year:
            date_filter += " AND EXTRACT(YEAR FROM report_date) <= %s"
            date_params.append(end_year)
        
        # For each company, get all available report dates
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            for company_id in company_ids:
                # Get all report dates for this company
                query = f"""
                SELECT DISTINCT report_date 
                FROM profit_and_loss 
                WHERE company_id = %s {date_filter}
                ORDER BY report_date ASC
                """
                cursor.execute(query, [company_id] + date_params)
                report_dates = [row["report_date"] for row in cursor.fetchall()]
                
                # If we don't have dates yet, use these for the chart labels
                if not chart_data["labels"]:
                    chart_data["labels"] = [date.strftime("%Y-%m-%d") for date in report_dates]
                
                # For each ratio, calculate values for all dates
                for ratio in ratios:
                    ratio_values = []
                    for date in report_dates:
                        ratio_value = calculate_ratio(conn, company_id, ratio, date)
                        ratio_values.append(ratio_value)
                    
                    # Add dataset for this company and ratio
                    dataset = {
                        "label": f"{company_names.get(company_id, f'Company {company_id}')} - {ratio}",
                        "data": ratio_values,
                    }
                    chart_data["datasets"].append(dataset)
        
        # Add chart type to the response
        chart_data["chart_type"] = chart_type
        
        return chart_data
        
    except Exception as e:
        logger.error(f"Error generating ratio chart: {str(e)}")
        raise
    finally:
        conn.close()
