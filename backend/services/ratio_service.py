from typing import Optional, List, Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor
from backend.db_setup import connect_to_db

def get_predefined_ratios(company_numbers: List[int], ratio_types: Optional[List[str]], start_year: Optional[int] = None, end_year: Optional[int] = None) -> Dict[str, Any]:
    """
    Calculate predefined financial ratios for companies
    
    Parameters:
    - company_numbers: List of company numbers
    - ratio_types: Types of ratios to calculate
    - start_year: Start year for data
    - end_year: End year for data
    """
    # This is a placeholder. The actual implementation would calculate various ratios
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get all rows for these company_numbers
    cursor.execute("SELECT * FROM company_detail WHERE company_number = ANY(%s)", (company_numbers,))
    rows = cursor.fetchall()
    company_details = {}
    for row in rows:
        company_details.setdefault(row["company_number"], []).append(row)
    
    # Calculate ratios for each company
    results = {
        "companies": company_details,
        "ratios": {},
        "periods": []
    }
    
    # Close connection
    cursor.close()
    conn.close()
    
    return results

def calculate_custom_ratio(company_numbers: List[int], numerator: str, denominator: str, year: Optional[int] = None) -> Dict[str, Any]:
    """
    Calculate custom ratio using specified parameters
    
    Parameters:
    - company_numbers: List of company numbers
    - numerator: Parameter to use as numerator
    - denominator: Parameter to use as denominator
    - year: Year for data (optional)
    """
    # This is a placeholder. The actual implementation would calculate the custom ratio
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    # Get all rows for these company_numbers
    cursor.execute("SELECT * FROM company_detail WHERE company_number = ANY(%s)", (company_numbers,))
    rows = cursor.fetchall()
    companies = {}
    for row in rows:
        companies.setdefault(row["company_number"], []).append(row)
    
    # Calculate custom ratio
    results = {
        "companies": companies,
        "ratio_definition": f"{numerator}/{denominator}",
        "results": {}
    }
    
    # Close connection
    cursor.close()
    conn.close()
    
    return results


import logging
from typing import Dict, Optional
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class FinancialRatioCalculator:
    def __init__(self, db_path: str):
        self.db_path = db_path
        self.conn = None
        self.parameter_mapping = {
            # Direct mappings from your "Actual Name -> Name in DB" list
            'reported profit': 'net profit',
            'profit before interest & tax': 'operating profit',  # Note: quarterly aggregation needed
            'profit (operating)': 'operating profit',  # Note: quarterly aggregation needed
            'sales growth': 'sales growth %',
            'net sales': 'sales',
            'other cost': 'exceptional items',
            'profit for the period (quarterly)': 'yoy profit growth %',  # Note: quarterly only
            'cash from financing activities': 'cash from financing activity',
            'raw material consumption': 'material cost%',
            'cash from investing activities': 'cash from investing activity',
            'cash from operating activities': 'cash from operating activity',
            'cash & bank balances': 'cash & bank',
            'change in working capital': 'working capital changes',
            'raw materials': 'material cost %',
            'profit for the year': 'net profit',

            # Additional common variations and aliases
            'profit from operations': 'profit from operations',  # Already exists
            'operating profit': 'operating profit',  # For quarterly aggregation
            'ebit': 'operating profit',  # EBIT is essentially operating profit
            'pbit': 'operating profit',  # Profit Before Interest & Tax
            'gross profit': 'sales',  # Will need calculation: Sales - Raw Material Cost
            'total income': 'sales',  # Common alias
            'revenue': 'sales',  # Common alias
            'turnover': 'sales',  # Common alias
            'net income': 'net profit',  # Common alias
            'pat': 'net profit',  # Profit After Tax
            'pbt': 'profit before tax',  # Already exists
            'total assets': 'total',  # From balance sheet
            'shareholders equity': 'equity share capital',  # Base equity
            'shareholders funds': 'equity share capital',  # Common alias
            'share capital': 'equity share capital',  # Already exists
            'retained earnings': 'reserves',  # Already exists
            'accumulated depreciation': 'accumulated depreciation',  # From balance sheet
            'fixed assets': 'net block',  # Net fixed assets
            'current assets': 'receivables',  # Partial - will need aggregation
            'inventory': 'inventory',  # From balance sheet
            'stock': 'inventory',  # Common alias
            'debtors': 'receivables',  # Common alias
            'accounts receivable': 'receivables',  # Already exists
            'creditors': 'payables',  # From balance sheet
            'accounts payable': 'payables',  # Common alias
            'borrowings': 'borrowings',  # From balance sheet
            'debt': 'borrowings',  # Common alias
            'loans': 'borrowings',  # Common alias
            'cash': 'cash & bank',  # Already mapped above
            'bank': 'cash & bank',  # Already mapped above
            'investments': 'investments',  # From balance sheet
            'interest expense': 'interest',  # From P&L
            'interest income': 'interest received',  # Already exists
            'dividend income': 'dividend amount',  # Already exists
            'other income': 'other income',  # Already exists
            'finance costs': 'interest',  # Common alias for interest expense
            'depreciation': 'depreciation',  # Already exists
            'amortization': 'depreciation',  # Often combined with depreciation
            'tax expense': 'tax',  # Already exists
            'provision for tax': 'tax',  # Common alias
            'minority interest': 'minority share',  # Already exists
            'non controlling interest': 'minority share',  # Common alias
            'extraordinary items': 'exceptional items',  # Already exists
            'exceptional items': 'exceptional items',  # Already exists
            'operating cash flow': 'cash from operating activity',  # Already mapped
            'investing cash flow': 'cash from investing activity',  # Already mapped
            'financing cash flow': 'cash from financing activity',  # Already mapped
            'free cash flow': 'net cash flow',  # Already exists
            'net cash': 'net cash flow',  # Already exists

            # Parameters that need special handling (quarterly aggregation)
            # These will be handled separately in the get_parameter method
            'quarterly_aggregation_needed': [
                'operating profit',
                'profit before interest & tax',
                'profit (operating)'
            ],

            # Parameters available only in quarterly table
            'quarterly_only': [
                'yoy profit growth %',
                'profit for the period (quarterly)'
            ],

            # Parameters not available (marked with - in your list)
            'not_available': [
                'selling & distribution expenses',
                'market price',
                'profit before depreciation',
                'fixed asset turnover',
                'receivables turnover',
                'net working capital',
                'investment activities',
                'net block additions'
            ]
        }

    def connect_db(self):
        """Establish database connection"""
        try:
            self.conn = connect_to_db()
            logger.info("Database connection established")
        except Exception as e:
            logger.error(f"Database connection failed: {e}")
            raise

    def create_ratio_tables(self):
        """Create ratio tables if they don't exist"""
        queries = [
            """CREATE TABLE IF NOT EXISTS yearly_ratios (
                id serial PRIMARY KEY,
                company_id TEXT NOT NULL,
                year INTEGER NOT NULL,
                ratio_name TEXT NOT NULL,
                ratio_value REAL,
                calculation_date timestamp DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(company_id, year, ratio_name)
            )""",
            """CREATE TABLE IF NOT EXISTS quarterly_ratios (
                id serial PRIMARY Key,
                company_id TEXT NOT NULL,
                year INTEGER NOT NULL,
                quarter TEXT NOT NULL,
                ratio_name TEXT NOT NULL,
                ratio_value REAL,
                calculation_date timestamp DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(company_id, year, quarter, ratio_name)
            )"""
        ]

        try:
            cursor = self.conn.cursor()
            for query in queries:
                cursor.execute(query)
            self.conn.commit()
            logger.info("Ratio tables created/verified")
        except Exception as e:
            logger.error(f"Error creating tables: {e}")
            raise

    def get_parameter(self, company_id: str, year: int, param: str, quarter: str = None) -> Optional[float]:
        """Generic parameter retrieval with mapping support"""
        try:
            # Apply parameter mapping
            param_lower = self.parameter_mapping.get(param.lower(), param.lower())

            # Determine source table
            tables = ['profit_and_loss', 'balance_sheet', 'cashflow', 'quarterly_results']
            for table in tables:
                cursor = self.conn.cursor()
                if quarter and table == 'quarterly_results':
                    cursor.execute(f"""
                        SELECT value FROM quarterly_results
                        WHERE company_id=? AND report_date=?  AND lower(parameter)=?
                    """, (company_id, year, param_lower))
                elif table != 'quarterly_results':
                    year+='-03-31'  # Adjust year for non-quarterly tables
                    cursor.execute(f"""
                        SELECT value FROM {table}
                        WHERE company_id=? AND report_date=? AND lower(parameter)=?
                    """, (company_id, year, param_lower))

                result = cursor.fetchone()
                if result:
                    return float(result[0])
            return None
        except Exception as e:
            logger.warning(f"Error retrieving {param}: {e}")
            return None

    def calculate_ratios(self, company_id: str, year: int, quarter: str = None) -> Dict[str, float]:
        """Main ratio calculation method"""
        ratios = {}

        # Get all required parameters
        params = {
            'sales': self.get_parameter(company_id, year, 'sales', quarter),
            'net_profit': self.get_parameter(company_id, year, 'net profit', quarter),
            # Add all other parameters needed for calculations
        }

        try:
            # Profitability Ratios
            if params['sales'] and params['sales'] != 0:
                # Gross Profit Margin
                if all(params.get(k) is not None for k in ['raw_material_cost', 'power_fuel']):
                    ratios['gross_profit_margin'] = (
                                                            params['sales'] - params['raw_material_cost'] - params[
                                                        'power_fuel']
                                                    ) / params['sales']

                # Net Profit Margin
                if params['net_profit'] is not None:
                    ratios['net_profit_margin'] = params['net_profit'] / params['sales']

            # Liquidity Ratios
            current_assets = sum([
                params.get('receivables', 0),
                params.get('inventory', 0),
                params.get('cash_bank', 0)
            ])

            current_liabilities = sum([
                params.get('payables', 0),
                params.get('other_wc_items', 0)
            ])

            if current_liabilities != 0:
                ratios['current_ratio'] = current_assets / current_liabilities

            # Add all other ratio calculations following the same pattern

        except ZeroDivisionError:
            logger.warning("Division by zero encountered in ratio calculation")

        return ratios

    def save_ratios(self, company_id: str, year: int, ratios: Dict[str, float], quarter: str = None):
        """Save calculated ratios to appropriate table"""
        try:
            cursor = self.conn.cursor()
            table = 'quarterly_ratios' if quarter else 'yearly_ratios'

            for ratio_name, ratio_value in ratios.items():
                if ratio_value is None:
                    continue

                if quarter:
                    cursor.execute(f"""
                        INSERT OR REPLACE INTO {table}
                        (company_id, year, quarter, ratio_name, ratio_value)
                        VALUES (?, ?, ?, ?, ?)
                    """, (company_id, year, quarter, ratio_name, ratio_value))
                else:
                    cursor.execute(f"""
                        INSERT OR REPLACE INTO {table}
                        (company_id, year, ratio_name, ratio_value)
                        VALUES (?, ?, ?, ?)
                    """, (company_id, year, ratio_name, ratio_value))

            self.conn.commit()
            logger.info(f"Saved {len(ratios)} ratios for {company_id} {year}{' Q' + quarter if quarter else ''}")

        except Exception as e:
            logger.error(f"Error saving ratios: {e}")
            self.conn.rollback()

    def process_company(self, company_id: str, years: list, quarters: list = None):
        """Process a single company's data"""
        try:
            self.connect_db()
            self.create_ratio_tables()

            for year in years:
                # Yearly ratios
                yearly_ratios = self.calculate_ratios(company_id, year)
                self.save_ratios(company_id, year, yearly_ratios)

                # Quarterly ratios
                if quarters:
                    for quarter in quarters:
                        q_ratios = self.calculate_ratios(company_id, year, quarter)
                        self.save_ratios(company_id, year, q_ratios, quarter)

        finally:
            if self.conn:
                self.conn.close()


# Example Usage
if __name__ == "__main__":
    calculator = FinancialRatioCalculator('financial_data.db')

    # Configure these with actual data
    companies = ['COMPANY_001']
    years = [2023]
    quarters = ['Q1', 'Q2', 'Q3', 'Q4']

    for company in companies:
        calculator.process_company(company, years, quarters)
