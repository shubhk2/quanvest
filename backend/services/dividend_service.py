import psycopg2
from psycopg2.extras import RealDictCursor
from backend.db_setup import connect_to_db

def get_dividend_data(company_number: int):
    """
    Returns dividend details for the given company_number, including company full_name and ticker.
    """
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    # Fetch company full_name and ticker
    cursor.execute("SELECT full_name, ticker FROM company_detail WHERE id = %s", (company_number,))
    company = cursor.fetchone()
    if not company:
        cursor.close()
        conn.close()
        raise ValueError("Company number not found in database.")

    # Fetch dividend data
    cursor.execute("""
        SELECT
            symbol, company_name, series, purpose, face_value,
            declaration_date, ex_dividend_date, record_date,
            book_closure_start_date, book_closure_end_date
        FROM dividend
        WHERE company_no = %s
        """, (company_number,))
    dividend_rows = cursor.fetchall()
    cursor.close()
    conn.close()

    headers = [
        "Symbol", "Company Name", "Series", "Purpose", "Face Value",
        "Declaration Date", "Ex-Dividend Date", "Record Date",
        "Book Closure Start Date", "Book Closure End Date"
    ]

    return {
        "company_name": company["full_name"],
        "ticker": company["ticker"],
        "headers": headers,
        "data": dividend_rows
    }


if __name__ == "__main__":
    # Example usage
    try:
        company_number = 42 # Replace with a valid company number
        file_id = get_dividend_data(company_number)
        print(f"File ID for company number {company_number}: {file_id}")
    except Exception as e:
        print(f"Error: {e}")