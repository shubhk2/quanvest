import os
import asyncio
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv

load_dotenv()
print("Current working directory:", os.getcwd())

async def get_copilot_response(
    user_query: str,
    refined_context: str = ""
):
    print("DEBUG: Enter get_copilot_response")
    # No longer do db.similarity_search(), rely on refined_context from Colab
    if not refined_context:
        print("DEBUG: No refined context from Colab, using fallback")
        # Fallback context should be minimal or indicate absence if it affects structured output
        refined_context = "No specific financial context was retrieved for this query."

    # Step 2: Compose prompt for Gemini
    # New system prompt for structured TEXT output and specific analyses
    system_prompt_text = """You are a financial analyst. Provide a clear, well-structured text response.

If query-relevant data exists in the context, analyze and present information under the following headings if applicable. Omit any heading if no relevant data is found.If the query isnt related to financial analysis,respond with "Not a finance question".

**Letter to Shareholders Analysis:**
Analyze for tone (style: assertive/cautious/evasive; emotion: upbeat/apologetic; transparency: 🟢Transparent/🟡Neutral/🔴Vague/Defensive tag). Provide a brief justification and few key statements directly,if possible in quotes

**Legal Issues Summary:**
Provide a detailed text summary of legal issues.

**Auditor Report Summary:**
Summarize quantitative data from the auditor's report.

**Investor Relations Summary:**
Summarize quantitative data relevant to investor relations.

**ESG Summary:**
Summarize quantitative data for ESG factors.

General Rules:
1. Focused Query: If the user's query targets one specific area (e.g., 'shareholder letter analysis'), focus your response primarily on that area, potentially omitting other sections unless directly relevant for comparison or context.
2. Comparisons: For company comparisons, provide brief main differentiating points directly in your analysis.
3. General Query: If the query is general and doesn't map directly to the above sections, provide a concise, insightful analysis based on the context.
4. Style: Be concise, direct, and insightful. Do not use phrases like "based on the context provided."
5. Omit Empty Sections: If no relevant information is found for a section in the context, do not include its heading or any placeholder text for it.
"""

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt_text),
        ("human", "Context:\n{context}\n\nQuestion: {question}")
    ])
    formatted_prompt = prompt.format(context=refined_context, question=user_query)

    # Optional debug
    print(f"DEBUG: Formatted prompt for Gemini: {formatted_prompt}")

    # Step 3: Query Gemini
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        print("DEBUG: GEMINI_API_KEY missing")
        return {"error": "GEMINI_API_KEY not set in environment."}

    llm = ChatGoogleGenerativeAI(
        google_api_key=gemini_api_key,
        model="gemini-2.0-flash-thinking-exp-01-21" 
        # Consider adding generation_config={"response_mime_type": "application/json"}
        # if the model version supports it and you consistently want JSON.
        # For now, relying on prompt for JSON structure.
    )
    # Synchronous invocation, but we wrap in await for consistency
    # If the library supported true async, you could use await directly
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, llm.invoke, formatted_prompt)

    print("DEBUG: Gemini response received")
    # The response.content is expected to be a JSON string or general text based on the prompt.
    # No explicit JSON parsing here; the router/frontend will handle it.
    return {
        "response": response.content if hasattr(response, "content") else str(response),
        "retrieved_context": refined_context
    }

if __name__ == "__main__":
    import asyncio # Import asyncio

    # Example usage
    user_query = "india vs pakistan score"
    # Run the async function using asyncio.run()
    response = asyncio.run(get_copilot_response(user_query, refined_context="hello developer of this project here.I am not providing you with any context here,I just want to test how is your response looking like.For now you can take any data youwant,I am not checking for integrity just the format."))
    print(response)
