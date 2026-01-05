import type { 
  Sport, 
  Match, 
  Odds, 
  H2HMatch, 
  MatchProbabilities,
  MatchAnalysis 
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

class ApiService {
  private async fetch<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse<T> = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data.data;
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  // Sports
  async getSports(): Promise<Sport[]> {
    return this.fetch<Sport[]>('/sports');
  }

  async getSport(slug: string): Promise<Sport> {
    return this.fetch<Sport>(`/sports/${slug}`);
  }

  // Matches
  async getMatches(params?: {
    sport?: string;
    from?: string;
    to?: string;
    status?: string;
    leagueId?: string;
  }): Promise<Match[]> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value) searchParams.append(key, value);
      });
    }
    
    const query = searchParams.toString();
    return this.fetch<Match[]>(`/matches${query ? `?${query}` : ''}`);
  }

  async getLiveMatches(): Promise<Match[]> {
    return this.fetch<Match[]>('/matches/live');
  }

  async getMatch(id: string): Promise<Match> {
    return this.fetch<Match>(`/matches/${id}`);
  }

  async getMatchOdds(id: string): Promise<Odds[]> {
    return this.fetch<Odds[]>(`/matches/${id}/odds`);
  }

  async getMatchH2H(id: string): Promise<H2HMatch[]> {
    return this.fetch<H2HMatch[]>(`/matches/${id}/h2h`);
  }

  async getMatchProbabilities(id: string): Promise<MatchProbabilities> {
    return this.fetch<MatchProbabilities>(`/matches/${id}/probabilities`);
  }

  async getMatchAnalysis(id: string): Promise<MatchAnalysis> {
    return this.fetch<MatchAnalysis>(`/matches/${id}/analysis`);
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.json();
  }
}

export const api = new ApiService();
export default api;
