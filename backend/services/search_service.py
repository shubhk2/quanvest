from backend.db_setup import connect_to_db
from psycopg2.extras import RealDictCursor
from typing import List, Dict, Any
import logging

# Set up logger
logger = logging.getLogger(__name__)

def search_companies(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    logger.debug(f"Searching companies with query: '{query}', limit: {limit}")
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    try:
        search_pattern = f"%{query}%"
        cursor.execute(
            """
            SELECT DISTINCT company_number, full_name
            FROM company_detail
            WHERE lower(full_name) ILIKE lower(%s)
            ORDER BY full_name
            LIMIT %s
            """,
            (search_pattern, limit)
        )
        results = cursor.fetchall()
        logger.info(f"Company search found {len(results)} matches for query '{query}'")
        return results
    except Exception as e:
        logger.error(f"Error searching companies: {str(e)}", exc_info=True)
        raise
    finally:
        cursor.close()
        conn.close()
        logger.debug("Database connection closed")

def search_parameters(query: str, limit: int = 10) -> List[Dict[str, Any]]:
    logger.debug(f"Searching parameters with query: '{query}', limit: {limit}")
    conn = connect_to_db()
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    try:
        # Search across all relevant tables for unique parameter names
        tables = ["profit_and_loss", "balance_sheet", "cashflow", "quarterly_results"]
        results = []
        search_pattern = f"%{query}%"
        logger.debug(f"Searching across tables: {tables}")
        
        for table in tables:
            logger.debug(f"Searching in table: {table}")
            cursor.execute(
                f"""
                SELECT DISTINCT parameter
                FROM {table}
                WHERE lower(parameter) ILIKE lower(%s) 
                LIMIT %s
                """,
                (search_pattern, limit)
            )
            data = cursor.fetchall()
            logger.debug(f"Found {len(data)} matches in {table}")
            
            for row in data:
                param = row["parameter"]
                results.append({"parameter": param, "source_table": table})
                if len(results) >= limit:
                    logger.debug(f"Reached result limit ({limit}), returning early")
                    return results
        
        logger.info(f"Parameter search found {len(results)} total matches for query '{query}'")
        return results
    except Exception as e:
        logger.error(f"Error searching parameters: {str(e)}", exc_info=True)
        raise
    finally:
        cursor.close()
        conn.close()
        logger.debug("Database connection closed")

if __name__ == "__main__":
    # Configure logging for standalone execution
    logging.basicConfig(level=logging.DEBUG, 
                       format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    
    # Example usage
    logger.info("Testing search functionality")
    print(search_companies("Tata"))
    print(search_parameters("sale"))
