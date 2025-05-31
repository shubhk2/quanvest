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
        refined_context = "No context provided by Colab."

    # Step 2: Compose prompt for Gemini
    prompt = ChatPromptTemplate.from_messages([
        ("system",
         "You are a sharp and analytical financial assistant. "
         "Answer the user's question using both your financial knowledge and the context provided, "
         "without explicitly referencing the context. Be conversational, direct, and insightful—"
         "as if you're analyzing this yourself, not just summarizing a document. "
         "Avoid saying 'based on the context' or similar phrases. "
         "Keep it concise but meaningful."
         ),
        ("human",
         "Context:\n{context}\n\nQuestion: {question}")
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
    )
    # Synchronous invocation, but we wrap in await for consistency
    # If the library supported true async, you could use await directly
    loop = asyncio.get_event_loop()
    response = await loop.run_in_executor(None, llm.invoke, formatted_prompt)

    print("DEBUG: Gemini response received")
    return {
        "response": response.content if hasattr(response, "content") else str(response),
        "retrieved_context": refined_context
    }

if __name__ == "__main__":
    import asyncio # Import asyncio

    # Example usage
    user_query = "What is the financial outlook for company TCS,compare with Infosys?"
    # Run the async function using asyncio.run()
    response = asyncio.run(get_copilot_response(user_query))
    print(response)