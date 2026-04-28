import './Analytics.css'
import AiPanel from './AiPanel'
import ReturnsChart from './ReturnsChart'

function Analytics({data}) {

  return (
    <section className="analytics-section">
      <ReturnsChart data={data?.chart_data} />
      <AiPanel data={data?.ai_analysis}/>
    </section>
  )
}

export default Analytics