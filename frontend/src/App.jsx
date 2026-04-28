import './App.css'
import {useState} from "react";
import Navbar from './components/Navbar'
import ConfigPanel from './components/ConfigPanel'
import Stats from './components/Stats'
import Analytics from './components/Analytics'


function App() {
  const [results, setResults] = useState(null);
  return (
    <>
        <Navbar />
        <ConfigPanel setResults={setResults}/>
        <Stats data={results}/>
        <Analytics data={results}/>
    </>
  )
}

export default App
