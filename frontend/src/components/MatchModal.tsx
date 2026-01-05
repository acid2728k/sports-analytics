import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { 
  X, 
  Clock, 
  Zap, 
  TrendingUp, 
  History, 
  BarChart3, 
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronDown,
  ChevronUp,
  Loader2
} from 'lucide-react';
import { useStore } from '../store';
import { api } from '../services/api';
import type { H2HMatch } from '../types';
import styles from './MatchModal.module.css';

const sportIcons: Record<string, string> = {
  football: '⚽',
  basketball: '🏀',
  tennis: '🎾',
  boxing: '🥊',
  ufc: '🤼',
  esports: '🎮',
};

export const MatchModal = () => {
  const { 
    showMatchModal, 
    closeMatchModal, 
    selectedMatch, 
    matchAnalysis, 
    loadingAnalysis 
  } = useStore();

  const [showH2H, setShowH2H] = useState(false);
  const [h2hData, setH2hData] = useState<H2HMatch[]>([]);
  const [loadingH2H, setLoadingH2H] = useState(false);

  useEffect(() => {
    if (!showMatchModal) {
      setShowH2H(false);
      setH2hData([]);
    }
  }, [showMatchModal]);

  const handleLoadH2H = async () => {
    if (!selectedMatch) return;
    
    if (showH2H) {
      setShowH2H(false);
      return;
    }

    setLoadingH2H(true);
    try {
      const data = await api.getMatchH2H(selectedMatch.id);
      setH2hData(data);
      setShowH2H(true);
    } catch (error) {
      console.error('Failed to load H2H:', error);
    } finally {
      setLoadingH2H(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeMatchModal();
    }
  };

  if (!showMatchModal || !selectedMatch) return null;

  const formatMatchTime = () => {
    const date = new Date(selectedMatch.startTime);
    return format(date, "MMM d, yyyy, HH:mm");
  };

  const getValueIcon = (indicator: string) => {
    switch (indicator) {
      case 'positive':
        return <ArrowUpRight className={styles.valueIconPositive} />;
      case 'negative':
        return <ArrowDownRight className={styles.valueIconNegative} />;
      default:
        return <Minus className={styles.valueIconNeutral} />;
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <span className={styles.sportIcon}>{sportIcons[selectedMatch.sport]}</span>
            <div className={styles.headerInfo}>
              <span className={styles.league}>{selectedMatch.league.name}</span>
              <span className={styles.datetime}>{formatMatchTime()}</span>
            </div>
          </div>
          
          <div className={styles.headerRight}>
            {selectedMatch.status === 'live' ? (
              <span className={styles.liveBadge}>
                <Zap className={styles.liveIcon} />
                LIVE {selectedMatch.minute && `${selectedMatch.minute}'`}
              </span>
            ) : (
              <span className={styles.statusBadge}>
                <Clock className={styles.statusIcon} />
                {selectedMatch.status === 'scheduled' ? 'Scheduled' : 'Finished'}
              </span>
            )}
            
            <button className={styles.closeBtn} onClick={closeMatchModal}>
              <X />
            </button>
          </div>
        </div>

        {/* Teams */}
        <div className={styles.teamsSection}>
          <div className={styles.team}>
            <span className={styles.teamName}>{selectedMatch.teamHome.name}</span>
            {selectedMatch.status === 'live' && (
              <span className={styles.teamScore}>{selectedMatch.scoreHome ?? 0}</span>
            )}
          </div>
          
          <div className={styles.vsContainer}>
            {selectedMatch.status === 'live' ? (
              <span className={styles.scoreSeparator}>:</span>
            ) : (
              <span className={styles.vs}>VS</span>
            )}
          </div>
          
          <div className={styles.team}>
            <span className={styles.teamName}>{selectedMatch.teamAway.name}</span>
            {selectedMatch.status === 'live' && (
              <span className={styles.teamScore}>{selectedMatch.scoreAway ?? 0}</span>
            )}
          </div>
        </div>

        {selectedMatch.status === 'live' && selectedMatch.period && (
          <div className={styles.period}>{selectedMatch.period}</div>
        )}

        {/* Loading State */}
        {loadingAnalysis && (
          <div className={styles.loading}>
            <Loader2 className={styles.loadingSpinner} />
            <span>Loading analysis...</span>
          </div>
        )}

        {/* Analysis Content */}
        {matchAnalysis && !loadingAnalysis && (
          <>
            {/* Probability Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <BarChart3 className={styles.sectionIcon} />
                Probability Calculation
              </h3>
              
              {/* Main outcome probabilities */}
              <div className={styles.probabilityGrid}>
                <div className={styles.probItem}>
                  <span className={styles.probLabel}>Home</span>
                  <span className={styles.probValue}>{matchAnalysis.probabilities.mainOutcome.home}%</span>
                </div>
                
                {matchAnalysis.probabilities.mainOutcome.draw !== undefined && (
                  <div className={styles.probItem}>
                    <span className={styles.probLabel}>X</span>
                    <span className={styles.probValue}>{matchAnalysis.probabilities.mainOutcome.draw}%</span>
                  </div>
                )}
                
                <div className={styles.probItem}>
                  <span className={styles.probLabel}>Away</span>
                  <span className={styles.probValue}>{matchAnalysis.probabilities.mainOutcome.away}%</span>
                </div>
              </div>

              {/* Probability Bar */}
              <div className={styles.probBar}>
                <div 
                  className={styles.probBarHome}
                  style={{ width: `${matchAnalysis.probabilities.mainOutcome.home}%` }}
                />
                {matchAnalysis.probabilities.mainOutcome.draw !== undefined && (
                  <div 
                    className={styles.probBarDraw}
                    style={{ width: `${matchAnalysis.probabilities.mainOutcome.draw}%` }}
                  />
                )}
                <div 
                  className={styles.probBarAway}
                  style={{ width: `${matchAnalysis.probabilities.mainOutcome.away}%` }}
                />
              </div>

              {/* Additional probabilities */}
              {matchAnalysis.probabilities.totals && (
                <div className={styles.additionalProbs}>
                  <div className={styles.probRow}>
                    <span className={styles.probRowLabel}>
                      {selectedMatch.sport === 'football' ? 'Total > 2.5' : 
                       selectedMatch.sport === 'boxing' || selectedMatch.sport === 'ufc' ? 'KO/TKO' :
                       'Total Over'}
                    </span>
                    <span className={styles.probRowValue}>{matchAnalysis.probabilities.totals.over25}%</span>
                  </div>
                  <div className={styles.probRow}>
                    <span className={styles.probRowLabel}>
                      {selectedMatch.sport === 'football' ? 'Total < 2.5' : 
                       selectedMatch.sport === 'boxing' || selectedMatch.sport === 'ufc' ? 'By Decision' :
                       'Total Under'}
                    </span>
                    <span className={styles.probRowValue}>{matchAnalysis.probabilities.totals.under25}%</span>
                  </div>
                </div>
              )}

              {matchAnalysis.probabilities.bothToScore && (
                <div className={styles.additionalProbs}>
                  <div className={styles.probRow}>
                    <span className={styles.probRowLabel}>Both Teams to Score: Yes</span>
                    <span className={styles.probRowValue}>{matchAnalysis.probabilities.bothToScore.yes}%</span>
                  </div>
                  <div className={styles.probRow}>
                    <span className={styles.probRowLabel}>Both Teams to Score: No</span>
                    <span className={styles.probRowValue}>{matchAnalysis.probabilities.bothToScore.no}%</span>
                  </div>
                </div>
              )}

              <div className={styles.modelInfo}>
                <span>Model: {matchAnalysis.probabilities.modelVersion}</span>
              </div>
            </div>

            {/* Odds Section */}
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>
                <TrendingUp className={styles.sectionIcon} />
                Bookmaker Odds
              </h3>
              
              {matchAnalysis.odds.map((market) => (
                <div key={market.id} className={styles.marketBlock}>
                  <span className={styles.marketName}>{market.marketName}</span>
                  <div className={styles.oddsGrid}>
                    {market.selections.map((selection) => (
                      <div key={selection.id} className={styles.oddsItem}>
                        <span className={styles.oddsLabel}>{selection.name}</span>
                        <span className={styles.oddsValue}>{selection.value.toFixed(2)}</span>
                        <span className={styles.impliedProb}>
                          ({(selection.impliedProbability * 100).toFixed(1)}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <span className={styles.bookmaker}>Source: Multiple Bookmakers</span>
            </div>

            {/* Value Analysis */}
            {Object.keys(matchAnalysis.valueAnalysis).length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  <TrendingUp className={styles.sectionIcon} />
                  Value Analysis
                </h3>
                
                <div className={styles.valueTable}>
                  <div className={styles.valueHeader}>
                    <span>Outcome</span>
                    <span>Model</span>
                    <span>Bookmaker</span>
                    <span>Value</span>
                  </div>
                  
                  {Object.entries(matchAnalysis.valueAnalysis).map(([key, value]) => (
                    <div key={key} className={styles.valueRow}>
                      <span className={styles.valueOutcome}>{key}</span>
                      <span>{value.modelProb.toFixed(1)}%</span>
                      <span>{value.impliedProb.toFixed(1)}%</span>
                      <span className={`${styles.valueCell} ${styles[value.indicator]}`}>
                        {getValueIcon(value.indicator)}
                        {value.value > 0 ? '+' : ''}{value.value.toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className={styles.valueLegend}>
                  <span className={styles.legendPositive}>
                    <ArrowUpRight /> Potential Value
                  </span>
                  <span className={styles.legendNegative}>
                    <ArrowDownRight /> Overpriced
                  </span>
                </div>
              </div>
            )}

            {/* H2H Section */}
            <div className={styles.section}>
              <button className={styles.h2hToggle} onClick={handleLoadH2H}>
                <div className={styles.h2hToggleLeft}>
                  <History className={styles.sectionIcon} />
                  <span>Head-to-Head (H2H)</span>
                </div>
                {loadingH2H ? (
                  <Loader2 className={styles.loadingSpinnerSmall} />
                ) : showH2H ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}
              </button>
              
              {showH2H && h2hData.length > 0 && (
                <div className={styles.h2hContent}>
                  {h2hData.map((match) => (
                    <div key={match.id} className={styles.h2hMatch}>
                      <div className={styles.h2hDate}>
                        {format(new Date(match.date), 'd MMM yyyy')}
                      </div>
                      <div className={styles.h2hTeams}>
                        <span className={match.winner === 'home' ? styles.winner : ''}>
                          {match.homeTeam}
                        </span>
                        <span className={styles.h2hScore}>
                          {match.scoreHome} : {match.scoreAway}
                        </span>
                        <span className={match.winner === 'away' ? styles.winner : ''}>
                          {match.awayTeam}
                        </span>
                      </div>
                      <div className={styles.h2hTournament}>{match.tournament}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Footer */}
        <div className={styles.footer}>
          <p className={styles.disclaimer}>
            ⚠️ This data is for informational and analytical purposes only. 
            Not a financial recommendation.
          </p>
        </div>
      </div>
    </div>
  );
};
