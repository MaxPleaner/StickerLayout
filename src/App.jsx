import { useState, useEffect } from 'react'
import './App.css'
import Editor from './Editor'
import Renderer from './Renderer'

function App() {
  const [parsedData, setParsedData] = useState(null)

  useEffect(() => {
    const queryParams = location.search.split("?data=")[1]
    if (!queryParams) { return }

    const urlParams = new URLSearchParams(new URL(location.href).search)
    const data = JSON.parse(urlParams.get("data").slice(0, -1))
    setParsedData(data)
  }, [])

  if (parsedData) {
    return <Renderer data={parsedData} />
  }

  return <Editor />
}

export default App
