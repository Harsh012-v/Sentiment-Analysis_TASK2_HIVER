# Hiver Sentiment Analysis

An AI-powered sentiment analysis tool for customer emails, built with FastAPI and React.

![Hiver Sentiment Analysis](https://img.shields.io/badge/Status-Production%20Ready-success)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black)

## 🌟 Features

- **Real-time Sentiment Analysis**: Analyze customer emails instantly
- **Confidence Scoring**: Get confidence levels for each analysis
- **AI Reasoning**: View detailed explanations for sentiment classifications
- **Beautiful UI**: Modern, responsive interface with smooth animations
- **Production Ready**: Optimized for Vercel deployment

## 🚀 Quick Start

### Local Development

**Backend (Terminal 1):**
```powershell
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

**Frontend (Terminal 2):**
```powershell
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Deployment

This project is configured for **one-click deployment** to Vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## 📁 Project Structure

```
HIVER_TASK2/
├── api/                    # Vercel serverless functions
│   ├── index.py           # API handler for production
│   └── requirements.txt   # Python dependencies
├── backend/               # Backend for local development
│   ├── main.py
│   ├── models.py
│   └── sentiment_service.py
├── frontend/              # React frontend
│   ├── src/
│   │   ├── App.jsx
│   │   └── index.css
│   └── package.json
└── vercel.json           # Vercel configuration
```

## 🛠️ Tech Stack

**Frontend:**
- React 19
- Vite
- TailwindCSS 4
- Modern CSS animations

**Backend:**
- FastAPI
- Pydantic
- Mangum (for Vercel serverless)

## 📝 API Endpoints

- `POST /api/analyze` - Analyze email sentiment
- `GET /api` - API health check
- `GET /api/health` - Detailed health status

## 🧪 Testing

Test the sentiment analysis with sample emails:

**Positive:**
> "Thank you so much for your help! The issue is resolved and I'm very happy with the service."

**Negative:**
> "This is unacceptable. The app keeps crashing and I've been waiting for days without a response."

**Neutral:**
> "Can you please provide information about the pricing plans? I'd like to know more details."

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for Hiver
