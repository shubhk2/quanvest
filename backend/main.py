from fastapi import FastAPI
import os
import asyncio
from contextlib import asynccontextmanager
from concurrent.futures import ThreadPoolExecutor
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging
import uvloop

# Configure logging
logging.basicConfig(
    level=logging.DEBUG if os.environ.get('DEBUG') else logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

# Import routers
from backend.routers import stock_data, home, financials, ratios, overview, charts, copilot
from backend.routers import search, dividend, shareholding_pattern, sql_rag
from backend.routers import annual_files, quarterly_files



@asynccontextmanager
async def lifespan(app: FastAPI):
    # Code to run on startup
    logger.info("Configuring application startup settings...")
    try:
        asyncio.set_event_loop_policy(uvloop.EventLoopPolicy())
        logger.info("✅ Using uvloop for enhanced async performance")
    except ImportError:
        logger.info("⚠️ uvloop not available, using default asyncio event loop")

    # Configure thread pool for database operations
    loop = asyncio.get_event_loop()
    executor = ThreadPoolExecutor(
        max_workers=50,
        thread_name_prefix="fastapi-db-"
    )
    loop.set_default_executor(executor)
    logger.info(f"✅ Configured thread pool with {executor._max_workers} workers")

    yield
    # Code to run on shutdown (e.g., close database connections)
    logger.info("Application shutting down.")


# Create FastAPI app with the new lifespan manager
app = FastAPI(
    title="Financial Data API",
    description="High-performance financial analysis API with async support",
    version="2.0.0",
    lifespan=lifespan
)

# Create FastAPI app with async optimizations


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.debug("CORS middleware configured")


# CRITICAL: Configure async settings for better concurrency



# Include routers
logger.debug("Registering routers")
app.include_router(home.router, prefix='/home')
app.include_router(financials.router, prefix="/financials")
app.include_router(ratios.router, prefix="/ratios")
app.include_router(stock_data.router, prefix="/stock_data")
app.include_router(overview.router, prefix="/overview")
app.include_router(charts.router, prefix="/charts")
app.include_router(sql_rag.router)  # This includes /rag_flask endpoints
app.include_router(copilot.router, prefix="/copilot")
app.include_router(search.router)
app.include_router(dividend.router, prefix="/dividend")
app.include_router(shareholding_pattern.router, prefix="/shareholding_pattern")
app.include_router(annual_files.router, prefix="/annual_files")
app.include_router(quarterly_files.router, prefix="/quarterly_files")

logger.info("All routers registered")


@app.get("/")
async def root():
    logger.debug("Root endpoint called")
    return {"message": "Welcome to the Financial Data API with Async Support"}


# Add middleware for request timing
@app.middleware("http")
async def add_process_time_header(request, call_next):
    import time
    start_time = time.time()

    response = await call_next(request)

    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)

    # Log slow requests
    if process_time > 5.0:
        logger.warning(f"Slow request: {request.method} {request.url.path} took {process_time:.2f}s")

    return response


if __name__ == "__main__":
    import uvicorn

    logger.info("Starting application server with async optimizations")

    # Run with optimal async settings
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        workers=1,  # Single worker for development
        loop="asyncio",  # Use asyncio event loop
        access_log=True
    )