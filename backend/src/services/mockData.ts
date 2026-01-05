import { Sport, League, Team, Match, Odds, H2HMatch, SportType, MatchStatus } from '../types';

// Sports data
export const sports: Sport[] = [
  { id: '1', name: 'Football', slug: 'football', icon: '⚽' },
  { id: '2', name: 'Basketball', slug: 'basketball', icon: '🏀' },
  { id: '3', name: 'Tennis', slug: 'tennis', icon: '🎾' },
  { id: '4', name: 'Boxing', slug: 'boxing', icon: '🥊' },
  { id: '5', name: 'UFC / MMA', slug: 'ufc', icon: '🤼' },
  { id: '6', name: 'Esports', slug: 'esports', icon: '🎮' },
];

// Leagues data
export const leagues: League[] = [
  // Football
  { id: 'l1', sportId: '1', name: 'Premier League', country: 'England', logo: '' },
  { id: 'l2', sportId: '1', name: 'La Liga', country: 'Spain', logo: '' },
  { id: 'l3', sportId: '1', name: 'Serie A', country: 'Italy', logo: '' },
  { id: 'l4', sportId: '1', name: 'Bundesliga', country: 'Germany', logo: '' },
  { id: 'l5', sportId: '1', name: 'Ligue 1', country: 'France', logo: '' },
  { id: 'l6', sportId: '1', name: 'UEFA Champions League', country: 'Europe', logo: '' },
  { id: 'l7', sportId: '1', name: 'MLS', country: 'USA', logo: '' },
  // Basketball
  { id: 'l8', sportId: '2', name: 'NBA', country: 'USA', logo: '' },
  { id: 'l9', sportId: '2', name: 'EuroLeague', country: 'Europe', logo: '' },
  { id: 'l10', sportId: '2', name: 'WNBA', country: 'USA', logo: '' },
  // Tennis
  { id: 'l11', sportId: '3', name: 'Australian Open', country: 'Australia', logo: '' },
  { id: 'l12', sportId: '3', name: 'Wimbledon', country: 'UK', logo: '' },
  { id: 'l13', sportId: '3', name: 'ATP Tour', country: 'World', logo: '' },
  // Boxing
  { id: 'l14', sportId: '4', name: 'WBC', country: 'World', logo: '' },
  { id: 'l15', sportId: '4', name: 'WBA', country: 'World', logo: '' },
  // UFC
  { id: 'l16', sportId: '5', name: 'UFC', country: 'USA', logo: '' },
  { id: 'l17', sportId: '5', name: 'Bellator', country: 'USA', logo: '' },
  // Esports
  { id: 'l18', sportId: '6', name: 'IEM Katowice', country: 'Poland', logo: '' },
  { id: 'l19', sportId: '6', name: 'The International', country: 'World', logo: '' },
  { id: 'l20', sportId: '6', name: 'LCK', country: 'South Korea', logo: '' },
];

// Teams data
export const teams: Team[] = [
  // Football - Premier League
  { id: 't1', sportId: '1', name: 'Manchester City', shortName: 'MCI', country: 'England' },
  { id: 't2', sportId: '1', name: 'Arsenal', shortName: 'ARS', country: 'England' },
  { id: 't3', sportId: '1', name: 'Liverpool', shortName: 'LIV', country: 'England' },
  { id: 't4', sportId: '1', name: 'Chelsea', shortName: 'CHE', country: 'England' },
  { id: 't5', sportId: '1', name: 'Tottenham', shortName: 'TOT', country: 'England' },
  // Football - La Liga
  { id: 't6', sportId: '1', name: 'Real Madrid', shortName: 'RMA', country: 'Spain' },
  { id: 't7', sportId: '1', name: 'Barcelona', shortName: 'BAR', country: 'Spain' },
  { id: 't8', sportId: '1', name: 'Atletico Madrid', shortName: 'ATM', country: 'Spain' },
  { id: 't9', sportId: '1', name: 'Sevilla', shortName: 'SEV', country: 'Spain' },
  // Football - Serie A
  { id: 't10', sportId: '1', name: 'AC Milan', shortName: 'MIL', country: 'Italy' },
  { id: 't11', sportId: '1', name: 'Inter Milan', shortName: 'INT', country: 'Italy' },
  { id: 't12', sportId: '1', name: 'Juventus', shortName: 'JUV', country: 'Italy' },
  // Football - Bundesliga
  { id: 't13', sportId: '1', name: 'Bayern Munich', shortName: 'BAY', country: 'Germany' },
  { id: 't14', sportId: '1', name: 'Borussia Dortmund', shortName: 'BVB', country: 'Germany' },
  // Basketball - NBA
  { id: 't15', sportId: '2', name: 'Los Angeles Lakers', shortName: 'LAL', country: 'USA' },
  { id: 't16', sportId: '2', name: 'Golden State Warriors', shortName: 'GSW', country: 'USA' },
  { id: 't17', sportId: '2', name: 'Boston Celtics', shortName: 'BOS', country: 'USA' },
  { id: 't18', sportId: '2', name: 'Miami Heat', shortName: 'MIA', country: 'USA' },
  { id: 't19', sportId: '2', name: 'Denver Nuggets', shortName: 'DEN', country: 'USA' },
  // Tennis players as "teams"
  { id: 't20', sportId: '3', name: 'Novak Djokovic', shortName: 'DJO', country: 'Serbia' },
  { id: 't21', sportId: '3', name: 'Carlos Alcaraz', shortName: 'ALC', country: 'Spain' },
  { id: 't22', sportId: '3', name: 'Jannik Sinner', shortName: 'SIN', country: 'Italy' },
  { id: 't23', sportId: '3', name: 'Daniil Medvedev', shortName: 'MED', country: 'Russia' },
  // Boxing
  { id: 't24', sportId: '4', name: 'Tyson Fury', shortName: 'FUR', country: 'UK' },
  { id: 't25', sportId: '4', name: 'Oleksandr Usyk', shortName: 'USY', country: 'Ukraine' },
  { id: 't26', sportId: '4', name: 'Canelo Alvarez', shortName: 'CAN', country: 'Mexico' },
  // UFC
  { id: 't27', sportId: '5', name: 'Jon Jones', shortName: 'JON', country: 'USA' },
  { id: 't28', sportId: '5', name: 'Alex Pereira', shortName: 'PER', country: 'Brazil' },
  { id: 't29', sportId: '5', name: 'Islam Makhachev', shortName: 'MAK', country: 'Russia' },
  // Esports
  { id: 't30', sportId: '6', name: 'Team Spirit', shortName: 'SPR', country: 'Russia' },
  { id: 't31', sportId: '6', name: 'Natus Vincere', shortName: 'NAVI', country: 'Ukraine' },
  { id: 't32', sportId: '6', name: 'G2 Esports', shortName: 'G2', country: 'Europe' },
  { id: 't33', sportId: '6', name: 'FaZe Clan', shortName: 'FAZE', country: 'Europe' },
];

// Helper to generate dates
const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const addHours = (date: Date, hours: number): Date => {
  const result = new Date(date);
  result.setHours(result.getHours() + hours);
  return result;
};

// Generate matches dynamically
export const generateMatches = (): Match[] => {
  const now = new Date();
  const matches: Match[] = [];

  // Football matches
  const footballPairs = [
    ['t1', 't2', 'l1'], ['t3', 't4', 'l1'], ['t5', 't1', 'l1'],
    ['t6', 't7', 'l2'], ['t8', 't9', 'l2'], ['t7', 't6', 'l2'],
    ['t10', 't11', 'l3'], ['t12', 't10', 'l3'],
    ['t13', 't14', 'l4'],
  ];

  footballPairs.forEach((pair, idx) => {
    const [home, away, league] = pair;
    const homeTeam = teams.find(t => t.id === home)!;
    const awayTeam = teams.find(t => t.id === away)!;
    const leagueData = leagues.find(l => l.id === league)!;

    // Live match
    if (idx === 0) {
      matches.push({
        id: `m${matches.length + 1}`,
        sportId: '1',
        sport: 'football',
        leagueId: league,
        league: leagueData,
        teamHome: homeTeam,
        teamAway: awayTeam,
        startTime: addHours(now, -1).toISOString(),
        status: 'live',
        scoreHome: 1,
        scoreAway: 0,
        period: '2nd Half',
        minute: 67,
      });
    } else {
      // Scheduled matches
      matches.push({
        id: `m${matches.length + 1}`,
        sportId: '1',
        sport: 'football',
        leagueId: league,
        league: leagueData,
        teamHome: homeTeam,
        teamAway: awayTeam,
        startTime: addDays(addHours(now, 2 + idx * 12), Math.floor(idx / 2)).toISOString(),
        status: 'scheduled',
      });
    }
  });

  // Basketball matches
  const basketballPairs = [
    ['t15', 't16', 'l8'], ['t17', 't18', 'l8'], ['t19', 't17', 'l8'],
  ];

  basketballPairs.forEach((pair, idx) => {
    const [home, away, league] = pair;
    const homeTeam = teams.find(t => t.id === home)!;
    const awayTeam = teams.find(t => t.id === away)!;
    const leagueData = leagues.find(l => l.id === league)!;

    if (idx === 0) {
      matches.push({
        id: `m${matches.length + 1}`,
        sportId: '2',
        sport: 'basketball',
        leagueId: league,
        league: leagueData,
        teamHome: homeTeam,
        teamAway: awayTeam,
        startTime: addHours(now, -0.5).toISOString(),
        status: 'live',
        scoreHome: 54,
        scoreAway: 48,
        period: '3rd Quarter',
      });
    } else {
      matches.push({
        id: `m${matches.length + 1}`,
        sportId: '2',
        sport: 'basketball',
        leagueId: league,
        league: leagueData,
        teamHome: homeTeam,
        teamAway: awayTeam,
        startTime: addDays(addHours(now, 3 + idx * 8), idx).toISOString(),
        status: 'scheduled',
      });
    }
  });

  // Tennis matches
  const tennisPairs = [
    ['t20', 't21', 'l11'], ['t22', 't23', 'l11'], ['t20', 't22', 'l13'],
  ];

  tennisPairs.forEach((pair, idx) => {
    const [home, away, league] = pair;
    const homeTeam = teams.find(t => t.id === home)!;
    const awayTeam = teams.find(t => t.id === away)!;
    const leagueData = leagues.find(l => l.id === league)!;

    matches.push({
      id: `m${matches.length + 1}`,
      sportId: '3',
      sport: 'tennis',
      leagueId: league,
      league: leagueData,
      teamHome: homeTeam,
      teamAway: awayTeam,
      startTime: addDays(addHours(now, 4 + idx * 6), idx).toISOString(),
      status: idx === 0 ? 'live' : 'scheduled',
      scoreHome: idx === 0 ? 2 : undefined,
      scoreAway: idx === 0 ? 1 : undefined,
      period: idx === 0 ? '4th Set' : undefined,
    });
  });

  // Boxing matches
  matches.push({
    id: `m${matches.length + 1}`,
    sportId: '4',
    sport: 'boxing',
    leagueId: 'l14',
    league: leagues.find(l => l.id === 'l14')!,
    teamHome: teams.find(t => t.id === 't24')!,
    teamAway: teams.find(t => t.id === 't25')!,
    startTime: addDays(now, 14).toISOString(),
    status: 'scheduled',
  });

  matches.push({
    id: `m${matches.length + 1}`,
    sportId: '4',
    sport: 'boxing',
    leagueId: 'l15',
    league: leagues.find(l => l.id === 'l15')!,
    teamHome: teams.find(t => t.id === 't26')!,
    teamAway: teams.find(t => t.id === 't24')!,
    startTime: addDays(now, 45).toISOString(),
    status: 'scheduled',
  });

  // UFC matches
  matches.push({
    id: `m${matches.length + 1}`,
    sportId: '5',
    sport: 'ufc',
    leagueId: 'l16',
    league: leagues.find(l => l.id === 'l16')!,
    teamHome: teams.find(t => t.id === 't27')!,
    teamAway: teams.find(t => t.id === 't28')!,
    startTime: addDays(now, 7).toISOString(),
    status: 'scheduled',
  });

  matches.push({
    id: `m${matches.length + 1}`,
    sportId: '5',
    sport: 'ufc',
    leagueId: 'l16',
    league: leagues.find(l => l.id === 'l16')!,
    teamHome: teams.find(t => t.id === 't29')!,
    teamAway: teams.find(t => t.id === 't27')!,
    startTime: addDays(now, 30).toISOString(),
    status: 'scheduled',
  });

  // Esports matches
  const esportsPairs = [
    ['t30', 't31', 'l18'], ['t32', 't33', 'l18'], ['t30', 't32', 'l19'],
  ];

  esportsPairs.forEach((pair, idx) => {
    const [home, away, league] = pair;
    const homeTeam = teams.find(t => t.id === home)!;
    const awayTeam = teams.find(t => t.id === away)!;
    const leagueData = leagues.find(l => l.id === league)!;

    matches.push({
      id: `m${matches.length + 1}`,
      sportId: '6',
      sport: 'esports',
      leagueId: league,
      league: leagueData,
      teamHome: homeTeam,
      teamAway: awayTeam,
      startTime: addDays(addHours(now, 2 + idx * 4), idx).toISOString(),
      status: idx === 0 ? 'live' : 'scheduled',
      scoreHome: idx === 0 ? 1 : undefined,
      scoreAway: idx === 0 ? 1 : undefined,
      period: idx === 0 ? 'Map 3' : undefined,
    });
  });

  return matches;
};

// Generate odds for matches
export const generateOdds = (matchId: string, sport: SportType): Odds[] => {
  const odds: Odds[] = [];
  const now = new Date().toISOString();

  // Generate random but reasonable odds
  const randomOdds = (min: number, max: number) => {
    return Math.round((min + Math.random() * (max - min)) * 100) / 100;
  };

  if (sport === 'football') {
    // 1X2
    const homeOdds = randomOdds(1.5, 3.5);
    const drawOdds = randomOdds(3.0, 4.0);
    const awayOdds = randomOdds(1.8, 4.0);

    odds.push({
      id: `o${matchId}-1`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: '1x2',
      marketName: 'Match Result',
      selections: [
        { id: 's1', name: 'Home', value: homeOdds, impliedProbability: 1 / homeOdds },
        { id: 's2', name: 'Draw', value: drawOdds, impliedProbability: 1 / drawOdds },
        { id: 's3', name: 'Away', value: awayOdds, impliedProbability: 1 / awayOdds },
      ],
      updatedAt: now,
    });

    // Total
    const overOdds = randomOdds(1.7, 2.2);
    const underOdds = randomOdds(1.7, 2.2);

    odds.push({
      id: `o${matchId}-2`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'total',
      marketName: 'Total 2.5',
      selections: [
        { id: 's4', name: 'Over 2.5', value: overOdds, impliedProbability: 1 / overOdds },
        { id: 's5', name: 'Under 2.5', value: underOdds, impliedProbability: 1 / underOdds },
      ],
      updatedAt: now,
    });

    // Both teams to score
    const btsYes = randomOdds(1.6, 2.0);
    const btsNo = randomOdds(1.7, 2.1);

    odds.push({
      id: `o${matchId}-3`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'bothToScore',
      marketName: 'Both Teams to Score',
      selections: [
        { id: 's6', name: 'Yes', value: btsYes, impliedProbability: 1 / btsYes },
        { id: 's7', name: 'No', value: btsNo, impliedProbability: 1 / btsNo },
      ],
      updatedAt: now,
    });
  } else if (sport === 'basketball') {
    // Winner
    const homeOdds = randomOdds(1.4, 2.8);
    const awayOdds = randomOdds(1.4, 2.8);

    odds.push({
      id: `o${matchId}-1`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'winner',
      marketName: 'Winner',
      selections: [
        { id: 's1', name: 'Home', value: homeOdds, impliedProbability: 1 / homeOdds },
        { id: 's2', name: 'Away', value: awayOdds, impliedProbability: 1 / awayOdds },
      ],
      updatedAt: now,
    });

    // Total
    const overOdds = randomOdds(1.85, 1.95);
    const underOdds = randomOdds(1.85, 1.95);

    odds.push({
      id: `o${matchId}-2`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'total',
      marketName: 'Total 220.5',
      selections: [
        { id: 's3', name: 'Over 220.5', value: overOdds, impliedProbability: 1 / overOdds },
        { id: 's4', name: 'Under 220.5', value: underOdds, impliedProbability: 1 / underOdds },
      ],
      updatedAt: now,
    });
  } else if (sport === 'tennis') {
    // Winner
    const homeOdds = randomOdds(1.3, 3.0);
    const awayOdds = randomOdds(1.3, 3.0);

    odds.push({
      id: `o${matchId}-1`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'winner',
      marketName: 'Match Winner',
      selections: [
        { id: 's1', name: 'Home', value: homeOdds, impliedProbability: 1 / homeOdds },
        { id: 's2', name: 'Away', value: awayOdds, impliedProbability: 1 / awayOdds },
      ],
      updatedAt: now,
    });

    // Total sets
    const over = randomOdds(1.7, 2.1);
    const under = randomOdds(1.7, 2.1);

    odds.push({
      id: `o${matchId}-2`,
      matchId,
      bookmaker: 'Fonbet',
      marketType: 'total',
      marketName: 'Total Sets 3.5',
      selections: [
        { id: 's3', name: 'Over 3.5', value: over, impliedProbability: 1 / over },
        { id: 's4', name: 'Under 3.5', value: under, impliedProbability: 1 / under },
      ],
      updatedAt: now,
    });
  } else if (sport === 'boxing' || sport === 'ufc') {
    // Winner
    const homeOdds = randomOdds(1.4, 3.5);
    const awayOdds = randomOdds(1.4, 3.5);

    odds.push({
      id: `o${matchId}-1`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'winner',
      marketName: 'Winner',
      selections: [
        { id: 's1', name: 'Home', value: homeOdds, impliedProbability: 1 / homeOdds },
        { id: 's2', name: 'Away', value: awayOdds, impliedProbability: 1 / awayOdds },
      ],
      updatedAt: now,
    });

    // Method of victory
    const koOdds = randomOdds(2.0, 3.5);
    const decisionOdds = randomOdds(2.0, 3.0);

    odds.push({
      id: `o${matchId}-2`,
      matchId,
      bookmaker: 'Fonbet',
      marketType: 'winner',
      marketName: 'Method of Victory',
      selections: [
        { id: 's3', name: 'KO/TKO', value: koOdds, impliedProbability: 1 / koOdds },
        { id: 's4', name: 'By Decision', value: decisionOdds, impliedProbability: 1 / decisionOdds },
      ],
      updatedAt: now,
    });
  } else if (sport === 'esports') {
    // Winner
    const homeOdds = randomOdds(1.4, 2.8);
    const awayOdds = randomOdds(1.4, 2.8);

    odds.push({
      id: `o${matchId}-1`,
      matchId,
      bookmaker: 'Multiple Bookmakers',
      marketType: 'winner',
      marketName: 'Match Winner',
      selections: [
        { id: 's1', name: 'Home', value: homeOdds, impliedProbability: 1 / homeOdds },
        { id: 's2', name: 'Away', value: awayOdds, impliedProbability: 1 / awayOdds },
      ],
      updatedAt: now,
    });

    // Total maps
    const overMaps = randomOdds(1.8, 2.0);
    const underMaps = randomOdds(1.8, 2.0);

    odds.push({
      id: `o${matchId}-2`,
      matchId,
      bookmaker: 'Fonbet',
      marketType: 'total',
      marketName: 'Total Maps 2.5',
      selections: [
        { id: 's3', name: 'Over 2.5', value: overMaps, impliedProbability: 1 / overMaps },
        { id: 's4', name: 'Under 2.5', value: underMaps, impliedProbability: 1 / underMaps },
      ],
      updatedAt: now,
    });
  }

  return odds;
};

// Generate H2H data
export const generateH2H = (team1Id: string, team2Id: string): H2HMatch[] => {
  const team1 = teams.find(t => t.id === team1Id);
  const team2 = teams.find(t => t.id === team2Id);

  if (!team1 || !team2) return [];

  const h2h: H2HMatch[] = [];
  const tournaments = ['Championship', 'Cup', 'Super Cup', 'League'];

  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - (i + 1) * 2);

    const scoreHome = Math.floor(Math.random() * 4);
    const scoreAway = Math.floor(Math.random() * 4);

    h2h.push({
      id: `h2h-${team1Id}-${team2Id}-${i}`,
      date: date.toISOString(),
      tournament: tournaments[i % tournaments.length],
      homeTeam: i % 2 === 0 ? team1.name : team2.name,
      awayTeam: i % 2 === 0 ? team2.name : team1.name,
      scoreHome,
      scoreAway,
      winner: scoreHome > scoreAway ? 'home' : scoreHome < scoreAway ? 'away' : 'draw',
    });
  }

  return h2h;
};

// Store for current matches (will be updated)
let currentMatches = generateMatches();

export const getMatches = (): Match[] => currentMatches;

export const updateMatch = (matchId: string, updates: Partial<Match>): Match | null => {
  const index = currentMatches.findIndex(m => m.id === matchId);
  if (index === -1) return null;

  currentMatches[index] = { ...currentMatches[index], ...updates };
  return currentMatches[index];
};

// Regenerate matches periodically to simulate live data
export const regenerateMatches = () => {
  currentMatches = generateMatches();
};




