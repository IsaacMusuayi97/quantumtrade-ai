import {useState} from 'react';
import './ConfigPanel.css'

function ConfigPanel({setResults}) {
  const [stock, setStock] = useState("AAPL");
  const [period, setPeriod] = useState("5y");
  const [loading, setLoading] = useState(false);
  
   const displayContent = async () => {
      try {

        setLoading(true); // Start loading

        const response = await fetch(`https://quantumtrade-ai-un7e.onrender.com/backtest?stock=${stock}&period=${period}`
        );                          

        const data = await response.json();
        setResults(data);
        
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
   };


  return (
    <section className="config-panel">

      <div className="config-header">
        <span className="config-icon">↗</span>
        <h2>Strategy Configuration</h2>
      </div>

      <div className="config-row">

        <div className="input-group">
          <label>Select Stock</label>
          <select value={stock} onChange={(e) => setStock(e.target.value)} disabled={loading}>
            <option value="AAPL">AAPL - Apple Inc.</option>
            <option value="TSLA">TSLA - Tesla Inc</option>
            <option value="GOOGL">GOOGL - Alphabet Inc</option>
            <option value="MSFT">MSFT - Microsoft Corp</option>
            <option value="AMZN">AMZN - Amazon.com Inc</option>
            <option value="NVDA">NVDA - NVIDIA Corp</option>
          </select>
        </div>

        <div className="input-group">
          <label>Timeframe</label>
          <select value={period} onChange={(e) => setPeriod(e.target.value)} disabled={loading}>
            <option value="1mo">1 Month</option>
            <option value="3mo">3 Months</option>
            <option value="6mo">6 Months</option>
            <option value="1y">1 Year</option>
            <option value="3y">3 Years</option>
            <option value="5y">5 Years</option>
            <option value="10y">10 Years</option>
          </select>
        </div>

         <button
          className="run-btn"
          onClick={displayContent}
          disabled={loading}
        >
          {loading ? "Processing..." : "▶ Run Backtest"}
        </button>
      </div>
    </section>
  )
}

export default ConfigPanel