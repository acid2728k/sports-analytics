-- Sports Analytics Database Schema

-- Sports table
CREATE TABLE IF NOT EXISTS sports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    icon VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leagues/Tournaments table
CREATE TABLE IF NOT EXISTS leagues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    country VARCHAR(100),
    logo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teams table
CREATE TABLE IF NOT EXISTS teams (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
    name VARCHAR(200) NOT NULL,
    short_name VARCHAR(50),
    logo VARCHAR(500),
    country VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sport_id UUID REFERENCES sports(id) ON DELETE CASCADE,
    league_id UUID REFERENCES leagues(id) ON DELETE SET NULL,
    team_home_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    team_away_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    start_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'scheduled',
    score_home INTEGER,
    score_away INTEGER,
    period VARCHAR(50),
    minute INTEGER,
    raw_stats JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Odds table
CREATE TABLE IF NOT EXISTS odds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    bookmaker VARCHAR(100) NOT NULL,
    market_type VARCHAR(50) NOT NULL,
    market_name VARCHAR(200),
    selections JSONB NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Probability estimates table
CREATE TABLE IF NOT EXISTS probability_estimates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    match_id UUID REFERENCES matches(id) ON DELETE CASCADE,
    market_type VARCHAR(50) NOT NULL,
    selection VARCHAR(100) NOT NULL,
    probability DECIMAL(5,4) NOT NULL,
    model_version VARCHAR(50) NOT NULL,
    calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- H2H results cache table
CREATE TABLE IF NOT EXISTS h2h_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team1_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    team2_id UUID REFERENCES teams(id) ON DELETE CASCADE,
    results JSONB NOT NULL,
    fetched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_matches_sport ON matches(sport_id);
CREATE INDEX IF NOT EXISTS idx_matches_league ON matches(league_id);
CREATE INDEX IF NOT EXISTS idx_matches_start_time ON matches(start_time);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);
CREATE INDEX IF NOT EXISTS idx_odds_match ON odds(match_id);
CREATE INDEX IF NOT EXISTS idx_probability_match ON probability_estimates(match_id);

-- Insert default sports
INSERT INTO sports (name, slug, icon) VALUES
    ('Football', 'football', '⚽'),
    ('Basketball', 'basketball', '🏀'),
    ('Tennis', 'tennis', '🎾'),
    ('Boxing', 'boxing', '🥊'),
    ('UFC / MMA', 'ufc', '🤼'),
    ('Esports', 'esports', '🎮')
ON CONFLICT (slug) DO NOTHING;




