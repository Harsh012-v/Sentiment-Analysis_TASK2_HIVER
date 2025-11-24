from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum
from pydantic import BaseModel
from typing import Optional, Dict, Any
import random

# --- Models ---
class SentimentRequest(BaseModel):
    email_text: str

class SentimentResponse(BaseModel):
    sentiment: str  # Positive, Negative, Neutral
    confidence: float
    reasoning: str
    prompt_version: str

# --- Service ---
class SentimentService:
    def analyze_v1(self, text: str):
        """
        Draft Prompt v1:
        Analyze the sentiment of the following email.
        Return JSON: {sentiment: "Positive"|"Negative"|"Neutral", confidence: 0.0-1.0, reasoning: "..."}
        """
        # Mocking LLM response
        return self._mock_llm(text, "v1")

    def analyze_v2(self, text: str):
        """
        Draft Prompt v2 (Improved):
        Act as an expert sentiment analyst. Evaluate the following customer email.
        Consider tone, keywords, and intent.
        Provide a structured JSON response with:
        - sentiment: One of [Positive, Negative, Neutral]
        - confidence: A score between 0.0 and 1.0 reflecting certainty.
        - reasoning: A concise explanation of why this sentiment was chosen, citing specific phrases.
        """
        # Mocking LLM response
        return self._mock_llm(text, "v2")

    def _mock_llm(self, text: str, version: str):
        # Improved keyword-based mock logic with better accuracy
        text_lower = text.lower()
        
        # Expanded positive keywords
        positive_keywords = [
            "love", "great", "excellent", "amazing", "wonderful", "fantastic", 
            "helpful", "thanks", "thank you", "impressed", "appreciate", 
            "perfect", "awesome", "brilliant", "outstanding", "superb",
            "delighted", "happy", "pleased", "satisfied", "resolved"
        ]
        
        # Expanded negative keywords
        negative_keywords = [
            "crash", "frustrating", "bug", "unacceptable", "fail", "failed",
            "error", "broken", "issue", "problem", "disappointed", "regret",
            "not selected", "rejected", "denial", "unfortunately", "sorry to inform",
            "unable", "cannot", "won't work", "doesn't work", "terrible",
            "awful", "horrible", "worst", "angry", "upset", "annoyed",
            "waiting", "delayed", "slow", "poor", "bad", "useless"
        ]
        
        # Neutral keywords/phrases
        neutral_keywords = [
            "how to", "can you", "please tell", "information", "update",
            "question", "inquiry", "check", "confirm", "verify"
        ]
        
        # Count matches
        positive_count = sum(1 for word in positive_keywords if word in text_lower)
        negative_count = sum(1 for word in negative_keywords if word in text_lower)
        neutral_count = sum(1 for word in neutral_keywords if word in text_lower)
        
        # Determine sentiment based on counts
        if negative_count > positive_count:
            sentiment = "Negative"
            confidence = min(0.75 + (negative_count * 0.05), 0.98)
            matched_words = [word for word in negative_keywords if word in text_lower]
            reasoning = f"Detected negative indicators: {', '.join(matched_words[:3])}. The tone suggests dissatisfaction or bad news."
        elif positive_count > negative_count:
            sentiment = "Positive"
            confidence = min(0.75 + (positive_count * 0.05), 0.98)
            matched_words = [word for word in positive_keywords if word in text_lower]
            reasoning = f"Detected positive indicators: {', '.join(matched_words[:3])}. The tone is appreciative and satisfied."
        else:
            sentiment = "Neutral"
            confidence = 0.65 + (neutral_count * 0.05)
            reasoning = "No strong emotional indicators detected. Appears to be informational or a neutral inquiry."

        return {
            "sentiment": sentiment,
            "confidence": round(confidence, 2),
            "reasoning": f"[{version}] {reasoning}",
            "prompt_version": version
        }

# --- App ---
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
@app.post("/analyze", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    try:
        # Using v2 as the default for the app
        result = service.analyze_v2(request.email_text)
        return SentimentResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api")
@app.get("/")
async def root():
    return {"message": "Hiver Sentiment Analysis API is running"}

@app.get("/api/health")
@app.get("/health")
async def health():
    return {"status": "healthy"}

# Vercel serverless handler
handler = Mangum(app)
