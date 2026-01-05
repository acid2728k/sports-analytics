import { format } from 'date-fns';
import { ChevronRight, Clock, Zap } from 'lucide-react';
import type { Match } from '../types';
import { useStore } from '../store';
import styles from './MatchCard.module.css';

interface MatchCardProps {
  match: Match;
  index: number;
}

const sportIcons: Record<string, string> = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  boxing: '🥊',
  ufc: '🤼',
  esports: '🎮',
};

export const MatchCard = ({ match, index }: MatchCardProps) => {
  const { openMatchDetails } = useStore();

  const handleClick = () => {
    openMatchDetails(match);
  };

  const formatMatchTime = () => {
    const date = new Date(match.startTime);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    const isTomorrow = date.toDateString() === new Date(now.getTime() + 86400000).toDateString();

    if (isToday) {
      return `Today, ${format(date, 'HH:mm')}`;
    } else if (isTomorrow) {
      return `Tomorrow, ${format(date, 'HH:mm')}`;
    } else {
      return format(date, 'MMM d, HH:mm');
    }
  };

  return (
    <div
      className={styles.card}
      onClick={handleClick}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className={styles.header}>
        <div className={styles.league}>
          <span className={styles.sportIcon}>{sportIcons[match.sport]}</span>
          <span className={styles.leagueName}>{match.league.name}</span>
        </div>
        
        <div className={styles.status}>
          {match.status === 'live' ? (
            <span className={styles.liveBadge}>
              <Zap className={styles.liveIcon} />
              LIVE {match.minute && `${match.minute}'`}
            </span>
          ) : (
            <span className={styles.time}>
              <Clock className={styles.clockIcon} />
              {formatMatchTime()}
            </span>
          )}
        </div>
      </div>

      <div className={styles.teams}>
        <div className={styles.team}>
          <span className={styles.teamName}>{match.teamHome.name}</span>
          {match.status === 'live' && (
            <span className={styles.score}>{match.scoreHome ?? 0}</span>
          )}
        </div>

        <div className={styles.vs}>
          {match.status === 'live' ? (
            <span className={styles.separator}>:</span>
          ) : (
            <span className={styles.vsText}>vs</span>
          )}
        </div>

        <div className={styles.team}>
          <span className={styles.teamName}>{match.teamAway.name}</span>
          {match.status === 'live' && (
            <span className={styles.score}>{match.scoreAway ?? 0}</span>
          )}
        </div>
      </div>

      {match.status === 'live' && match.period && (
        <div className={styles.period}>
          {match.period}
        </div>
      )}

      <div className={styles.footer}>
        <span className={styles.viewDetails}>
          View Analysis
          <ChevronRight className={styles.chevron} />
        </span>
      </div>
    </div>
  );
};
