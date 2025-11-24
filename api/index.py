from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
import sys
import os

# Add parent directory to path to import backend modules
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from models import SentimentRequest, SentimentResponse
from sentiment_service import SentimentService

app = FastAPI()

# CORS for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, you can restrict this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service = SentimentService()

@app.post("/api/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    # Using v2 as the default for the app
    result = service.analyze_v2(request.email_text)
    return SentimentResponse(**result)

@app.get("/api")
async def root():
    return {"message": "Hiver Sentiment Analysis API is running"}

@app.get("/api/health")
async def health():
    return {"status": "healthy"}

# Vercel serverless handler
handler = Mangum(app)
