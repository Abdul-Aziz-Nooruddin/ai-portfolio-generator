# WhatsApp Portfolio Bot

> AI-powered WhatsApp chatbot that interviews users and generates stunning portfolio websites with immersive WebGL shaders. Zero friction — no laptop, no forms, no design skills needed.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- (Optional) Docker

### 1. Install
```bash
git clone <repo>
cd whatsapp-portfolio-bot
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your API keys
```

### 3. Set Up Database
```bash
# Option A: Run setup script
node src/setup-db.js

# Option B: Copy SQL from src/setup-db.js into Supabase SQL Editor
```

### 4. Run
```bash
# Development
npm run dev

# Production with Docker
docker-compose up -d
```

### 5. Test
```bash
node src/test-conversation.js
```

## 📁 Project Structure

```
whatsapp-portfolio-bot/
├── src/
│   ├── index.js                    # Express server entry
│   ├── conversation-engine.js      # Interview state machine
│   ├── test-conversation.js        # AI test (no external deps)
│   ├── setup-db.js                 # Database initialization
│   ├── questions/                  # Branch question sets
│   │   ├── branch-a.js            # Developer (25+ questions)
│   │   ├── branch-b.js            # Freelancer (20+ questions)
│   │   ├── branch-c.js            # Student (20+ questions)
│   │   └── branch-d.js            # Professional (18+ questions)
│   ├── handlers/
│   │   └── webhook-handler.js     # WhatsApp webhook
│   └── services/
│       ├── ai-service.js          # Gemini API (AIza + AQ keys)
│       ├── db-service.js          # Supabase wrapper
│       ├── hosting-provider.js    # Netlify/Cloudflare
│       └── shader-loader.js       # Radiant Shaders
├── .env.example                    # API key placeholders
├── .gitignore
├── Dockerfile
├── docker-compose.yml
├── deploy.sh
├── package.json
└── README.md
```

## 🔑 API Keys Required

| Service | Get Key From | Cost |
|---------|-------------|------|
| **Google AI Studio** | [aistudio.google.com/app/apikey](https://aistudio.google.com/app/apikey) | Free |
| **Supabase** | [supabase.com](https://supabase.com) | Free tier |
| **Meta WhatsApp** | [developers.facebook.com](https://developers.facebook.com) | Free |
| **Netlify** | [netlify.com](https://netlify.com) | Free tier |
| **Razorpay** | [razorpay.com](https://razorpay.com) | 2.36% per txn |

## 💰 Pricing

| Plan | Monthly | Yearly | Features |
|------|---------|--------|----------|
| **Preview** | Free | Free | 48h watermarked preview |
| **Lite** | ₹149 | ₹1,499 | Live site, custom domain, edits |
| **Pro** | ₹299 | ₹2,999 | + Analytics, SEO, contact form |

## 🎨 Features

- **4 Portfolio Branches**: Developer, Freelancer, Student, Professional
- **25+ Questions per branch**: GitHub links, testimonials, pricing, certifications
- **AI Design Director**: taste-skill dials + impeccable anti-slop rules
- **Radiant Shaders**: 18 WebGL backgrounds matched to personality
- **48h Preview**: Watermarked demo before payment
- **UPI Payments**: Razorpay/Cashfree integration
- **Auto-suspend**: Grace period + renewal workflow

## 🧪 Testing

```bash
# Test AI without any external services
node src/test-conversation.js

# Test database connection
node -e "require('dotenv').config(); const {DatabaseService} = require('./src/services/db-service'); new DatabaseService(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY).client.from('users').select('id').limit(1).then(r => console.log('DB OK:', !!r.data))"

# Health check
curl http://localhost:3000/health
```

## 🚢 Deployment

### Railway/Render (Easiest)
1. Push to GitHub
2. Connect Railway/Render
3. Add environment variables
4. Deploy

### VPS (DigitalOcean/AWS)
```bash
# Clone on server
git clone <repo>
cd whatsapp-portfolio-bot

# Run deploy script
./deploy.sh

# Or manually:
docker-compose up -d
```

### Netlify Functions (Serverless)
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

## 📱 WhatsApp Setup

1. Create Meta app at [developers.facebook.com](https://developers.facebook.com)
2. Add WhatsApp product
3. Verify phone number
4. Set webhook URL to `https://your-domain.com/webhook`
5. Subscribe to `messages` events

## 🛡️ Production Checklist

- [ ] All API keys are production (not test/sandbox)
- [ ] Database has PITR backups enabled ($10/mo)
- [ ] Webhook signature verification enabled
- [ ] Rate limiting configured
- [ ] Telegram alerts set up
- [ ] UptimeRobot monitoring active
- [ ] SSL certificate valid
- [ ] 48h preview expiry cron job running
- [ ] Payment webhooks tested end-to-end

## 📝 License

MIT

## 🤝 Support

For issues or questions, open a GitHub issue or contact support.
