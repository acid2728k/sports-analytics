// Sport Types
export type SportType = 'football' | 'basketball' | 'tennis' | 'boxing' | 'ufc' | 'esports';

export interface Sport {
  id: string;
  name: string;
  slug: SportType;
  icon: string;
}

// League/Tournament
export interface League {
  id: string;
  sportId: string;
  name: string;
  country?: string;
  logo?: string;
}

// Team/Player
export interface Team {
  id: string;
  sportId: string;
  name: string;
  shortName?: string;
  logo?: string;
  country?: string;
}

// Match Status
export type MatchStatus = 'scheduled' | 'live' | 'finished' | 'postponed' | 'cancelled';

// Match
export interface Match {
  id: string;
  sportId: string;
  sport: SportType;
  leagueId: string;
  league: League;
  teamHome: Team;
  teamAway: Team;
  startTime: string;
  status: MatchStatus;
  scoreHome?: number;
  scoreAway?: number;
  period?: string;
  minute?: number;
  rawStats?: Record<string, unknown>;
}

// Odds Selection
export interface OddsSelection {
  id: string;
  name: string;
  value: number;
  impliedProbability: number;
}

// Odds
export interface Odds {
  id: string;
  matchId: string;
  bookmaker: string;
  marketType: string;
  marketName: string;
  selections: OddsSelection[];
  updatedAt: string;
}

// Match Probabilities Summary
export interface MatchProbabilities {
  matchId: string;
  mainOutcome: {
    home: number;
    draw?: number;
    away: number;
  };
  totals?: {
    over25: number;
    under25: number;
  };
  bothToScore?: {
    yes: number;
    no: number;
  };
  firstToScore?: {
    home: number;
    away: number;
  };
  modelVersion: string;
  calculatedAt: string;
}

// H2H Match Result
export interface H2HMatch {
  id: string;
  date: string;
  tournament: string;
  homeTeam: string;
  awayTeam: string;
  scoreHome: number;
  scoreAway: number;
  winner: 'home' | 'away' | 'draw';
}

// Value Analysis
export interface ValueAnalysis {
  [key: string]: {
    modelProb: number;
    impliedProb: number;
    value: number;
    indicator: 'positive' | 'neutral' | 'negative';
  };
}

// Full Analysis Response
export interface MatchAnalysis {
  match: Match;
  probabilities: MatchProbabilities;
  odds: Odds[];
  valueAnalysis: ValueAnalysis;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

// Time Filter
export type TimeFilter = 'today' | 'tomorrow' | 'week' | 'month' | 'quarter';

// Live Update
export interface LiveUpdate {
  type: 'score' | 'stats' | 'status' | 'odds';
  matchId: string;
  data: Match;
  timestamp: string;
}




