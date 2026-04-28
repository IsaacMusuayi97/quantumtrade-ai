import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo-section">
          <div className="logo-box">↗</div>

          <div className="brand-text">
            <h1>QuantumTrade AI</h1>
            <p>Intelligent Backtesting Platform</p>
          </div>
        </div>

        <div className="ai-badge">
          AI Powered
        </div>

      </div>
    </nav>
  )
}

export default Navbar