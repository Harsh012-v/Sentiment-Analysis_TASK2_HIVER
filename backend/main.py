from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import SentimentRequest, SentimentResponse
from sentiment_service import SentimentService

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

service = SentimentService()

@app.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    # Using v2 as the default for the app
    result = service.analyze_v2(request.email_text)
    return SentimentResponse(**result)

@app.get("/")
async def root():
    return {"message": "Hiver Sentiment Analysis API is running"}
