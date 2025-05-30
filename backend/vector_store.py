import os
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# Embedding model
model_name = "sentence-transformers/all-MiniLM-L6-v2"
embedding_model = HuggingFaceEmbeddings(model_name=model_name)

# Construct the absolute path to the faiss_index directory
# os.path.dirname(__file__) gets the directory of the current script (backend/)
# os.path.join then creates the correct path to backend/faiss_index
current_script_directory = os.path.dirname(__file__)
faiss_index_path = os.path.join(current_script_directory, "faiss_index")
print(f"Loading FAISS index from: {faiss_index_path}")
# Load FAISS index using the constructed path
db = FAISS.load_local(
    faiss_index_path,
    embeddings=embedding_model,
    allow_dangerous_deserialization=True
)