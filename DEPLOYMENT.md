# Hiver Sentiment Analysis - Deployment Guide

## 🚀 Deploying to Vercel

### Prerequisites
- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](https://vercel.com/cli) installed (optional, but recommended)
- Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

#### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket)

2. **Import the project to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect the configuration from `vercel.json`

3. **Configure build settings** (should be auto-detected):
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Install Command:** `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for the build to complete
   - Your app will be live at `https://your-project.vercel.app`

#### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project root:**
   ```bash
   vercel
   ```

4. **Follow the prompts** and your app will be deployed!

---

## 🛠️ Local Development

### Running the Application Locally

You need to run both the backend and frontend servers:

#### Backend (Terminal 1):
```powershell
cd c:\Users\Hp\Downloads\HIVER_TASK2\backend
pip install -r requirements.txt
uvicorn main:app --reload
```

#### Frontend (Terminal 2):
```powershell
cd c:\Users\Hp\Downloads\HIVER_TASK2\frontend
npm install
npm run dev
```

The frontend will proxy `/api/*` requests to the backend server at `http://localhost:8000`.

---

## 🔧 Environment Variables

Currently, this application doesn't require any environment variables. If you add external API integrations (e.g., OpenAI, Anthropic) in the future:

1. **Local Development:** Create a `.env` file in the backend directory
2. **Vercel Production:** Add environment variables in the Vercel dashboard:
   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add your variables

---

## 📁 Project Structure

```
HIVER_TASK2/
├── api/                    # Vercel serverless functions
│   ├── index.py           # Main API handler
│   └── requirements.txt   # Python dependencies for serverless
├── backend/               # Original backend (for local dev)
│   ├── main.py
│   ├── models.py
│   ├── sentiment_service.py
│   └── requirements.txt
├── frontend/              # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── vercel.json           # Vercel configuration
```

---

## ✅ Verification

After deployment:

1. **Check the homepage** loads correctly
2. **Test sentiment analysis** with sample emails
3. **Verify API endpoint** at `https://your-project.vercel.app/api`
4. **Check browser console** for any errors

---

## 🐛 Troubleshooting

### Build Fails on Vercel
- Check that all dependencies are in `package.json`
- Verify `vercel.json` configuration is correct
- Check build logs in Vercel dashboard

### API Not Working
- Verify `/api/analyze` endpoint is accessible
- Check serverless function logs in Vercel
- Ensure `mangum` is in `api/requirements.txt`

### CORS Errors
- The API is configured to allow all origins (`*`)
- For production, update CORS settings in `api/index.py`

---

## 📝 Notes

- The `/api` directory contains the serverless function version of the backend
- The `/backend` directory is used for local development only
- Vercel automatically handles routing based on `vercel.json`
- Frontend is built as static files and served from `/frontend/dist`
