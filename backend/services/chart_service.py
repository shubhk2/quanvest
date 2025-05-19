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
    pl_parameters = [
        "Exceptional items",
        "Minority share",
        "Other Income",
        "Tax",
        "Material Cost %",
        "Employee Cost",
        "Exceptional items AT",
        "Sales Growth %",
        "Employee Cost %",
        "Depreciation",
        "Other Expenses",
        "Power and Fuel",
        "Sales",
        "Reported Net Profit",
        "Other income normal",
        "Dividend Amount",
        "Change in Inventory",
        "Profit for EPS",
        "Net profit",
        "Profit before tax",
        "Raw Material Cost",
        "Selling and admin",
        "Profit after tax",
        "Interest",
        "Profit for PE",
        "Manufacturing Cost %",
        "Other Cost %",
        "Profit from Associates",
        "Other Mfr. Exp"
    ]
    bs_parameters= [
    "Face value",
    "Land",
    "Estates",
    "Equipments",
    "Non controlling int",
    "Capital Work in Progress",
    "Preference Capital",
    "Trade receivables",
    "Cash Equivalents",
    "Other fixed assets",
    "Trade Payables",
    "Plant Machinery",
    "Short term Borrowings",
    "Total",
    "Investments",
    "Other Assets",
    "Inventory",
    "Long term Borrowings",
    "Railway sidings",
    "No. of Equity Shares",
    "Other Borrowings",
    "Lease Liabilities",
    "Loans n Advances",
    "Other liability items",
    "Net Block",
    "Building",
    "Other asset items",
    "Inventories",
    "New Bonus Shares",
    "Accumulated Depreciation",
    "Reserves",
    "Furniture n fittings",
    "Cash & Bank",
    "Gross Block",
    "Receivables",
    "Intangible Assets",
    "Borrowings",
    "Equity Share Capital",
    "Computers",
    "Vehicles",
    "Ships Vessels",
    "Advance from Customers",
    "Other Liabilities"
]

    cf_parameters = [
        "Investment subsidy",
        "Other WC items",
        "Issue of shares on acq",
        "Financial liabilities",
        "Cash from Operating Activity",
        "Repayment of borrowings",
        "Redemp n Canc of Shares",
        "Acquisition of companies",
        "Investments purchased",
        "Interest paid fin",
        "Interest paid",
        "Redemption of debentures",
        "Proceeds from shares",
        "Interest received",
        "Other operating items",
        "Invest in subsidiaries",
        "Net Cash Flow",
        "Cash from Financing Activity",
        "Share application money",
        "Inter corporate deposits",
        "Loans Advances",
        "Proceeds from debentures",
        "Fixed assets sold",
        "Other financing items",
        "Inventory",
        "Operating investments",
        "Application money refund",
        "Loans to subsidiaries",
        "Operating borrowings",
        "Corporate loans",
        "Proceeds from deposits",
        "Dividends paid",
        "Investment in group cos",
        "Payables",
        "Exceptional CF items",
        "Subsidy received",
        "Fixed assets purchased",
        "Cash from Investing Activity",
        "Deposits",
        "Dividends received",
        "Profit from operations",
        "Direct taxes",
        "Proceeds from borrowings",
        "Investments sold",
        "Capital WIP",
        "Investment income",
        "Receivables",
        "Other investing items",
        "Working capital changes"
    ]
    # Quarterly results parameters
    qr_parameters = [
        "Expenses",
        "Employee Cost %",
        "Depreciation",
        "Exceptional items",
        "Minority share",
        "YOY Profit Growth %",
        "Other Income",
        "Sales",
        "Reported Net Profit",
        "Tax",
        "Other income normal",
        "Material Cost %",
        "Profit for EPS",
        "Net profit",
        "Profit before tax",
        "YOY Sales Growth %",
        "Exceptional items AT",
        "Profit after tax",
        "Interest",
        "Profit for PE",
        "Operating Profit",
        "Profit from Associates"
    ]

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
    company_numbers: List[int],
    parameters: List[str],
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    chart_type: str = "line"
):
    conn = connect_to_db()
    try:
        chart_data = {"labels": [], "datasets": []}
        company_names = {}

        # Collect all matching IDs for the given company_numbers
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT id, full_name, company_number FROM company_detail WHERE company_number = ANY(%s)",
                (company_numbers,)
            )
            detail_rows = cursor.fetchall()
        
        # Build a map (company_number -> [list of ids]) and names
        company_id_map = {}
        for row in detail_rows:
            cid = row["company_number"]
            if cid not in company_id_map:
                company_id_map[cid] = []
            company_id_map[cid].append(row["id"])
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
                print("parameter",parameter,"table",table)
                
                for cnum, ids in company_id_map.items():
                    placeholders = ",".join(["%s"] * len(ids))
                    query = f"""
                        SELECT report_date, value 
                        FROM {table}
                        WHERE company_id IN ({placeholders})
                        AND parameter = %s
                        """
                    if start_year:
                        query += " AND EXTRACT(YEAR FROM report_date) >= %s"
                    if end_year:
                        query += " AND EXTRACT(YEAR FROM report_date) <= %s"
                    query += " ORDER BY report_date ASC"

                    query_params = ids + [parameter]
                    if start_year: query_params.append(start_year)
                    if end_year: query_params.append(end_year)

                    cursor.execute(query, query_params)
                    results = cursor.fetchall()

                    if results:
                        dataset = {
                            "label": f"{company_names[ids[0]]} - {parameter}",
                            "data": [float(r["value"]) for r in results],
                        }
                        chart_data["datasets"].append(dataset)
                        if not chart_data["labels"]:
                            chart_data["labels"] = [
                                r["report_date"].strftime("%Y-%m-%d") for r in results
                            ]
        
        chart_data["chart_type"] = chart_type
        return chart_data
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


if __name__ == "__main__":
    # Example usage
    company_ids = [1, 2, 3]
    parameters = ["Net Profit", "Borrowings","Land"]
    ratios = ["Gross Margin", "Net Margin"]

    chart_data = generate_parameter_chart(company_ids, parameters)
    print(chart_data)

    # ratio_chart_data = generate_ratio_chart(company_ids, ratios)
    # print(ratio_chart_data)
