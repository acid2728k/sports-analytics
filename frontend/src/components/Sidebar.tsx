import { useStore } from '../store';
import type { SportType, TimeFilter } from '../types';
import styles from './Sidebar.module.css';

const sportIcons: Record<SportType, string> = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  boxing: '🥊',
  ufc: '🤼',
  esports: '🎮',
};

const sportNames: Record<SportType, string> = {
  football: 'Football',
  basketball: 'Basketball',
  tennis: 'Tennis',
  boxing: 'Boxing',
  ufc: 'UFC / MMA',
  esports: 'Esports',
};

const timeFilters: { value: TimeFilter; label: string }[] = [
  { value: 'today', label: 'Today' },
  { value: 'tomorrow', label: 'Tomorrow' },
  { value: 'week', label: 'Week' },
  { value: 'month', label: 'Month' },
  { value: 'quarter', label: '3 Months' },
];

export const Sidebar = () => {
  const { 
    sports, 
    selectedSport, 
    setSelectedSport, 
    timeFilter, 
    setTimeFilter,
    matches,
    liveMatches,
  } = useStore();

  const getSportMatchCount = (sport: SportType) => {
    return matches.filter(m => m.sport === sport).length;
  };

  const getSportLiveCount = (sport: SportType) => {
    return matches.filter(m => m.sport === sport && m.status === 'live').length;
  };

  return (
    <aside className={styles.sidebar}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Sports</h3>
        <nav className={styles.sportsList}>
          <button
            className={`${styles.sportItem} ${selectedSport === null ? styles.active : ''}`}
            onClick={() => setSelectedSport(null)}
          >
            <span className={styles.sportIcon}>📊</span>
            <span className={styles.sportName}>All Matches</span>
            <span className={styles.matchCount}>{matches.length}</span>
            {liveMatches.length > 0 && (
              <span className={styles.liveCount}>{liveMatches.length}</span>
            )}
          </button>

          {(Object.keys(sportIcons) as SportType[]).map((sport) => {
            const count = getSportMatchCount(sport);
            const liveCount = getSportLiveCount(sport);
            
            return (
              <button
                key={sport}
                className={`${styles.sportItem} ${selectedSport === sport ? styles.active : ''}`}
                onClick={() => setSelectedSport(sport)}
              >
                <span className={styles.sportIcon}>{sportIcons[sport]}</span>
                <span className={styles.sportName}>{sportNames[sport]}</span>
                {count > 0 && <span className={styles.matchCount}>{count}</span>}
                {liveCount > 0 && <span className={styles.liveCount}>{liveCount}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Period</h3>
        <div className={styles.timeFilters}>
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              className={`${styles.timeFilter} ${timeFilter === filter.value ? styles.active : ''}`}
              onClick={() => setTimeFilter(filter.value)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.footer}>
        <p className={styles.disclaimer}>
          This service is for informational and analytical purposes only and does not encourage betting.
        </p>
      </div>
    </aside>
  );
};

