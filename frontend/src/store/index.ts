import { create } from 'zustand';
import type { Sport, Match, SportType, TimeFilter, MatchAnalysis } from '../types';
import { api } from '../services/api';

interface AppState {
  // Sports
  sports: Sport[];
  selectedSport: SportType | null;
  loadingSports: boolean;
  
  // Matches
  matches: Match[];
  liveMatches: Match[];
  loadingMatches: boolean;
  
  // Filters
  timeFilter: TimeFilter;
  
  // Selected match
  selectedMatch: Match | null;
  matchAnalysis: MatchAnalysis | null;
  loadingAnalysis: boolean;
  showMatchModal: boolean;
  
  // Connection status
  isConnected: boolean;
  lastUpdate: string | null;
  
  // Actions
  setSports: (sports: Sport[]) => void;
  setSelectedSport: (sport: SportType | null) => void;
  setMatches: (matches: Match[]) => void;
  updateMatch: (matchId: string, updates: Partial<Match>) => void;
  setLiveMatches: (matches: Match[]) => void;
  setTimeFilter: (filter: TimeFilter) => void;
  setSelectedMatch: (match: Match | null) => void;
  setMatchAnalysis: (analysis: MatchAnalysis | null) => void;
  setShowMatchModal: (show: boolean) => void;
  setConnected: (connected: boolean) => void;
  setLastUpdate: (timestamp: string) => void;
  
  // Async actions
  fetchSports: () => Promise<void>;
  fetchMatches: () => Promise<void>;
  fetchMatchAnalysis: (matchId: string) => Promise<void>;
  openMatchDetails: (match: Match) => Promise<void>;
  closeMatchModal: () => void;
}

// Helper to calculate date range from filter
const getDateRange = (filter: TimeFilter): { from: Date; to: Date } => {
  const now = new Date();
  const from = new Date(now);
  const to = new Date(now);
  
  switch (filter) {
    case 'today':
      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 999);
      break;
    case 'tomorrow':
      from.setDate(from.getDate() + 1);
      from.setHours(0, 0, 0, 0);
      to.setDate(to.getDate() + 1);
      to.setHours(23, 59, 59, 999);
      break;
    case 'week':
      from.setHours(0, 0, 0, 0);
      to.setDate(to.getDate() + 7);
      break;
    case 'month':
      from.setHours(0, 0, 0, 0);
      to.setMonth(to.getMonth() + 1);
      break;
    case 'quarter':
      from.setHours(0, 0, 0, 0);
      to.setMonth(to.getMonth() + 3);
      break;
  }
  
  return { from, to };
};

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  sports: [],
  selectedSport: null,
  loadingSports: false,
  
  matches: [],
  liveMatches: [],
  loadingMatches: false,
  
  timeFilter: 'week',
  
  selectedMatch: null,
  matchAnalysis: null,
  loadingAnalysis: false,
  showMatchModal: false,
  
  isConnected: false,
  lastUpdate: null,
  
  // Setters
  setSports: (sports) => set({ sports }),
  setSelectedSport: (sport) => {
    set({ selectedSport: sport });
    get().fetchMatches();
  },
  setMatches: (matches) => set({ matches }),
  updateMatch: (matchId, updates) => {
    set(state => ({
      matches: state.matches.map(m => 
        m.id === matchId ? { ...m, ...updates } : m
      ),
      liveMatches: state.liveMatches.map(m =>
        m.id === matchId ? { ...m, ...updates } : m
      ),
      selectedMatch: state.selectedMatch?.id === matchId 
        ? { ...state.selectedMatch, ...updates }
        : state.selectedMatch,
    }));
  },
  setLiveMatches: (matches) => set({ liveMatches: matches }),
  setTimeFilter: (filter) => {
    set({ timeFilter: filter });
    get().fetchMatches();
  },
  setSelectedMatch: (match) => set({ selectedMatch: match }),
  setMatchAnalysis: (analysis) => set({ matchAnalysis: analysis }),
  setShowMatchModal: (show) => set({ showMatchModal: show }),
  setConnected: (connected) => set({ isConnected: connected }),
  setLastUpdate: (timestamp) => set({ lastUpdate: timestamp }),
  
  // Async actions
  fetchSports: async () => {
    set({ loadingSports: true });
    try {
      const sports = await api.getSports();
      set({ sports, loadingSports: false });
    } catch (error) {
      console.error('Failed to fetch sports:', error);
      set({ loadingSports: false });
    }
  },
  
  fetchMatches: async () => {
    const { selectedSport, timeFilter } = get();
    set({ loadingMatches: true });
    
    try {
      const { from, to } = getDateRange(timeFilter);
      
      const matches = await api.getMatches({
        sport: selectedSport || undefined,
        from: from.toISOString(),
        to: to.toISOString(),
      });
      
      const liveMatches = matches.filter(m => m.status === 'live');
      
      set({ 
        matches, 
        liveMatches,
        loadingMatches: false,
        lastUpdate: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      set({ loadingMatches: false });
    }
  },
  
  fetchMatchAnalysis: async (matchId: string) => {
    set({ loadingAnalysis: true });
    try {
      const analysis = await api.getMatchAnalysis(matchId);
      set({ matchAnalysis: analysis, loadingAnalysis: false });
    } catch (error) {
      console.error('Failed to fetch match analysis:', error);
      set({ loadingAnalysis: false });
    }
  },
  
  openMatchDetails: async (match: Match) => {
    set({ 
      selectedMatch: match, 
      showMatchModal: true,
      matchAnalysis: null,
    });
    await get().fetchMatchAnalysis(match.id);
  },
  
  closeMatchModal: () => {
    set({ 
      showMatchModal: false, 
      selectedMatch: null,
      matchAnalysis: null,
    });
  },
}));

export default useStore;

