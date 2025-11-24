from pydantic import BaseModel
from typing import Optional, Dict, Any

class SentimentRequest(BaseModel):
    email_text: str

class SentimentResponse(BaseModel):
    sentiment: str  # Positive, Negative, Neutral
    confidence: float
    reasoning: str
    prompt_version: str
