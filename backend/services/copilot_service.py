import os
import asyncio
import re
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from jinja2 import Template

load_dotenv()


def determine_template_type(user_query: str, context_data: dict = None) -> str:
    """Determine which template to use based on query content and available data"""
    query_lower = user_query.lower()

    # Edge case detection
    edge_cases = {
        'news': ['news', 'recent news', 'latest news', 'breaking news'],
        'forecasting': ['forecast', 'forecasting', 'predict', 'prediction', 'future', 'valuation', 'modelling',
                        'intrinsic value', 'dcf', 'fair value'],
        'stock_market': ['stock price', 'share price', 'market data', 'stock market', 'trading', 'volume',
                         'technical analysis'],
        'non_finance': ['weather', 'sports', 'entertainment', 'politics', 'technology news', 'india vs pakistan']
    }

    for case_type, keywords in edge_cases.items():
        if any(keyword in query_lower for keyword in keywords):
            return case_type

    if not context_data:
        return 'default_financial'

    # Data-driven template selection
    has_charts = context_data.get('has_charts', False)
    has_financials = context_data.get('has_financials', False)
    has_shareholding = context_data.get('has_shareholding', False)
    company_count = context_data.get('company_count', 0)
    endpoint_type = context_data.get('endpoint_type', 'financials')
    endpoint_mode = context_data.get('endpoint_mode', 'base')
    query_type = context_data.get('query_type', 'comprehensive')

    # Template priority logic
    if company_count > 1:
        return 'comparative_analysis'
    elif 'overview' in query_lower or query_type == 'company_overview':
        return 'company_overview'
    elif has_shareholding:
        return 'shareholding_analysis'
    elif endpoint_type == 'ratios' and endpoint_mode == 'parameters':
        return 'ratio_analysis_specific'
    elif endpoint_type == 'ratios':
        return 'ratio_analysis_comprehensive'
    elif endpoint_mode == 'parameters' and has_financials:
        return 'parameter_specific_analysis'
    elif has_charts and has_financials:
        return 'comprehensive_with_charts'
    elif has_charts:
        return 'chart_focused_analysis'
    elif has_financials:
        return 'tabular_analysis'
    else:
        return 'default_financial'


def get_template_content(template_type: str) -> str:
    """Return the appropriate Jinja2 template content"""

    templates = {
        'news': """
Sorry, we currently don't provide news analysis or recent news updates. Our platform focuses on financial statement analysis, ratios, and company fundamentals.

For the latest company news and market updates, please refer to financial news sources or our upcoming news section.
        """,

        'forecasting': """
Sorry, we don't provide forecasting, valuation modeling, or intrinsic value calculations at this time. Our platform specializes in historical financial analysis and ratio computations.

For valuation models and forecasting, please consult specialized financial modeling tools or professional analysts.
        """,

        'stock_market': """
For real-time stock prices, trading data, and market information, please visit our dedicated **Stock Data** page at `/stock_data`.

Our current analysis focuses on fundamental financial data from annual reports and financial statements.
        """,

        'non_finance': """
Sorry, this doesn't appear to be a finance-related question. Our platform specializes in financial analysis, company fundamentals, and investment metrics.

Please ask questions related to:
- Company financial performance
- Financial ratios and metrics  
- Balance sheet, income statement, or cash flow analysis
- Shareholding patterns
- Company comparisons
        """,

        'company_overview': """
You are a financial analyst providing company overview analysis.

User Query: "{{question}}"

**Context:** A company overview has been displayed above showing key company information and statistics.

~OVERVIEW_STATS_TABLE~

**Your Task:**
Based on the financial context below, provide a focused analysis in 3-4 concise paragraphs covering:

1. **Key Financial Highlights** - Most important metrics from the data
2. **Performance Assessment** - Strengths and areas of concern  
3. **Investment Perspective** - What this means for potential investors

**Available Financial Data:**
{{context}}

**Instructions:**
- Be concise and actionable
- Focus on insights not already covered in the overview above
- Use specific numbers when available
- Avoid repeating basic company information already displayed
        """,

        'comparative_analysis': """
You are a financial analyst comparing multiple companies.

User Query: "{{question}}"

**Available Data:**
{{context}}

**Analysis Framework:**
Provide a structured comparison using these sections:

**📊 Key Metrics Comparison**
~COMPARISON_TABLE~

**💡 Performance Analysis**
- Highlight the top performer in each key area
- Identify relative strengths and weaknesses
- Note any significant differences in business models

**🎯 Investment Implications**  
- Which company offers better value proposition?
- Risk considerations for each
- Suitability for different investor types

**Instructions:**
- Use bullet points for clarity
- Include specific metrics and percentages
- Be objective and fact-based
- Conclude with a brief comparative summary
        """,

        'shareholding_analysis': """
You are analyzing company shareholding patterns and ownership structure.

User Query: "{{question}}"

**Shareholding Data:**
~SHAREHOLDING_TABLE~

**Financial Context:**
{{context}}

**Your Analysis Should Cover:**

**🏢 Ownership Structure**
- Key institutional and individual shareholders
- Promoter vs public holding analysis
- Any significant recent changes in holdings

**📈 Shareholding Insights**
- Quality of institutional investors
- Concentration vs diversification of ownership
- Impact on company governance and decision-making

**💼 Investment Implications**
- What the shareholding pattern suggests about confidence
- Liquidity considerations
- Governance quality indicators

**Instructions:**
- Reference specific shareholders and percentages
- Explain the significance of major holdings
- Connect shareholding to company performance and strategy
        """,

        'ratio_analysis_specific': """
You are a financial analyst focusing on specific financial ratios.

User Query: "{{question}}"

**Requested Ratios Analysis:**
~RATIOS_TABLE~

**Supporting Context:**
{{context}}

**Detailed Ratio Analysis:**

**📊 Ratio Interpretation**
- What each ratio indicates about company performance
- Industry benchmarking context where relevant
- Trends and year-over-year changes

**🔍 Deep Dive Insights**
- Interconnections between the ratios
- What the ratios reveal about management efficiency
- Red flags or positive indicators

**📈 Performance Assessment**
- Overall financial health based on these metrics
- Comparative performance vs industry standards
- Areas for improvement or concern

**Instructions:**
- Focus specifically on the requested ratios
- Provide numerical context and percentages
- Explain what each ratio means in plain language
- Connect ratios to business performance
        """,

        'ratio_analysis_comprehensive': """
You are conducting a comprehensive financial ratio analysis.

User Query: "{{question}}"

**Complete Ratio Analysis:**
~COMPREHENSIVE_RATIOS_TABLE~

**Supporting Data:**
{{context}}

**Comprehensive Financial Health Assessment:**

**💰 Profitability Analysis**
- Revenue efficiency and margin trends
- Return on assets and equity performance
- Earnings quality assessment

**🏦 Liquidity & Solvency**  
- Short-term financial flexibility
- Debt management and leverage
- Cash flow adequacy

**⚡ Efficiency Metrics**
- Asset utilization effectiveness
- Working capital management
- Operational efficiency indicators

**📊 Overall Financial Score**
- Integrated assessment across all ratio categories
- Key strengths and weaknesses
- Strategic financial recommendations

Use the comprehensive ratio data to provide actionable insights.
        """,

        'parameter_specific_analysis': """
You are analyzing specific financial statement parameters.

User Query: "{{question}}"

**Focused Parameter Analysis:**
~FINANCIAL_PARAMETERS_TABLE~

**Context:**
{{context}}

**Parameter-Specific Insights:**

**📋 Parameter Overview**
- What these specific metrics represent
- Their importance in financial analysis
- Industry context and benchmarks

**🔢 Numerical Analysis**
- Trends across the time periods shown
- Percentage changes and growth rates
- Absolute values and their significance

**💡 Strategic Implications**
- What these parameters reveal about business strategy
- Management decisions reflected in the numbers
- Future outlook based on current trends

**Instructions:**
- Focus exclusively on the requested parameters
- Provide specific numerical insights
- Explain business implications of the trends
- Keep analysis targeted and actionable
        """,

        'comprehensive_with_charts': """
You are providing comprehensive financial analysis with visual data support.

User Query: "{{question}}"

**Multi-Dimensional Analysis:**

**📊 Visual Trends Analysis**
~CHARTS_SECTION~

The charts above illustrate key trends. Based on this visual data and the supporting context:

**📈 Performance Trends**
- Key patterns visible in the chart data
- Year-over-year progression analysis  
- Seasonal or cyclical patterns

**💹 Financial Data Deep Dive**
~FINANCIAL_DATA_TABLE~

**🎯 Integrated Insights**
- How the visual trends correlate with financial metrics
- Cross-validation between chart and table data
- Emerging patterns and future implications

**Supporting Context:**
{{context}}

**Instructions:**
- Reference both visual and tabular data
- Identify correlations between different data types
- Provide forward-looking insights based on trends
- Maintain focus on actionable intelligence
        """,

        'chart_focused_analysis': """
You are analyzing financial data with primary focus on visual trends.

User Query: "{{question}}"

**Chart-Based Financial Analysis:**

**📊 Visual Data Presentation**
~CHARTS_SECTION~

**📈 Trend Analysis**
Based on the charts above and supporting context:

- **Primary Trends:** Key patterns and movements
- **Performance Indicators:** What the trends suggest about performance
- **Comparative Analysis:** How metrics relate to each other over time
- **Future Implications:** What current trends might indicate

**Supporting Context:**
{{context}}

**Key Insights:**
- Focus on what the visual data reveals
- Identify inflection points and significant changes
- Provide context for trend interpretations
- Connect visual patterns to business fundamentals

**Instructions:**
- Lead with chart insights
- Reference specific time periods and values
- Explain the significance of trend directions
- Provide actionable conclusions
        """,

        'tabular_analysis': """
You are analyzing detailed financial data from company statements.

User Query: "{{question}}"

**Financial Statement Analysis:**

**📋 Data Overview**
~FINANCIAL_DATA_TABLE~

**🔍 Detailed Analysis**
Based on the financial data above:

**Key Financial Highlights:**
- Most significant figures and their implications
- Year-over-year changes and growth patterns
- Notable strengths and concerns in the data

**Performance Assessment:**
- What the numbers reveal about company health
- Efficiency and profitability indicators
- Cash flow and liquidity considerations

**Strategic Insights:**
- Management decisions reflected in the financials
- Competitive positioning based on metrics
- Areas requiring attention or improvement

**Supporting Context:**
{{context}}

**Instructions:**
- Reference specific figures from the table
- Provide percentage calculations and comparisons
- Focus on material changes and trends
- Deliver actionable financial insights
        """,

        'default_financial': """
You are a financial analyst providing comprehensive company analysis.

User Query: "{{question}}"

**Financial Analysis:**

Based on the available financial information and context provided:

{{context}}

**Analysis Framework:**

**📊 Financial Overview**
- Key metrics and performance indicators
- Important trends and patterns identified
- Significant financial highlights

**💡 Key Insights**
- What the data reveals about company performance  
- Strengths and areas of concern
- Competitive positioning and efficiency

**🎯 Investment Perspective**
- What this analysis means for stakeholders
- Risk factors and opportunities identified
- Overall assessment and recommendations

**Instructions:**
- Provide clear, structured analysis
- Use specific data points when available
- Focus on actionable insights
- Maintain objective, professional tone
        """
    }

    return templates.get(template_type, templates['default_financial'])


async def get_copilot_response(
        user_query: str,
        refined_context: str = "",
        context_data: dict = None
):
    """Enhanced copilot response with dynamic template selection"""

    print("DEBUG: Enter get_copilot_response with context_data:", context_data)

    if not refined_context:
        print("DEBUG: No refined context from Colab, using fallback")
        refined_context = "No specific financial context was retrieved for this query."

    # Determine appropriate template
    template_type = determine_template_type(user_query, context_data)
    print(f"DEBUG: Selected template type: {template_type}")

    # Get template content
    template_content = get_template_content(template_type)

    # For edge cases, return immediately without calling Gemini
    if template_type in ['news', 'forecasting', 'stock_market', 'non_finance']:
        return {
            "response": template_content.strip(),
            "retrieved_context": refined_context,
            "template_type": template_type
        }

    # Create Jinja2 template and render
    template = Template(template_content)

    # Prepare template variables
    template_vars = {
        'question': user_query,
        'context': refined_context
    }

    # Add context-specific variables
    if context_data:
        template_vars.update({
            'company_count': context_data.get('company_count', 1),
            'endpoint_type': context_data.get('endpoint_type', 'financials'),
            'has_charts': context_data.get('has_charts', False),
            'has_financials': context_data.get('has_financials', False),
            'has_shareholding': context_data.get('has_shareholding', False)
        })

    # Render the template
    formatted_prompt = template.render(**template_vars)

    print(f"DEBUG: Formatted prompt for Gemini: {formatted_prompt[:500]}...")

    # Call Gemini API
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("DEBUG: GEMINI_API_KEY missing")
        return {"error": "GEMINI_API_KEY not set in environment."}

    try:
        llm = ChatGoogleGenerativeAI(
            google_api_key=gemini_api_key,
            model="gemini-2.0-flash-thinking-exp-01-21",
            temperature=0.3  # Lower temperature for more consistent financial analysis
        )

        # Create a simple prompt wrapper
        prompt = ChatPromptTemplate.from_messages([
            ("human", formatted_prompt)
        ])

        final_prompt = prompt.format()

        # Execute the call
        loop = asyncio.get_event_loop()
        response = await loop.run_in_executor(None, llm.invoke, final_prompt)

        print("DEBUG: Gemini response received")

        # Post-process response to ensure placeholder formatting
        response_content = response.content if hasattr(response, "content") else str(response)

        # Ensure proper placeholder formatting
        response_content = ensure_proper_placeholders(response_content)

        return {
            "response": response_content,
            "retrieved_context": refined_context,
            "template_type": template_type,
            "context_data": context_data
        }

    except Exception as e:
        print(f"DEBUG: Gemini API call failed: {str(e)}")
        return {
            "error": f"Gemini API call failed: {str(e)}",
            "retrieved_context": refined_context,
            "template_type": template_type
        }


def ensure_proper_placeholders(response_content: str) -> str:
    """Ensure response contains proper placeholders for frontend integration"""

    # Standard placeholder patterns that should be preserved
    placeholder_patterns = [
        '~OVERVIEW_STATS_TABLE~',
        '~COMPARISON_TABLE~',
        '~SHAREHOLDING_TABLE~',
        '~RATIOS_TABLE~',
        '~COMPREHENSIVE_RATIOS_TABLE~',
        '~FINANCIAL_PARAMETERS_TABLE~',
        '~CHARTS_SECTION~',
        '~FINANCIAL_DATA_TABLE~'
    ]

    # If response doesn't contain placeholders but should, add appropriate ones
    # This is a safety mechanism
    if not any(placeholder in response_content for placeholder in placeholder_patterns):
        # Add generic table placeholder if financial data is mentioned
        if any(term in response_content.lower() for term in ['table', 'data', 'metrics', 'financial']):
            # Insert placeholder after first paragraph
            paragraphs = response_content.split('\n\n')
            if len(paragraphs) > 1:
                paragraphs.insert(1, '~FINANCIAL_DATA_TABLE~')
                response_content = '\n\n'.join(paragraphs)

    return response_content


# Test function
if __name__ == "__main__":
    import asyncio

    # Test different template types
    test_cases = [
        {
            "query": "What are the recent news about TCS?",
            "context": "",
            "context_data": None
        },
        {
            "query": "Show me TCS profitability ratios",
            "context": "Financial data context here...",
            "context_data": {
                "endpoint_type": "ratios",
                "endpoint_mode": "parameters",
                "has_financials": True,
                "company_count": 1
            }
        },
        {
            "query": "Compare TCS vs Infosys",
            "context": "Comparative financial data...",
            "context_data": {
                "company_count": 2,
                "has_financials": True,
                "endpoint_type": "financials"
            }
        }
    ]

    for i, test_case in enumerate(test_cases):
        print(f"\n=== Test Case {i + 1} ===")
        response = asyncio.run(get_copilot_response(
            test_case["query"],
            test_case["context"],
            test_case["context_data"]
        ))
        print(f"Template Type: {response.get('template_type')}")
        print(f"Response: {response.get('response', '')[:200]}...")