import { io, type Socket } from 'socket.io-client';
import type { Match, LiveUpdate } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<(data: unknown) => void>> = new Map();

  connect(): void {
    if (this.socket?.connected) return;

    this.socket = io(SOCKET_URL, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('🔌 WebSocket connected');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ WebSocket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    // Forward events to listeners
    this.socket.onAny((event: string, data: unknown) => {
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.forEach(listener => listener(data));
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  on<T>(event: string, callback: (data: T) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    const listener = callback as (data: unknown) => void;
    this.listeners.get(event)!.add(listener);

    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(listener);
    };
  }

  onLiveInit(callback: (matches: Match[]) => void): () => void {
    return this.on<Match[]>('live:init', callback);
  }

  onLiveUpdate(callback: (update: LiveUpdate) => void): () => void {
    return this.on<LiveUpdate>('live:update', callback);
  }

  onMatchUpdate(callback: (update: { type: string; data: Match; timestamp: string }) => void): () => void {
    return this.on<{ type: string; data: Match; timestamp: string }>('match:update', callback);
  }

  subscribeToMatch(matchId: string): void {
    this.socket?.emit('subscribe:match', matchId);
  }

  unsubscribeFromMatch(matchId: string): void {
    this.socket?.emit('unsubscribe:match', matchId);
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

export const socketService = new SocketService();
export default socketService;

