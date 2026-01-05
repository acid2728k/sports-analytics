# Sports Analytics v. 0.1

Single-page web application (SPA) for analyzing sports statistics and calculating match outcome probabilities.

## 🎯 Features

- **Live Statistics** — Real-time match tracking via WebSocket
- **Probability Calculation** — Models based on probability theory (Poisson, ELO)
- **Bookmaker Comparison** — Value analysis of odds
- **Head-to-Head (H2H)** — Statistics of previous matches between teams
- **Multi-Sport** — Football, Basketball, Tennis, Boxing, UFC, Esports

## 🛠 Technologies

### Frontend
- React 18 + TypeScript
- Vite
- Zustand (state management)
- Framer Motion (animations)
- Socket.io-client (real-time)
- Lucide React (icons)
- date-fns (date handling)

### Backend
- Node.js + Express + TypeScript
- Socket.io (WebSocket server)
- PostgreSQL (optional)

## 🚀 Getting Started

### Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### Run in Development Mode

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Backend will run on `http://localhost:3001`
Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
sports-analytics-app/
├── backend/
│   ├── src/
│   │   ├── db/          # Database
│   │   ├── routes/      # API routes
│   │   ├── services/    # Business logic
│   │   ├── types/       # TypeScript types
│   │   └── index.ts     # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── hooks/       # Custom hooks
│   │   ├── services/    # API and WebSocket
│   │   ├── store/       # Zustand store
│   │   ├── styles/      # CSS styles
│   │   ├── types/       # TypeScript types
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

| Endpoint | Description |
|----------|-------------|
| `GET /api/sports` | List of sports |
| `GET /api/matches` | List of matches with filters |
| `GET /api/matches/live` | Current live matches |
| `GET /api/matches/:id` | Match details |
| `GET /api/matches/:id/odds` | Match odds |
| `GET /api/matches/:id/h2h` | Head-to-head history |
| `GET /api/matches/:id/probabilities` | Probability calculation |
| `GET /api/matches/:id/analysis` | Full match analysis |

## 📊 Probability Models

### Football (Poisson Model)
- Expected goals calculation based on team strength
- Outcome probabilities (1X2)
- Totals (over/under 2.5)
- Both teams to score

### Other Sports (ELO Model)
- ELO rating system
- Win probability with home advantage

## 🎨 Design

- Minimalist style (inspired by Notion)
- Dark theme by default
- Responsive layout
- Smooth animations

## ⚠️ Disclaimer

This service is for informational and analytical purposes only and does not encourage betting or constitute bookmaking activity.

## 📝 License

MIT
