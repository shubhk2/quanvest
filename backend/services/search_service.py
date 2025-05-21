from backend.db_setup import connect_to_db
from psycopg2.extras import RealDictCursor
from typing import List, Dict, Any

def search_companies(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    try:
        cursor.execute(
            """
            SELECT DISTINCT company_number, full_name
            FROM company_detail
            WHERE lower(full_name) ILIKE lower(%s)
            ORDER BY full_name
            LIMIT %s
            """,
            (f"%{query}%", limit)
        )
        return cursor.fetchall()
    finally:
        cursor.close()
        conn.close()

def search_parameters(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Search across all relevant tables for unique parameter names
        tables = ["profit_and_loss", "balance_sheet", "cashflow", "quarterly_results"]
        results = []
        # seen = set()
        for table in tables:
            cursor.execute(
                f"""
                SELECT DISTINCT parameter
                FROM {table}
                WHERE lower(parameter) ILIKE lower(%s) 
                LIMIT %s
                """,
                (f"%{query}%", limit)
            )
            data= cursor.fetchall()
            # print(data)
            for row in data:
                param = row["parameter"]
                results.append({"parameter": param, "source_table": table})
                if len(results) >= limit:
                    return results
        return results
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    # Example usage
    print(search_companies("Tata"))
    print(search_parameters("sale"))
    # Limit the number of results

