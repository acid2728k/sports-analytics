import { useEffect, useState } from 'react';
import { Header, Sidebar, MatchList, MatchModal } from './components';
import { useStore } from './store';
import { socketService } from './services/socket';
import './styles/index.css';
import styles from './App.module.css';

function App() {
  const [error, setError] = useState<string | null>(null);
  
  const { 
    fetchSports, 
    fetchMatches, 
    setConnected, 
    setLiveMatches,
    updateMatch,
    setLastUpdate,
  } = useStore();

  useEffect(() => {
    const init = async () => {
      try {
        // Initial data fetch
        await fetchSports();
        await fetchMatches();

        // Connect to WebSocket
        socketService.connect();

        // Set up listeners
        socketService.onLiveInit((matches) => {
          setLiveMatches(matches);
          setConnected(true);
        });

        socketService.onLiveUpdate((update) => {
          if (update.type === 'score' && update.data) {
            updateMatch(update.matchId, update.data);
            setLastUpdate(update.timestamp);
          }
        });
      } catch (err) {
        console.error('Init error:', err);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    init();

    // Check connection status
    const connectionCheck = setInterval(() => {
      setConnected(socketService.isConnected());
    }, 5000);

    // Cleanup
    return () => {
      clearInterval(connectionCheck);
      socketService.disconnect();
    };
  }, []);

  // Periodic refresh
  useEffect(() => {
    const refreshInterval = setInterval(() => {
      fetchMatches();
    }, 60000); // Refresh every minute

    return () => clearInterval(refreshInterval);
  }, [fetchMatches]);

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'white', background: '#0a0a0f', minHeight: '100vh' }}>
        <h1>Loading Error</h1>
        <p>{error}</p>
        <p>Make sure the backend is running on http://localhost:3001</p>
      </div>
    );
  }

  return (
    <div className={styles.app}>
      <Sidebar />
      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          <MatchList />
        </div>
      </main>
      <MatchModal />
    </div>
  );
}

export default App;
