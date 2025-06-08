import plotly.graph_objects as go
import plotly.io as pio
from datetime import datetime, timedelta
from backend.db_setup import connect_to_db

PERIOD_MAP = {
    "1month": 30,
    "6month": 182,
    "1yr": 365,
    "3yr": 365 * 3,
    "5yr": 365 * 5,
    "10yr": 365 * 10,
}

def get_stock_data(company_number, data_type, period):
    """
    Fetches stock data (price, dma50, dma200) for a company and period.
    """
    if data_type not in ["price", "dma50", "dma200"]:
        raise ValueError("Invalid data_type. Must be one of: price, dma50, dma200")
    if period not in PERIOD_MAP:
        raise ValueError("Invalid period. Must be one of: " + ", ".join(PERIOD_MAP.keys()))

    table_map = {
        "price": "stock_price",
        "dma50": "stock_dma50",
        "dma200": "stock_dma200"
    }
    table = table_map[data_type]

    conn = connect_to_db()
    cursor = conn.cursor()
    # Get ticker for legend
    cursor.execute("SELECT ticker FROM company_overview WHERE company_number = %s", (company_number,))
    ticker_row = cursor.fetchone()
    ticker = ticker_row[0] if ticker_row else str(company_number)

    # Calculate date range
    cursor.execute(f"SELECT MAX(date) FROM {table} WHERE company_number = %s", (company_number,))
    max_date_row = cursor.fetchone()
    if not max_date_row or not max_date_row[0]:
        cursor.close()
        conn.close()
        return [], ticker
    max_date = max_date_row[0]
    min_date = max_date - timedelta(days=PERIOD_MAP[period])

    cursor.execute(
        f"SELECT date, value FROM {table} WHERE company_number = %s AND date >= %s AND date <= %s ORDER BY date",
        (company_number, min_date, max_date)
    )
    data = cursor.fetchall()
    cursor.close()
    conn.close()
    return data, ticker

def create_stock_chart(company_number, data_type, period):
    """
    Creates a Plotly chart for the given company, data type, and period.
    """
    data, ticker = get_stock_data(company_number, data_type, period)
    if not data:
        return {"error": "No data found for the given parameters."}

    dates, values = zip(*data)
    fig = go.Figure()
    fig.add_trace(go.Scatter(
        x=dates,
        y=values,
        mode='lines',
        name=f'{ticker} - {data_type.upper()}',
        line=dict(width=2)
    ))
    fig.update_layout(
        title=f"{ticker} - {data_type.upper()} ({period})",
        xaxis_title="Date",
        yaxis_title="Value",
        legend_title="Company - Parameter",
        hovermode='x unified',
        template='plotly_white'
    )
    chart_json = pio.to_json(fig)
    return {"chart_json": chart_json}

def get_stock_data_table(company_number, data_type, period):
    """
    Returns the raw data table for the given company, data type, and period.
    """
    data, ticker = get_stock_data(company_number, data_type, period)
    return {
        "company_number": company_number,
        "ticker": ticker,
        "data_type": data_type,
        "period": period,
        "data": [{"date": d.strftime("%Y-%m-%d"), "value": v} for d, v in data]
    }

if __name__ == "__main__":
    # Example usage
    company_number = 12
    data_type = "price"
    period = "1month"
    chart = create_stock_chart(company_number, data_type, period)
    print(chart)

    table = get_stock_data_table(company_number, data_type, period)
    print(table)