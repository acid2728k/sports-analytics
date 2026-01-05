import { Match, MatchProbabilities, SportType, H2HMatch } from '../types';
import { generateH2H } from './mockData';

/**
 * Probability Calculation Service
 * 
 * This module implements various probability models for sports outcomes.
 * Currently implemented models:
 * 1. Poisson Distribution for football goal predictions
 * 2. ELO-based probability calculation
 * 3. Historical H2H analysis
 * 
 * The architecture is modular to allow easy addition of new models.
 */

// Model version for tracking
const MODEL_VERSION = 'v1.0.0-beta';

// Base strength ratings (would come from historical data in production)
const teamStrengthRatings: Record<string, number> = {
  // Football - Premier League
  't1': 2050, // Manchester City
  't2': 2000, // Arsenal
  't3': 1980, // Liverpool
  't4': 1900, // Chelsea
  't5': 1850, // Tottenham
  // Football - La Liga
  't6': 2100, // Real Madrid
  't7': 2020, // Barcelona
  't8': 1950, // Atletico Madrid
  't9': 1850, // Sevilla
  // Football - Serie A
  't10': 1950, // AC Milan
  't11': 1980, // Inter Milan
  't12': 2000, // Juventus
  // Football - Bundesliga
  't13': 2100, // Bayern Munich
  't14': 1950, // Borussia Dortmund
  // Basketball - NBA
  't15': 1900, // Los Angeles Lakers
  't16': 1950, // Golden State Warriors
  't17': 2000, // Boston Celtics
  't18': 1850, // Miami Heat
  't19': 1980, // Denver Nuggets
  // Tennis
  't20': 2200, // Novak Djokovic
  't21': 2120, // Carlos Alcaraz
  't22': 2150, // Jannik Sinner
  't23': 2100, // Daniil Medvedev
  // Boxing
  't24': 1950, // Tyson Fury
  't25': 2000, // Oleksandr Usyk
  't26': 1980, // Canelo Alvarez
  // UFC
  't27': 2050, // Jon Jones
  't28': 1950, // Alex Pereira
  't29': 2100, // Islam Makhachev
  // Esports
  't30': 1900, // Team Spirit
  't31': 1950, // Natus Vincere
  't32': 1880, // G2 Esports
  't33': 1850, // FaZe Clan
};

/**
 * Calculate expected goals using Poisson distribution parameters
 */
const calculateExpectedGoals = (
  homeStrength: number,
  awayStrength: number,
  homeAdvantage: number = 0.25
): { homeExpected: number; awayExpected: number } => {
  // Base average goals in a match
  const avgGoals = 1.3;
  
  // Strength ratio affects expected goals
  const strengthRatio = homeStrength / awayStrength;
  
  const homeExpected = avgGoals * Math.pow(strengthRatio, 0.3) + homeAdvantage;
  const awayExpected = avgGoals * Math.pow(1 / strengthRatio, 0.3);
  
  return {
    homeExpected: Math.max(0.5, Math.min(3.5, homeExpected)),
    awayExpected: Math.max(0.3, Math.min(3.0, awayExpected)),
  };
};

/**
 * Poisson probability mass function
 */
const poissonPMF = (k: number, lambda: number): number => {
  return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
};

/**
 * Factorial helper
 */
const factorial = (n: number): number => {
  if (n <= 1) return 1;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

/**
 * Calculate match outcome probabilities using Poisson model (for football)
 */
const calculatePoissonProbabilities = (
  homeExpected: number,
  awayExpected: number
): { home: number; draw: number; away: number } => {
  let homeWin = 0;
  let draw = 0;
  let awayWin = 0;
  
  // Calculate probability matrix for goals 0-6
  for (let homeGoals = 0; homeGoals <= 6; homeGoals++) {
    for (let awayGoals = 0; awayGoals <= 6; awayGoals++) {
      const prob = poissonPMF(homeGoals, homeExpected) * poissonPMF(awayGoals, awayExpected);
      
      if (homeGoals > awayGoals) {
        homeWin += prob;
      } else if (homeGoals < awayGoals) {
        awayWin += prob;
      } else {
        draw += prob;
      }
    }
  }
  
  // Normalize to ensure sum = 1
  const total = homeWin + draw + awayWin;
  
  return {
    home: homeWin / total,
    draw: draw / total,
    away: awayWin / total,
  };
};

/**
 * Calculate total goals probability
 */
const calculateTotalProbability = (
  homeExpected: number,
  awayExpected: number,
  totalLine: number = 2.5
): { over: number; under: number } => {
  let over = 0;
  let under = 0;
  
  for (let homeGoals = 0; homeGoals <= 6; homeGoals++) {
    for (let awayGoals = 0; awayGoals <= 6; awayGoals++) {
      const prob = poissonPMF(homeGoals, homeExpected) * poissonPMF(awayGoals, awayExpected);
      
      if (homeGoals + awayGoals > totalLine) {
        over += prob;
      } else {
        under += prob;
      }
    }
  }
  
  const total = over + under;
  return {
    over: over / total,
    under: under / total,
  };
};

/**
 * Calculate both teams to score probability
 */
const calculateBTTSProbability = (
  homeExpected: number,
  awayExpected: number
): { yes: number; no: number } => {
  // P(home scores) = 1 - P(home = 0)
  const homeScores = 1 - poissonPMF(0, homeExpected);
  // P(away scores) = 1 - P(away = 0)
  const awayScores = 1 - poissonPMF(0, awayExpected);
  
  // P(both score) = P(home scores) * P(away scores)
  const bttsYes = homeScores * awayScores;
  
  return {
    yes: bttsYes,
    no: 1 - bttsYes,
  };
};

/**
 * Calculate ELO-based win probability
 */
const calculateELOProbability = (
  homeRating: number,
  awayRating: number,
  homeAdvantage: number = 50
): { home: number; away: number } => {
  const adjustedHomeRating = homeRating + homeAdvantage;
  const expectedHome = 1 / (1 + Math.pow(10, (awayRating - adjustedHomeRating) / 400));
  
  return {
    home: expectedHome,
    away: 1 - expectedHome,
  };
};

/**
 * Get team strength rating
 */
const getTeamStrength = (teamId: string): number => {
  return teamStrengthRatings[teamId] || 1500; // Default ELO
};

/**
 * Analyze H2H data to adjust probabilities
 */
const analyzeH2H = (
  team1Id: string,
  team2Id: string
): { team1WinRate: number; team2WinRate: number; drawRate: number } => {
  const h2h = generateH2H(team1Id, team2Id);
  
  if (h2h.length === 0) {
    return { team1WinRate: 0.33, team2WinRate: 0.33, drawRate: 0.34 };
  }
  
  let team1Wins = 0;
  let team2Wins = 0;
  let draws = 0;
  
  h2h.forEach(match => {
    if (match.winner === 'draw') {
      draws++;
    } else if (
      (match.winner === 'home' && match.homeTeam.includes(team1Id.slice(1))) ||
      (match.winner === 'away' && match.awayTeam.includes(team1Id.slice(1)))
    ) {
      team1Wins++;
    } else {
      team2Wins++;
    }
  });
  
  const total = h2h.length;
  
  return {
    team1WinRate: team1Wins / total,
    team2WinRate: team2Wins / total,
    drawRate: draws / total,
  };
};

/**
 * Main probability calculation function
 */
export const calculateMatchProbabilities = (match: Match): MatchProbabilities => {
  const homeStrength = getTeamStrength(match.teamHome.id);
  const awayStrength = getTeamStrength(match.teamAway.id);
  
  let result: MatchProbabilities;
  
  if (match.sport === 'football') {
    // Use Poisson model for football
    const { homeExpected, awayExpected } = calculateExpectedGoals(homeStrength, awayStrength);
    const outcomes = calculatePoissonProbabilities(homeExpected, awayExpected);
    const totals = calculateTotalProbability(homeExpected, awayExpected);
    const btts = calculateBTTSProbability(homeExpected, awayExpected);
    
    // First to score (approximation based on expected goals)
    const totalExpected = homeExpected + awayExpected;
    const firstToScoreHome = homeExpected / totalExpected;
    
    result = {
      matchId: match.id,
      mainOutcome: {
        home: Math.round(outcomes.home * 1000) / 10,
        draw: Math.round(outcomes.draw * 1000) / 10,
        away: Math.round(outcomes.away * 1000) / 10,
      },
      totals: {
        over25: Math.round(totals.over * 1000) / 10,
        under25: Math.round(totals.under * 1000) / 10,
      },
      bothToScore: {
        yes: Math.round(btts.yes * 1000) / 10,
        no: Math.round(btts.no * 1000) / 10,
      },
      firstToScore: {
        home: Math.round(firstToScoreHome * 1000) / 10,
        away: Math.round((1 - firstToScoreHome) * 1000) / 10,
      },
      modelVersion: MODEL_VERSION,
      calculatedAt: new Date().toISOString(),
    };
  } else {
    // Use ELO model for other sports
    const elo = calculateELOProbability(homeStrength, awayStrength);
    
    result = {
      matchId: match.id,
      mainOutcome: {
        home: Math.round(elo.home * 1000) / 10,
        away: Math.round(elo.away * 1000) / 10,
      },
      modelVersion: MODEL_VERSION,
      calculatedAt: new Date().toISOString(),
    };
    
    // Add sport-specific markets
    if (match.sport === 'basketball') {
      // Total points probability (simplified)
      const expectedTotal = 215 + (homeStrength + awayStrength - 3000) / 50;
      const overProb = 0.5 + (expectedTotal - 220) / 100;
      
      result.totals = {
        over25: Math.round(Math.max(0.3, Math.min(0.7, overProb)) * 1000) / 10,
        under25: Math.round((1 - Math.max(0.3, Math.min(0.7, overProb))) * 1000) / 10,
      };
    } else if (match.sport === 'tennis') {
      // Sets total (3 or 5 set match)
      const dominance = Math.abs(elo.home - 0.5);
      const over3_5 = 0.4 + dominance * 0.8;
      
      result.totals = {
        over25: Math.round(over3_5 * 1000) / 10,
        under25: Math.round((1 - over3_5) * 1000) / 10,
      };
    } else if (match.sport === 'boxing' || match.sport === 'ufc') {
      // Method of victory (KO vs Decision)
      const koProb = 0.35 + Math.random() * 0.2; // Base KO probability
      
      result.totals = {
        over25: Math.round(koProb * 1000) / 10, // Using as KO prob
        under25: Math.round((1 - koProb) * 1000) / 10, // Using as Decision prob
      };
    } else if (match.sport === 'esports') {
      // Maps total
      const dominance = Math.abs(elo.home - 0.5);
      const over2_5 = 0.45 - dominance * 0.5;
      
      result.totals = {
        over25: Math.round(over2_5 * 1000) / 10,
        under25: Math.round((1 - over2_5) * 1000) / 10,
      };
    }
  }
  
  return result;
};

/**
 * Compare model probability with bookmaker implied probability
 * Returns value indicator: positive = potential value, negative = overpriced
 */
export const calculateValue = (
  modelProbability: number,
  bookmakerOdds: number
): { value: number; indicator: 'positive' | 'neutral' | 'negative' } => {
  const impliedProbability = (1 / bookmakerOdds) * 100;
  const value = modelProbability - impliedProbability;
  
  let indicator: 'positive' | 'neutral' | 'negative';
  if (value > 3) {
    indicator = 'positive';
  } else if (value < -3) {
    indicator = 'negative';
  } else {
    indicator = 'neutral';
  }
  
  return {
    value: Math.round(value * 10) / 10,
    indicator,
  };
};

export { MODEL_VERSION };




