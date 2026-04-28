import './Stats.css'

function Stats({data}) {
  if (!data) return null;

  const returnClass =
  data.return_pct > 0 ? "positive" :
  data.return_pct < 0 ? "negative" :
  "neutral";

  const winClass =
  data.win_rate >= 50 ? "positive" : "negative";

  const balanceClass =
  data.ending_balance > data.starting_balance
    ? "positive"
    : "negative";

  
  return (
    <section className="stats-section">

      <div className={`stat-card ${winClass}`}>
        <div className="top-row">
          <div className="icon green">◎</div>
        </div>

        <h4>Win Rate</h4>
        <h2>{data.win_rate}%</h2>
      </div>

      <div className={`stat-card ${returnClass}`}>
        <div className="top-row">
          <div className="icon blue">↗</div>
        </div>

        <h4>Total Return</h4>
        <h2>{data.return_pct}</h2>
      </div>

      <div className="stat-card">
        <div className="top-row">
          <div className="icon purple">∿</div>
        </div>

        <h4>Total Trades</h4>
        <h2>{data.trades}</h2>
      </div>

      <div className={`stat-card ${balanceClass}`}>
        <div className="top-row">
          <div className="icon royal">▥</div>
        </div>

        <h4>Ending balance</h4>
        <h2>{data.ending_balance}</h2>
      </div>

    </section>
  )
}

export default Stats