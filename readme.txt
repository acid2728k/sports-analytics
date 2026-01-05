To run in the future:

# Backend (terminal 1)
cd sports-analytics-app/backend
npm run dev

# Frontend (terminal 2)
cd sports-analytics-app/frontend
npm run dev


Currently the application works on mock data (test data) generated in backend/src/services/mockData.ts file.

Why?
Real sports APIs require:
- Paid subscription
- API keys
- Agreement with data provider


Sports Statistics:
Provider          Sports        Price
API-Football      Football      from $0 (100 requests/day)
SportRadar        All sports    Enterprise
Odds API          All + odds    from $0 (500/month)
BetRadar          All + live    Enterprise
RapidAPI Sports   Various       from $0

Bookmaker Odds:
Provider          Description
The Odds API      40+ bookmakers
BetFair API       Betting exchange
Pinnacle API      Direct access


How to connect real API:
1. Get API key from provider
2. Add key to .env file in backend
3. Replace mock service with real requests in backend/src/services/

