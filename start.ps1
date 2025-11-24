# Hiver Sentiment Analysis - Startup Script

Write-Host "Starting Hiver Sentiment Analysis Application..." -ForegroundColor Green

# Install backend dependencies
Write-Host "`nInstalling backend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\backend"
pip install -r requirements.txt

# Start backend in a new window
Write-Host "`nStarting backend server..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; Write-Host 'Backend running on http://localhost:8000' -ForegroundColor Green; uvicorn main:app --reload"

# Install frontend dependencies
Write-Host "`nInstalling frontend dependencies..." -ForegroundColor Yellow
Set-Location "$PSScriptRoot\frontend"
npm install

# Start frontend
Write-Host "`nStarting frontend server..." -ForegroundColor Yellow
Write-Host "Frontend will run on http://localhost:5173" -ForegroundColor Green
npm run dev
