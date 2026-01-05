import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import dotenv from 'dotenv';

import sportsRouter from './routes/sports';
import matchesRouter from './routes/matches';
import { getMatches, updateMatch, regenerateMatches } from './services/mockData';
import { testConnection } from './db/connection';

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);

// Configure CORS
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Socket.io setup for real-time updates
const io = new SocketServer(httpServer, {
  cors: corsOptions,
});

// API Routes
app.use('/api/sports', sportsRouter);
app.use('/api/matches', matchesRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '0.1.0',
  });
});

// API info endpoint
app.get('/api', (_req, res) => {
  res.json({
    name: 'Sports Analytics v. 0.1 API',
    version: '0.1.0',
    endpoints: {
      sports: '/api/sports',
      matches: '/api/matches',
      live: '/api/matches/live',
      matchDetail: '/api/matches/:id',
      matchOdds: '/api/matches/:id/odds',
      matchH2H: '/api/matches/:id/h2h',
      matchProbabilities: '/api/matches/:id/probabilities',
      matchAnalysis: '/api/matches/:id/analysis',
      health: '/api/health',
    },
  });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`🔌 Client connected: ${socket.id}`);
  
  // Send initial live matches
  const liveMatches = getMatches().filter(m => m.status === 'live');
  socket.emit('live:init', liveMatches);
  
  // Handle subscription to specific match
  socket.on('subscribe:match', (matchId: string) => {
    socket.join(`match:${matchId}`);
    console.log(`📺 Client ${socket.id} subscribed to match ${matchId}`);
  });
  
  socket.on('unsubscribe:match', (matchId: string) => {
    socket.leave(`match:${matchId}`);
  });
  
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
  });
});

// Simulate live match updates
const simulateLiveUpdates = () => {
  const liveMatches = getMatches().filter(m => m.status === 'live');
  
  liveMatches.forEach(match => {
    // Random chance to update score
    if (Math.random() < 0.1) {
      const isHomeGoal = Math.random() > 0.5;
      const updates: Partial<typeof match> = {};
      
      if (match.sport === 'football') {
        if (isHomeGoal) {
          updates.scoreHome = (match.scoreHome || 0) + 1;
        } else {
          updates.scoreAway = (match.scoreAway || 0) + 1;
        }
        updates.minute = (match.minute || 0) + Math.floor(Math.random() * 5);
      } else if (match.sport === 'basketball') {
        const points = Math.floor(Math.random() * 3) + 1;
        if (isHomeGoal) {
          updates.scoreHome = (match.scoreHome || 0) + points;
        } else {
          updates.scoreAway = (match.scoreAway || 0) + points;
        }
      } else if (match.sport === 'tennis') {
        // Simplified tennis scoring
        if (isHomeGoal) {
          updates.scoreHome = (match.scoreHome || 0) + 1;
        } else {
          updates.scoreAway = (match.scoreAway || 0) + 1;
        }
      } else if (match.sport === 'esports') {
        // Map win
        if (Math.random() < 0.3) {
          if (isHomeGoal) {
            updates.scoreHome = (match.scoreHome || 0) + 1;
          } else {
            updates.scoreAway = (match.scoreAway || 0) + 1;
          }
        }
      }
      
      if (Object.keys(updates).length > 0) {
        const updatedMatch = updateMatch(match.id, updates);
        if (updatedMatch) {
          // Broadcast to all clients
          io.emit('live:update', {
            type: 'score',
            matchId: match.id,
            data: updatedMatch,
            timestamp: new Date().toISOString(),
          });
          
          // Also to specific match room
          io.to(`match:${match.id}`).emit('match:update', {
            type: 'score',
            data: updatedMatch,
            timestamp: new Date().toISOString(),
          });
        }
      }
    }
  });
};

// Start simulation interval (every 10 seconds)
setInterval(simulateLiveUpdates, 10000);

// Regenerate matches every hour to keep data fresh
setInterval(regenerateMatches, 3600000);

// Start server
const PORT = process.env.PORT || 3001;

const startServer = async () => {
  // Test database connection (optional)
  await testConnection();
  
  httpServer.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║                                                                ║
║   🏆 Sports Analytics v. 0.1 API Server                        ║
║                                                                ║
║   Server running on: http://localhost:${PORT}                    ║
║   API Documentation: http://localhost:${PORT}/api                ║
║   Health Check: http://localhost:${PORT}/api/health              ║
║                                                                ║
║   WebSocket enabled for real-time updates                      ║
║                                                                ║
╚════════════════════════════════════════════════════════════════╝
    `);
  });
};

startServer();




