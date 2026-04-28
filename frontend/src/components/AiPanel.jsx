import './AiPanel.css'

function AiPanel({data}) {
  return (
    <div className="ai-panel">

      <div className="ai-header">
        <div className="ai-icon">✦</div>

        <div>
          <h2>AI Performance Analysis</h2>
          <p>Real-time strategy insights</p>
        </div>
      </div>
      <div className="recommend-box">
        <strong>AI Recommendation:</strong>
        <p>
          {data}
        </p>
      </div>

    </div>
  )
}

export default AiPanel