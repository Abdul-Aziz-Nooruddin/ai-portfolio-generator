# 🌌 MyFolio — Bespoke 3D WebGL Portfolio & AI Generation Platform

<div align="center">

[![Live Production](https://img.shields.io/badge/Live%20Platform-myfolio.tech-38BDF8.svg?style=for-the-badge&logo=google-chrome&logoColor=white)](https://myfolio.tech)
[![3D Web Studio](https://img.shields.io/badge/3D%20Studio-Launch%20Generator-6366F1.svg?style=for-the-badge&logo=three.js&logoColor=white)](https://myfolio.tech/studio)
[![22 3D Universes](https://img.shields.io/badge/Design%20Intelligence-22%20Universes-10B981.svg?style=for-the-badge&logo=webgl&logoColor=white)](https://myfolio.tech/universes)

[![Build & Deploy](https://img.shields.io/badge/Deployment-Render%20Cloud-000000.svg?logo=render&logoColor=white)](https://myfolio.tech)
[![SSL](https://img.shields.io/badge/Security-TLS%201.3%20%7C%20HTTPS-success.svg?logo=letsencrypt&logoColor=white)](https://myfolio.tech)
[![License](https://img.shields.io/badge/License-Proprietary%20%7C%20All%20Rights%20Reserved-red.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20%2B-green.svg)](https://nodejs.org)

<br/>

**Transform your GitHub repositories and resume into an award-winning, interactive 3D WebGL developer portfolio in seconds.**  
*Powered by Google Gemini AI, Three.js spatial physics, 22 cohesive design universes, custom domain SSL routing, and clean static ZIP exports.*

[Explore Live Platform](https://myfolio.tech) • [Launch 3D Studio](https://myfolio.tech/studio) • [22 Design Universes](https://myfolio.tech/universes) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [API Reference](#-api-reference)

</div>

---

## 🌟 Live Production Links

| Service | Live URL | Description |
| :--- | :--- | :--- |
| **🌐 Official Website** | [https://myfolio.tech](https://myfolio.tech) | Landing page, 3D interactive hero, workflow timeline, and pricing |
| **⚡ 3D Web Studio** | [https://myfolio.tech/studio](https://myfolio.tech/studio) | AI portfolio generator from GitHub, resume PDF, and images |
| **🎨 22 Universes Gallery** | [https://myfolio.tech/universes](https://myfolio.tech/universes) | Interactive 3D WebGL showcase with real-time background switches |
| **📊 User Dashboard** | [https://myfolio.tech/dashboard](https://myfolio.tech/dashboard) | Portfolio management, custom domain mapping, visitor telemetry |
| **🔐 Authentication** | [https://myfolio.tech/login](https://myfolio.tech/login) | Secure Scrypt credentials + Google & GitHub OAuth 2.0 |
| **📜 Terms of Service** | [https://myfolio.tech/terms](https://myfolio.tech/terms) | Software licensing and acceptable use policy |
| **🔒 Privacy Policy** | [https://myfolio.tech/privacy](https://myfolio.tech/privacy) | GDPR & CCPA compliant data protection disclosure |

---

## ✨ Core Platform Capabilities

### ⚡ 1. Multimodal AI Portfolio Synthesis
* **GitHub Ingestion**: Automatically ranks top public repositories, language statistics, commit heatmaps, and project architectures.
* **Resume PDF & Image Extraction**: Deep OCR & natural language parser extracts work history, skills, certifications, and project links.
* **Anti-Hallucination Guardrails**: Strictly grounds developer experience in verified repository evidence.

### 🎨 2. 22 Curated 3D WebGL Universes
Cycle through non-repeating visual worlds with bespoke Three.js physics and tailored color palettes:
* `Cosmic Astronaut` • `Eco-Tech Steampunk` • `Cyber Crystal` • `Bioluminescent`
* `Botanical Woodcraft` • `Emerald Cyber Sanctuary` • `Abyssal Quantum Jellyfish`
* `Mahogany Brass Steampunk` • `Chrono Obsidian Sanctuary` • `Kinetic Brutalism` *(and 12 more!)*

### 🛡️ 3. Enterprise Security & Attack Surface Neutralization
* **Scrypt Password Hashing**: Cryptographically salted passwords with high-entropy pepper.
* **SSRF & Path Traversal Immunity**: Strict private subnet blocking (`10.0.0.0/8`, `127.0.0.0/8`, `169.254.169.254`).
* **Honeypot Bot Defense & Rate Limiting**: Sliding-window rate limiters + silent honeypot trap fields for automated bots.
* **Cost Controls**: Token budgets (`maxOutputTokens`), 50MB payload limits (`HTTP 413`), and 90-second timeout protection.

### 📦 4. Clean Static ZIP Export & 1-Click Deployment
* **Zero Dependencies**: Exports standalone `index.html`, `css/style.css`, and `js/main.js` with 0 local proxies or watermarks.
* **Deploy Anywhere**: Compatible with Netlify, Vercel, Cloudflare Pages, GitHub Pages, or AWS S3.

---

## 🚀 Quick Start (Local Development)

### Prerequisites
* **Node.js 18+** (Node.js 20 or 22 LTS recommended)
* **npm** or **yarn**

### 1. Clone & Install
```bash
git clone https://github.com/Abdul-Aziz-Nooruddin/ai-portfolio-generator.git
cd ai-portfolio-generator
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
```
Add your `GEMINI_API_KEY`, `SUPABASE_URL`, and `GOOGLE_CLIENT_ID` in `.env`.

### 3. Launch Development Server
```bash
npm start
```
Open **[http://localhost:10000](http://localhost:10000)** (or `http://localhost:5050`) in your browser.

---

## 🧪 Automated Test Suite

The platform includes exhaustive automated test suites verifying security, AI generation, weekly allowance lifecycles, and design uniqueness:

```bash
# Run the complete test suite
node src/test-production-checklist.js
node src/test-vip-admin-account.js
node src/test-social-auth.js
node src/test-auth-security.js
node src/test-allowance-and-history.js
node src/test-gallery-artwork-uniqueness.js
```

---

## 📡 API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/web/generate` | Generates a 3D WebGL developer portfolio from GitHub / Resume data |
| `GET` | `/p/:siteId` | Serves an origin-isolated live portfolio preview |
| `GET` | `/api/portfolio/:siteId/export` | Downloads a standalone sanitized static ZIP package |
| `GET` | `/api/auth/google` | Initiates official Google OAuth 2.0 account selection |
| `POST` | `/api/auth/social` | Authenticates via Google / GitHub OAuth providers |
| `GET` | `/healthz` | Instant health check probe (`HTTP 200 OK`) |

---

## 📄 License & Commercial Rights

**Proprietary & Commercial Software License** © 2026 **Abdul Aziz Nooruddin**. All Rights Reserved.  
Commercial deployment, SaaS reproduction, resale, and unauthorized distribution of this codebase, design engines, or 3D WebGL universes are strictly prohibited. See [LICENSE](LICENSE) for terms.
