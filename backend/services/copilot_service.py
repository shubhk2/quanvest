import os
from backend.vector_store import db
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from dotenv import load_dotenv
load_dotenv()
print("Current working directory:", os.getcwd())

def get_copilot_response(user_query, company_ids=None, context=None):
    # Step 1: Retrieve relevant docs from FAISS
    results = db.similarity_search(user_query, k=5)
    retrieved_texts = [doc.page_content for doc in results]
    context_text = "\n".join(retrieved_texts) if retrieved_texts else "No relevant context found."
    print(f"DEBUG: Retrieved context texts: {retrieved_texts}")
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
    formatted_prompt = prompt.format(context=context_text, question=user_query)

    # Step 3: Query Gemini API via LangChain
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        return {"error": "GEMINI_API_KEY not set in environment."}
    llm = ChatGoogleGenerativeAI(google_api_key=gemini_api_key, model="gemini-2.0-flash-thinking-exp-01-21")
    response = llm.invoke(formatted_prompt)

    return {
        "response": response.content if hasattr(response, "content") else str(response),
        "retrieved_context": retrieved_texts
    }

if __name__ == "__main__":
    # Example usage
    user_query = "What is the financial outlook for company TCS,compare with Infosys?"
    response = get_copilot_response(user_query)
    print(response)