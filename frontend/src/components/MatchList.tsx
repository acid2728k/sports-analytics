import { useStore } from '../store';
import { MatchCard } from './MatchCard';
import { Loader2, Calendar, AlertCircle } from 'lucide-react';
import styles from './MatchList.module.css';

const sportNames: Record<string, string> = {
  football: 'Football',
  basketball: 'Basketball',
  tennis: 'Tennis',
  boxing: 'Boxing',
  ufc: 'UFC / MMA',
  esports: 'Esports',
};

const timeFilterNames: Record<string, string> = {
  today: 'Today',
  tomorrow: 'Tomorrow',
  week: 'This Week',
  month: 'This Month',
  quarter: 'Next 3 Months',
};

export const MatchList = () => {
  const { matches, loadingMatches, selectedSport, timeFilter, liveMatches } = useStore();

  // Group matches by date
  const groupMatchesByDate = () => {
    const groups: Record<string, typeof matches> = {};
    
    matches.forEach(match => {
      const date = new Date(match.startTime).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(match);
    });
    
    return groups;
  };

  const formatDateHeader = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === now.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        day: 'numeric', 
        month: 'long' 
      });
    }
  };

  const groupedMatches = groupMatchesByDate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>
            {selectedSport ? sportNames[selectedSport] : 'All Matches'}
          </h1>
          <span className={styles.subtitle}>
            {timeFilterNames[timeFilter]} • {matches.length} matches
          </span>
        </div>

        {liveMatches.length > 0 && (
          <div className={styles.liveCounter}>
            <span className={styles.liveIndicator} />
            {liveMatches.length} live
          </div>
        )}
      </div>

      {loadingMatches ? (
        <div className={styles.loading}>
          <Loader2 className={styles.loadingSpinner} />
          <span>Loading matches...</span>
        </div>
      ) : matches.length === 0 ? (
        <div className={styles.empty}>
          <Calendar className={styles.emptyIcon} />
          <h3>No Matches</h3>
          <p>No matches found for the selected period. Try changing the filters.</p>
        </div>
      ) : (
        <div className={styles.matchesContainer}>
          {Object.entries(groupedMatches).map(([date, dateMatches]) => (
            <div key={date} className={styles.dateGroup}>
              <h2 className={styles.dateHeader}>
                <Calendar className={styles.dateIcon} />
                {formatDateHeader(date)}
                <span className={styles.dateCount}>{dateMatches.length}</span>
              </h2>
              
              <div className={styles.matchesGrid}>
                {dateMatches.map((match, index) => (
                  <MatchCard key={match.id} match={match} index={index} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};




