import { useAppStore } from '../store/appStore';

export function Dashboard() {
  const { watchlist, priceCache, predictions } = useAppStore();

  const activePredictions = predictions.filter(p => p.wasAccurate === undefined);
  const scoredPredictions = predictions.filter(p => p.wasAccurate !== undefined);
  const accuratePredictions = scoredPredictions.filter(p => p.wasAccurate);
  const accuracyPct = scoredPredictions.length > 0
    ? Math.round(accuratePredictions.length / scoredPredictions.length * 100)
    : null;

  return (
    <div className="page">
      <h2>Dashboard</h2>

      <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '1.5rem' }}>
        Data refreshed by Kiro agent — ask "daily analysis" in chat
      </p>

      <div className="cards-grid">
        <div className="card">
          <h3>Watchlist</h3>
          <ul className="ticker-list">
            {watchlist.map((symbol) => {
              const prices = priceCache[symbol];
              const latest = prices?.[0];
              const prev = prices?.[1];
              const change = latest && prev ? ((latest.close - prev.close) / prev.close * 100) : 0;
              const isUp = change >= 0;

              return (
                <li key={symbol} className="ticker-item">
                  <span className="ticker-symbol">{symbol}</span>
                  <span>
                    {latest ? `$${latest.close.toFixed(2)}` : '—'}
                    {latest && (
                      <span className={isUp ? 'text-green' : 'text-red'} style={{ marginLeft: '0.5rem', fontSize: '0.8rem' }}>
                        {isUp ? '▲' : '▼'} {Math.abs(change).toFixed(2)}%
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
          <p style={{ fontSize: '0.7rem', color: '#555', marginTop: '0.5rem' }}>
            {priceCache[watchlist[0]]?.[0]?.date
              ? `Last data: ${priceCache[watchlist[0]][0].date}`
              : 'No data loaded'}
          </p>
        </div>

        <div className="card">
          <h3>Active Predictions</h3>
          <p className="big-number">{activePredictions.length}</p>
          <p className="subtitle">across {new Set(activePredictions.map(p => p.symbol)).size} tickers</p>
        </div>

        <div className="card">
          <h3>Prediction Accuracy</h3>
          {accuracyPct !== null ? (
            <>
              <p className="big-number" style={{ color: accuracyPct >= 50 ? '#4ade80' : '#f38ba8' }}>
                {accuracyPct}%
              </p>
              <p className="subtitle">{accuratePredictions.length} correct / {scoredPredictions.length} scored</p>
            </>
          ) : (
            <p className="empty-state">No scored predictions yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
