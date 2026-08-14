#!/bin/bash
# Deploy script for WhatsApp Portfolio Bot

echo "🚀 WhatsApp Portfolio Bot - Deployment Script"
echo "============================================"

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

if ! command -v docker &> /dev/null; then
    echo "⚠️ Docker not found. You can still run with 'npm start'"
fi

# Check .env
if [ ! -f .env ]; then
    echo "⚠️ .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env with your API keys before starting"
    echo "   Get keys from:"
    echo "   - Gemini: https://aistudio.google.com/app/apikey"
    echo "   - Supabase: https://supabase.com"
    echo "   - Meta: https://developers.facebook.com"
    echo "   - Netlify: https://netlify.com"
    echo "   - Razorpay: https://razorpay.com"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run database setup (optional - if you have a setup script)
# echo "🗄️ Setting up database..."
# node src/setup-db.js

# Start the bot
echo "🚀 Starting the bot..."
echo ""
echo "Options:"
echo "1. Run with Node.js (development): npm run dev"
echo "2. Run with Docker (production): docker-compose up -d"
echo ""
read -p "Choose option (1 or 2): " choice

if [ "$choice" = "2" ]; then
    echo "🐳 Starting with Docker..."
    docker-compose up -d
    echo "✅ Bot is running! Check logs with: docker-compose logs -f"
else
    echo "🟢 Starting with Node.js..."
    npm run dev
fi
