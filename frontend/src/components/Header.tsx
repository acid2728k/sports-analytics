import { Activity, RefreshCw, TrendingUp } from 'lucide-react';
import { useStore } from '../store';
import { format } from 'date-fns';
import styles from './Header.module.css';

export const Header = () => {
  const { isConnected, lastUpdate, fetchMatches, loadingMatches } = useStore();

  const handleRefresh = () => {
    fetchMatches();
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <TrendingUp className={styles.logoIcon} />
          <span className={styles.logoText}>Sports Analytics</span>
          <span className={styles.version}>v. 0.1</span>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.connectionStatus}>
          <span className={`${styles.connectionDot} ${isConnected ? styles.connected : ''}`} />
          <span className={styles.connectionText}>
            {isConnected ? 'Live' : 'Offline'}
          </span>
        </div>

        {lastUpdate && (
          <div className={styles.lastUpdate}>
            Updated: {format(new Date(lastUpdate), 'HH:mm:ss')}
          </div>
        )}

        <button 
          className={styles.refreshBtn}
          onClick={handleRefresh}
          disabled={loadingMatches}
        >
          <RefreshCw className={`${styles.refreshIcon} ${loadingMatches ? styles.spinning : ''}`} />
        </button>

        <div className={styles.liveIndicator}>
          <Activity className={styles.activityIcon} />
          <span>Real-time</span>
        </div>
      </div>
    </header>
  );
};

