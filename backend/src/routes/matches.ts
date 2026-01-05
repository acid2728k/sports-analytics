import { Router, Request, Response } from 'express';
import { getMatches, generateOdds, generateH2H, leagues } from '../services/mockData';
import { calculateMatchProbabilities, calculateValue } from '../services/probabilityService';
import { ApiResponse, Match, Odds, H2HMatch, MatchProbabilities, SportType } from '../types';

const router = Router();

/**
 * GET /api/matches
 * Returns list of matches with optional filters
 * Query params: sport, from, to, status, leagueId
 */
router.get('/', (req: Request, res: Response) => {
  const { sport, from, to, status, leagueId } = req.query;
  
  let matches = getMatches();
  
  // Filter by sport
  if (sport && typeof sport === 'string') {
    matches = matches.filter(m => m.sport === sport);
  }
  
  // Filter by date range
  if (from && typeof from === 'string') {
    const fromDate = new Date(from);
    matches = matches.filter(m => new Date(m.startTime) >= fromDate);
  }
  
  if (to && typeof to === 'string') {
    const toDate = new Date(to);
    matches = matches.filter(m => new Date(m.startTime) <= toDate);
  }
  
  // Filter by status
  if (status && typeof status === 'string') {
    matches = matches.filter(m => m.status === status);
  }
  
  // Filter by league
  if (leagueId && typeof leagueId === 'string') {
    matches = matches.filter(m => m.leagueId === leagueId);
  }
  
  // Sort by start time
  matches.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const response: ApiResponse<Match[]> = {
    success: true,
    data: matches,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/matches/live
 * Returns currently live matches
 */
router.get('/live', (_req: Request, res: Response) => {
  const matches = getMatches().filter(m => m.status === 'live');
  
  const response: ApiResponse<Match[]> = {
    success: true,
    data: matches,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/matches/:id
 * Returns single match details
 */
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const match = getMatches().find(m => m.id === id);
  
  if (!match) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Match not found',
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  const response: ApiResponse<Match> = {
    success: true,
    data: match,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/matches/:id/odds
 * Returns odds for a specific match
 */
router.get('/:id/odds', (req: Request, res: Response) => {
  const { id } = req.params;
  const match = getMatches().find(m => m.id === id);
  
  if (!match) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Match not found',
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  const odds = generateOdds(id, match.sport as SportType);
  
  const response: ApiResponse<Odds[]> = {
    success: true,
    data: odds,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/matches/:id/h2h
 * Returns head-to-head history for match teams
 */
router.get('/:id/h2h', (req: Request, res: Response) => {
  const { id } = req.params;
  const match = getMatches().find(m => m.id === id);
  
  if (!match) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Match not found',
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  const h2h = generateH2H(match.teamHome.id, match.teamAway.id);
  
  const response: ApiResponse<H2HMatch[]> = {
    success: true,
    data: h2h,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/matches/:id/probabilities
 * Returns calculated probabilities for a match
 */
router.get('/:id/probabilities', (req: Request, res: Response) => {
  const { id } = req.params;
  const match = getMatches().find(m => m.id === id);
  
  if (!match) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Match not found',
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  const probabilities = calculateMatchProbabilities(match);
  
  const response: ApiResponse<MatchProbabilities> = {
    success: true,
    data: probabilities,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/matches/:id/analysis
 * Returns full analysis including probabilities, odds, and value comparison
 */
router.get('/:id/analysis', (req: Request, res: Response) => {
  const { id } = req.params;
  const match = getMatches().find(m => m.id === id);
  
  if (!match) {
    res.status(404).json({
      success: false,
      data: null,
      error: 'Match not found',
      timestamp: new Date().toISOString(),
    });
    return;
  }
  
  const probabilities = calculateMatchProbabilities(match);
  const odds = generateOdds(id, match.sport as SportType);
  
  // Calculate value for main market
  const mainMarket = odds.find(o => o.marketType === '1x2' || o.marketType === 'winner');
  let valueAnalysis: Record<string, { modelProb: number; impliedProb: number; value: number; indicator: string }> = {};
  
  if (mainMarket) {
    mainMarket.selections.forEach(selection => {
      let modelProb = 0;
      if (selection.name === 'Home' || selection.name === 'П1') {
        modelProb = probabilities.mainOutcome.home;
      } else if (selection.name === 'Draw' || selection.name === 'X') {
        modelProb = probabilities.mainOutcome.draw || 0;
      } else if (selection.name === 'Away' || selection.name === 'П2') {
        modelProb = probabilities.mainOutcome.away;
      }
      
      const valueCalc = calculateValue(modelProb, selection.value);
      valueAnalysis[selection.name] = {
        modelProb,
        impliedProb: Math.round(selection.impliedProbability * 1000) / 10,
        value: valueCalc.value,
        indicator: valueCalc.indicator,
      };
    });
  }
  
  const response: ApiResponse<{
    match: Match;
    probabilities: MatchProbabilities;
    odds: Odds[];
    valueAnalysis: typeof valueAnalysis;
  }> = {
    success: true,
    data: {
      match,
      probabilities,
      odds,
      valueAnalysis,
    },
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

/**
 * GET /api/leagues
 * Returns list of leagues, optionally filtered by sport
 */
router.get('/leagues', (req: Request, res: Response) => {
  const { sport } = req.query;
  
  let filteredLeagues = leagues;
  
  if (sport && typeof sport === 'string') {
    const sportId = { football: '1', basketball: '2', tennis: '3', boxing: '4', ufc: '5', esports: '6' }[sport];
    if (sportId) {
      filteredLeagues = leagues.filter(l => l.sportId === sportId);
    }
  }
  
  const response: ApiResponse<typeof leagues> = {
    success: true,
    data: filteredLeagues,
    timestamp: new Date().toISOString(),
  };
  
  res.json(response);
});

export default router;




