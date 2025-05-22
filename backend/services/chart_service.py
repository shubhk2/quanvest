from soupsieve.util import lower

from backend.db_setup import connect_to_db
from psycopg2.extras import RealDictCursor
from typing import List, Optional, Dict, Any
import logging
import plotly.graph_objs as go
import plotly.io as pio

# Enhance logger configuration
logger = logging.getLogger(__name__)

def get_table_for_parameter(parameter: str) -> str:
    """
    Determine which table to query based on the parameter
    
    Parameters:
    - parameter: financial parameter name
    
    Returns:
    - Table name where the parameter can be found
    """
    logger.debug(f"Determining table for parameter: '{parameter}'")
    # Map parameters to their respective tables
    # This is a simplified approach, in reality you'd have a more comprehensive mapping
    pl_parameters = [
        'exceptional items', 'minority share', 'other income', 'tax',
        'material cost %', 'employee cost', 'exceptional items at',
        'sales growth %', 'employee cost %', 'depreciation', 'other expenses',
        'power and fuel', 'sales', 'reported net profit', 'other income normal',
        'dividend amount', 'change in inventory', 'profit for eps', 'net profit',
        'profit before tax', 'raw material cost', 'selling and admin',
        'profit after tax', 'interest', 'profit for pe', 'manufacturing cost %',
        'other cost %', 'profit from associates', 'other mfr. exp'
    ]
    bs_parameters= [
        'face value', 'land', 'estates', 'equipments', 'non controlling int',
        'capital work in progress', 'preference capital', 'trade receivables',
        'cash equivalents', 'other fixed assets', 'trade payables',
        'plant machinery', 'short term borrowings', 'total', 'investments',
        'other assets', 'inventory', 'long term borrowings', 'railway sidings',
        'no. of equity shares', 'other borrowings', 'lease liabilities',
        'loans n advances', 'other liability items', 'net block', 'building',
        'other asset items', 'inventories', 'new bonus shares',
        'accumulated depreciation', 'reserves', 'furniture n fittings',
        'cash & bank', 'gross block', 'receivables', 'intangible assets',
        'borrowings', 'equity share capital', 'computers', 'vehicles',
        'ships vessels', 'advance from customers', 'other liabilities'
]

    cf_parameters = [
        'investment subsidy', 'other wc items', 'issue of shares on acq', 'financial liabilities',
        'cash from operating activity', 'repayment of borrowings', 'redemp n canc of shares',
        'acquisition of companies', 'investments purchased', 'interest paid fin', 'interest paid',
        'redemption of debentures', 'proceeds from shares', 'interest received',
        'other operating items', 'invest in subsidiaries', 'net cash flow',
        'cash from financing activity', 'share application money', 'inter corporate deposits',
        'loans advances', 'proceeds from debentures', 'fixed assets sold', 'other financing items',
        'inventory', 'operating investments', 'application money refund', 'loans to subsidiaries',
        'operating borrowings', 'corporate loans', 'proceeds from deposits', 'dividends paid',
        'investment in group cos', 'payables', 'exceptional cf items', 'subsidy received',
        'fixed assets purchased', 'cash from investing activity', 'deposits', 'dividends received',
        'profit from operations', 'direct taxes', 'proceeds from borrowings', 'investments sold',
        'capital wip', 'investment income', 'receivables', 'other investing items',
        'working capital changes'
    ]
    # Quarterly results parameters
    qr_parameters = [
        'expenses', 'employee cost %', 'depreciation', 'exceptional items',
        'minority share', 'yoy profit growth %', 'other income', 'sales',
        'reported net profit', 'tax', 'other income normal', 'material cost %',
        'profit for eps', 'net profit', 'profit before tax', 'yoy sales growth %',
        'exceptional items at', 'profit after tax', 'interest', 'profit for pe',
        'operating profit', 'profit from associates'
    ]

    param_lower = parameter.lower()
    if param_lower in pl_parameters:
        logger.debug(f"Parameter '{parameter}' found in profit_and_loss")
        return "profit_and_loss"
    elif param_lower in bs_parameters:
        logger.debug(f"Parameter '{parameter}' found in balance_sheet")
        return "balance_sheet"
    elif param_lower in cf_parameters:
        logger.debug(f"Parameter '{parameter}' found in cashflow")
        return "cashflow"
    elif param_lower in qr_parameters:
        logger.debug(f"Parameter '{parameter}' found in quarterly_results")
        return "quarterly_results"
    else:
        # Default to profit_and_loss or consider raising an error
        logger.warning(f"Parameter '{parameter}' not found in any parameter list, defaulting to profit_and_loss")
        return "profit_and_loss"

def generate_parameter_chart(
    company_numbers: List[int],
    parameters: List[str],
    start_year: Optional[int] = None,
    end_year: Optional[int] = None,
    chart_type: str = "line"
):
    logger.info(f"Generating parameter chart for companies={company_numbers}, parameters={parameters}, years={start_year}-{end_year}, type={chart_type}")
    conn = connect_to_db()
    try:
        traces = []
        labels = []
        company_names = {}

        # Collect all matching IDs for the given company_numbers
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(
                "SELECT id, full_name, company_number FROM company_detail WHERE company_number = ANY(%s)",
                (company_numbers,)
            )
            detail_rows = cursor.fetchall()
            logger.debug(f"Found {len(detail_rows)} company detail records")
        
        # Build a map (company_number -> [list of ids]) and names
        company_id_map = {}
        for row in detail_rows:
            cid = row["company_number"]
            if cid not in company_id_map:
                company_id_map[cid] = []
            company_id_map[cid].append(row["id"])
            company_names[row["id"]] = row["full_name"]
        
        logger.debug(f"Company ID map: {company_id_map}")
        logger.debug(f"Company names: {company_names}")

        # Collect data for each parameter and company
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            for parameter in parameters:
                logger.debug(f"Processing parameter: {parameter}")
                table = get_table_for_parameter(parameter)
                for cnum, ids in company_id_map.items():
                    logger.debug(f"Processing company number {cnum} with IDs {ids}")
                    placeholders = ",".join(["%s"] * len(ids))
                    query = f"""
                        SELECT report_date, value 
                        FROM {table}
                        WHERE company_id IN ({placeholders})
                        AND parameter = %s
                        """
                    if start_year:
                        query += " AND EXTRACT(YEAR FROM report_date) >= %s"
                    else:
                        logger.debug("No start_year filter applied")
                        
                    if end_year:
                        query += " AND EXTRACT(YEAR FROM report_date) <= %s"
                    else:
                        logger.debug("No end_year filter applied")
                        
                    query += " ORDER BY report_date ASC"

                    query_params = ids + [parameter]
                    if start_year: query_params.append(start_year)
                    if end_year: query_params.append(end_year)
                    
                    logger.debug(f"Executing query: {query} with params: {query_params}")
                    cursor.execute(query, query_params)
                    results = cursor.fetchall()
                    logger.debug(f"Found {len(results)} results for parameter {parameter} and company {cnum}")

                    if results:
                        x = [r["report_date"].strftime("%Y-%m-%d") for r in results]
                        y = [float(r["value"]) for r in results]
                        label = f"{company_names[ids[0]]} - {parameter}"
                        trace = go.Scatter(x=x, y=y, mode="lines+markers", name=label)
                        traces.append(trace)
                        if not labels:
                            labels = x
                    else:
                        logger.warning(f"No data found for parameter {parameter} and company {cnum}")

        logger.info(f"Created {len(traces)} traces for chart")
        if not traces:
            logger.warning("No data found for chart generation")
            return {"plotly_json": "{}", "warning": "No data found for specified parameters"}

        fig = go.Figure(data=traces)
        fig.update_layout(
            title="Financial Parameter Chart",
            xaxis_title="Date",
            yaxis_title="Value",
            legend_title="Company - Parameter"
        )
        chart_json = pio.to_json(fig)
        logger.debug("Successfully generated Plotly chart JSON")
        return {"plotly_json": chart_json}
    except Exception as e:
        logger.error(f"Error generating parameter chart: {str(e)}", exc_info=True)
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
    logger.debug(f"Calculating ratio '{ratio_name}' for company_id={company_id}, date={report_date}")
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
            logger.debug("Calculated Gross Margin ratio")

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
            logger.debug("Calculated Net Margin ratio")

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
            logger.debug("Calculated ROE ratio")

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
            logger.debug("Calculated Current Ratio")

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
            logger.debug("Calculated Debt to Equity ratio")
        else:
            # Default to returning 0 if ratio not supported
            logger.warning(f"Unsupported ratio: {ratio_name}, returning 0")
            return 0

        result = cursor.fetchone()
        if result and result["ratio"] is not None:
            logger.debug(f"Ratio value: {float(result['ratio'])}")
            return float(result["ratio"])
        else:
            logger.warning(f"No data found for ratio {ratio_name}, returning 0")
            return 0

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
    logger.info(f"Generating ratio chart for companies={company_ids}, ratios={ratios}, years={start_year}-{end_year}, type={chart_type}")
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
        
        logger.debug(f"Company names: {company_names}")

        # Build date filter for query
        date_filter = ""
        date_params = []
        if start_year:
            date_filter += " AND EXTRACT(YEAR FROM report_date) >= %s"
            date_params.append(start_year)
            logger.debug(f"Added start_year filter: {start_year}")
        else:
            logger.debug("No start_year filter applied")
            
        if end_year:
            date_filter += " AND EXTRACT(YEAR FROM report_date) <= %s"
            date_params.append(end_year)
            logger.debug(f"Added end_year filter: {end_year}")
        else:
            logger.debug("No end_year filter applied")

        # For each company, get all available report dates
        with conn.cursor(cursor_factory=RealDictCursor) as cursor:
            for company_id in company_ids:
                logger.debug(f"Processing company ID: {company_id}")
                # Get all report dates for this company
                query = f"""
                SELECT DISTINCT report_date 
                FROM profit_and_loss 
                WHERE company_id = %s {date_filter}
                ORDER BY report_date ASC
                """
                logger.debug(f"Executing query: {query} with params: [{company_id}] + {date_params}")
                cursor.execute(query, [company_id] + date_params)
                report_dates = [row["report_date"] for row in cursor.fetchall()]
                logger.debug(f"Found {len(report_dates)} report dates for company {company_id}")

                # If we don't have dates yet, use these for the chart labels
                if not chart_data["labels"]:
                    chart_data["labels"] = [date.strftime("%Y-%m-%d") for date in report_dates]
                    logger.debug(f"Set chart labels: {chart_data['labels']}")

                # For each ratio, calculate values for all dates
                for ratio in ratios:
                    logger.debug(f"Calculating ratio: {ratio}")
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
                    logger.debug(f"Added dataset for {ratio} with {len(ratio_values)} values")

        # Add chart type to the response
        chart_data["chart_type"] = chart_type
        logger.info(f"Completed chart generation with {len(chart_data['datasets'])} datasets")

        if not chart_data["datasets"]:
            logger.warning("No datasets created for chart")
            return {"chart_data": {}, "warning": "No data found for specified parameters"}

        return chart_data

    except Exception as e:
        logger.error(f"Error generating ratio chart: {str(e)}", exc_info=True)
        raise
    finally:
        conn.close()


if __name__ == "__main__":
    # Configure logging for standalone execution
    logging.basicConfig(level=logging.DEBUG, 
                       format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    # Example usage
    company_ids = [1, 2, 3]
    parameters = ["Net Profit", "Borrowings","Land"]
    ratios = ["Gross Margin", "Net Margin"]
    
    logger.info("Running test with example data")
    chart_data = generate_parameter_chart(company_ids, parameters)
    print(chart_data)

    # ratio_chart_data = generate_ratio_chart(company_ids, ratios)
    # print(ratio_chart_data)
