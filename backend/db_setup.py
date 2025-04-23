import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

load_dotenv()

def connect_to_db():
    """Connect to PostgreSQL database using environment variables."""
    conn_string = os.getenv("POSTGRES_URL")
    return psycopg2.connect(conn_string)

def create_indexes():
    """
    Create indexes on company_detail.name and on the report_date column
    of each details table for faster lookup.
    """
    conn = connect_to_db()
    try:
        with conn.cursor() as cursor:
            # Create index on company_detail.name
            cursor.execute(
                sql.SQL("CREATE INDEX IF NOT EXISTS idx_company_detail_name ON {table} ({col});")
                .format(table=sql.Identifier("company_detail"), col=sql.Identifier("name"))
            )
            # Create index on balance_sheet.report_date
            cursor.execute(
                sql.SQL("CREATE INDEX IF NOT EXISTS idx_balance_sheet_report_date ON {table} ({col});")
                .format(table=sql.Identifier("balance_sheet"), col=sql.Identifier("report_date"))
            )
            # Create index on cashflow.report_date
            cursor.execute(
                sql.SQL("CREATE INDEX IF NOT EXISTS idx_cashflow_report_date ON {table} ({col});")
                .format(table=sql.Identifier("cashflow"), col=sql.Identifier("report_date"))
            )
            # Create index on profit_and_loss.report_date
            cursor.execute(
                sql.SQL("CREATE INDEX IF NOT EXISTS idx_profit_and_loss_report_date ON {table} ({col});")
                .format(table=sql.Identifier("profit_and_loss"), col=sql.Identifier("report_date"))
            )
            conn.commit()
            print("Indexes created successfully.")
    except Exception as e:
        print(f"Error creating indexes: {e}")
    finally:
        conn.close()

# def map_company_details():
#     """
#     Map the company name with the report_date details from the three details tables.
#     The combined data is inserted into a mapping table company_report_map which should be created beforehand.
#     The mapping also includes a source_table column to indicate which details table the record came from.
#     """
#     conn = connect_to_db()
#     try:
#         with conn.cursor() as cursor:
#             query = """
#             INSERT INTO company_report_map (company_name, report_date, source_table)
#             SELECT cd.name, bs.report_date, 'balance_sheet'
#             FROM balance_sheet bs
#             JOIN company_detail cd ON bs.company_id = cd.id
#             UNION
#             SELECT cd.name, cf.report_date, 'cashflow'
#             FROM cashflow cf
#             JOIN company_detail cd ON cf.company_id = cd.id
#             UNION
#             SELECT cd.name, pl.report_date, 'profit_and_loss'
#             FROM profit_and_loss pl
#             JOIN company_detail cd ON pl.company_id = cd.id;
#             """
#             cursor.execute(query)
#             conn.commit()
#             print("Mapping completed successfully.")
#     except Exception as e:
#         print(f"Error mapping details: {e}")
#     finally:
#         conn.close()

if __name__ == "__main__":
    create_indexes()
    # map_company_details()