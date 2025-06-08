from backend.db_setup import connect_to_db
def get_dividend_file_id(company_number: int) -> str:
    """
    Returns a string representing the file id for the given company_number.
    You can implement your own logic or mapping here.
    """
    conn= connect_to_db()
    cursor = conn.cursor()
    cursor.execute("Select ticker from company_overview where company_number = %s", (company_number,))
    ticker = cursor.fetchone()
    tl={'ADANIPORTS': '1z9G_1F_NLhxmFelYHxhb-Itbwe3vn6Ui', 'ADANIPOWER': '1DcZ099QWdTsq5kOnxnhr_QGQTI1eq3nF', 'APOLLOHOSP': '1TRtsrfzwbhHtDZgs-ZjvGsUeLIqqnOJh', 'AUROPHARMA': '1y58-fkSTWsISi4lD2zhsyrP-nPsjM1Zn', 'AUBANK': '11KG_5-6_8x0Ut9r1ogGFmMprtxQNVjzW', 'AXISBANK': '1PAR08Nr-miZ2SolHNAqBc6YfoZS7L5pf', 'BAJAJ-AUTO': '1DCJyhbrGmgg8kX4vz5-ZuRTTx6sHGHKg', 'BAJAJFINSV': '1ebBzoOWcHEB1zSFTIfkgFS5yOWwhmcI8', 'BEL': '1uOd409x9uwUn_oZ2I4a2gnP5KrZk01FA', 'BHARTIARTL': '1BcbOUa2j-KgM50_EDEZuaY7rDXBPhSA4', 'CIPLA': '19U8BDkrjm4wAyFWCx1Yn-imcKKZBKmba', 'COALINDIA': '1jA_YzgsX_xQuOjEqBjq-BgAGw7JFZ52x', 'DRREDDY': '163SaaKuAJ-EcQKhFzDSTBq_9Esy3Y9LQ', 'EICHERMOT': '1nk4DJ_n0auD-Ns8os2vK3CCI8m5yDOZn', 'GRASIM': '1_JqgBZq1VL-6f3lSaVYYoZGPWyzn379w', 'HCLTECH': '1LYxM8vcjxZq8wsO9dRZvTPsmZtctimXL', 'HEROMOTOCO': '1zYonNpyYGUlME6ZftxrdSyq8RtR2b4U_', 'HINDALCO': '14am18jhrl3IB26ik-st7d92RrUNTniJc', 'HINDUNILVR': '1dK714kkma7QJfKQI_NIBAgAPsqh9iP6m', 'ICICIBANK': '1sKeAS5OZvNMY8a6AbfKwH-x63qNeN9rS', 'INDUSINDBK': '1JA_WmGOQWZpoef-mIfWUU3y4jyTOUJFh', 'INFY': '198bhiaR9eF-ldxDirX_2w7iebJbgcqHd', 'ITC': '1Ylg0ZwnZWqVhXT7fm4DKDUjHeWf1PgOP', 'JOSPLH': '1Z2oY-KfYyA9OP6pelmdQgTRDik1J6nDO', 'JSWSTEEL': '1sZbZsttAYKqPPox7s_8ayNOIF4mTyiFQ', 'KOTAKBANK': '1IzqZ4HXg3yZKwlfiyteifCTmT1hmVo_l', 'LT': '1uYDXyyGyVC6ZIb7fTByQwCQ9eNvQXR0E', 'M&M': '1-Zu153uMM-A_lowih-2EdiFoW55lHOES', 'MARUTI': '1TpMxC5R8_xf7NYhDpF_kRfll2hNgPQR8', 'NESTLEIND': '12_gbjlGz43rF18-6AEvroF9lHxwH44pm', 'NTPC': '1PGq4qSWPgOQiXQJvXa_LS9V9qSSK2592', 'ONGC': '1KJfmMIXsgrlfvY81JsQeTkZrHLalP_8g', 'POWERGRID': '1Ajn5pQ6sCnmdWsy65beeu5iEjKmiDkg6', 'RELIANCE': '1Zr5wpTQOhvcCaRii82CBTJNU0nMxhUYv', 'SBILIFE': '1nDX89y6A6lmToVuNqIgGroNWrTXoq1s_', 'SBIN': '1y_vvZREw2b9HLB2zAhN_zVpk4bAvSp4G', 'SHRIRAMFIN': '1ODZSebz12cEou-3K_nSSJLGdkA13nGXq', 'SUNPHARMA': '1lf08Um6jFCJbKc7U18LNWNS9ignm_Kpu', 'TATACONSUM': '1K0GSFZMzH1RpBzisItX7MgbulwqJWnz1', 'TATAMOTORS': '1bvKuCpAY_zls3_2lHAJ3XOZgTGgRyDvB', 'TATASTEEL': '1nvbThTdybVsF-5m5wI_dzHWrJTpEKAwq', 'TCS': '1zarXGk-gfvEgclma8EeWLGe4WhS7wtBw', 'TECHM': '1FiyeUSmDA6Y7oIl2qAhdO_z9ytI8hyIU', 'TITAN': '1BiE17aJZWFHAY3XHm74UWNGDt542omAX', 'TRENT': '1N_eedv7Vs77YP-Z3uaargLHAN_wxkNvo', 'ULTRACEMCO': '1NE3lDcv0ztFZk76N8HCe0rL6-ldos5Ml', 'WIPRO': '1QREKmABXJFG80iRbTkEQJKYH5bZMlVKW'}
    if ticker is None:
        raise ValueError("Company number not found in database.")
    drive_id=tl[ticker[0]]
    # Placeholder logic: just return a string based on company_number
    return drive_id


if __name__ == "__main__":
    # Example usage
    try:
        company_number = 12 # Replace with a valid company number
        file_id = get_dividend_file_id(company_number)
        print(f"File ID for company number {company_number}: {file_id}")
    except Exception as e:
        print(f"Error: {e}")