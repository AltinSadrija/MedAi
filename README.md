# MedAI — Medical AI Assistant

A full-featured Medical AI Assistant web application built with Next.js, featuring:

- **Provider Dashboard** — Patient management, AI clinical alerts, scheduling, and real-time insights
- **Symptom Checker** — Conversational AI with consent management and triage assessment
- **Patient Portal** — Health records, lab results, medication tracking, and appointments

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI:** React 18 with inline styles
- **Icons:** Lucide React
- **Fonts:** DM Sans, Outfit, JetBrains Mono (Google Fonts)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- A [Vercel](https://vercel.com) account

### Local Development

```bash
# Clone the repo
git clone https://github.com/AltinSadrija/MedAi.git
cd MedAi

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Easiest)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **AltinSadrija/MedAi**
4. Click **Deploy** — Vercel auto-detects Next.js and configures everything
5. Your site will be live at `medai-xxxxx.vercel.app` within ~60 seconds

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy from the project directory
cd MedAi
vercel

# Follow the prompts — it will auto-detect Next.js
# For production deployment:
vercel --prod
```

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles & animations
│   ├── layout.js            # Root layout with fonts
│   └── page.js              # Entry point
├── components/
│   ├── MedicalAIApp.js      # Main app with sidebar navigation
│   ├── ProviderDashboard.js # Provider dashboard view
│   ├── SymptomChecker.js    # AI symptom checker with consent
│   ├── PatientPortal.js     # Patient portal view
│   └── ui.js                # Shared UI components
└── lib/
    └── constants.js         # Theme, mock data, and config
```

## License

Private — All rights reserved.
