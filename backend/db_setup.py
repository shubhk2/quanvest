import os
import psycopg2
from psycopg2 import sql
from dotenv import load_dotenv

load_dotenv()

def connect_to_db():
    """Connect to PostgreSQL database using environment variables."""
    conn_string = os.getenv("POSTGRES_URL")
    conn = psycopg2.connect(conn_string)
    return conn

def sanitize_column_name(col):
    """Sanitize column name for SQL - replace special chars with underscores"""
    sql_col = ''.join(c if c.isalnum() else '_' for c in col).lower()
    # Avoid duplicate underscores
    while '__' in sql_col:
        sql_col = sql_col.replace('__', '_')
    # Remove leading/trailing underscores
    return sql_col.strip('_')
#
def create_tables(conn):
    """Create database tables for Company Detail and financial statements"""
    cursor = conn.cursor()

    # Create Company Detail table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS company_detail (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
    );
    """)
#
    # For each financial statement table, we'll create it dynamically after examining the CSV
    for table_code, table_name in [
        ('PL', 'Profit_and_Loss'),
        ('BS', 'Balance_Sheet'),
        ('CF', 'Cashflow')
    ]:
        # Check if CSV exists before creating table
        script_dir = os.path.dirname(os.path.abspath(__file__))
        parent_dir = os.path.dirname(script_dir)
        csv_path = os.path.join(parent_dir, "merged_data", f"{table_name.title().replace('_', '_')}.csv")

        if not os.path.exists(csv_path):
            print(f"Warning: {csv_path} does not exist, skipping {table_name} table creation")
            continue

        # Read CSV to get column names
        df = pd.read_csv(csv_path)

        # Basic columns every table should have
        columns = [
            "id SERIAL PRIMARY KEY",
            "company_id INTEGER REFERENCES company_detail(id)",
            "report_date DATE",
            "created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
            "updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
        ]

        # Add columns for each Parameter (excluding the ones we already handle)
        skip_cols = ['id', 'company_id', 'report_date', 'section']
        for col in df.columns:
            if col not in skip_cols:
                # Sanitize column name - replace special chars with underscores
                sql_col = ''.join(c if c.isalnum() else '_' for c in col).lower()
                # Avoid duplicate underscores
                while '__' in sql_col:
                    sql_col = sql_col.replace('__', '_')
                # Remove leading/trailing underscores
                sql_col = sql_col.strip('_')
                # Add column definition (numeric for financial values)
                columns.append(f"{sql_col} NUMERIC NULL")

        # Create the table
        create_table_sql = f"""
        CREATE TABLE IF NOT EXISTS {table_name} (
            {', '.join(columns)}
        );
        """

        # Create trigger for updated_at
        trigger_sql = f"""
        CREATE OR REPLACE FUNCTION update_timestamp_column()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.updated_at = NOW();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;

        DROP TRIGGER IF EXISTS update_{table_name}_timestamp ON {table_name};

        CREATE TRIGGER update_{table_name}_timestamp
        BEFORE UPDATE ON {table_name}
        FOR EACH ROW
        EXECUTE FUNCTION update_timestamp_column();
        """

        # Execute SQL
        cursor.execute(create_table_sql)
        cursor.execute(trigger_sql)
        print(f"Created table: {table_name}")

    # Commit changes
    conn.commit()
    cursor.close()

def load_data(conn):
    """Load data from merged CSVs into database tables"""
    cursor = conn.cursor()

    # Get paths to merged data files
    script_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.dirname(script_dir)
    merged_dir = os.path.join(parent_dir, "merged_data")

    # Load company data first
    company_path = os.path.join(merged_dir, "Company_Detail.csv")
    if os.path.exists(company_path):
        companies_df = pd.read_csv(company_path)
        print(f"Loading {len(companies_df)} companies")

        # Clear existing data
        cursor.execute("TRUNCATE company_detail CASCADE;")

        # Insert companies one by one to preserve IDs
        for _, row in companies_df.iterrows():
            cursor.execute(
                "INSERT INTO company_detail (id, name) VALUES (%s, %s) ON CONFLICT (name) DO NOTHING",
                (row['id'], row['name'])
            )

    # Load financial statement data
    for table_code, table_name in [
        ('PL', 'Profit_and_Loss'),
        ('BS', 'Balance_Sheet'),
        ('CF', 'Cashflow')
    ]:
        csv_path = os.path.join(merged_dir, f"{table_name.title().replace('_', '_')}.csv")

        if not os.path.exists(csv_path):
            print(f"Warning: {csv_path} does not exist, skipping {table_name} data loading")
            continue

        df = pd.read_csv(csv_path)
        print(f"Loading {len(df)} rows into {table_name}")

        # Clear existing data
        cursor.execute(f"TRUNCATE {table_name};")

        # Get column names for insertion
        columns = [col for col in df.columns if col != 'section']  # Exclude section as it's already encoded in the table name
        db_columns = [sanitize_column_name(col) for col in columns]

        # Prepare and execute SQL for each row
        for _, row in df.iterrows():
            # Get values for this row
            values = [row[col] if col in row else None for col in columns]

            # Format date value
            date_index = columns.index('report_date') if 'report_date' in columns else -1
            if date_index >= 0:
                values[date_index] = pd.to_datetime(values[date_index]).strftime('%Y-%m-%d')

            # Build and execute INSERT
            placeholders = ', '.join(['%s'] * len(values))
            columns_str = ', '.join(db_columns)

            insert_sql = f"INSERT INTO {table_name} ({columns_str}) VALUES ({placeholders})"
            cursor.execute(insert_sql, values)

    # Commit changes
    conn.commit()
    cursor.close()
    print("Data loading complete!")
#
# def main():
#     """Main function to set up database and load data"""
#     try:
#         # Connect to database
#         conn = connect_to_db()
#         print("Connected to PostgreSQL database")
#
#         # Create tables
#         create_tables(conn)
#
#         # Load data
#         load_data(conn)
#
#         # Close connection
#         conn.close()
#         print("Database setup complete!")
#
#     except Exception as e:
#         print(f"Error: {str(e)}")
#
# if __name__ == "__main__":
#     main()


if __name__ == "__main__":
    create_indexes()
    # map_company_details()