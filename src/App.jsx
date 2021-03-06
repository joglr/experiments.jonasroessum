import React, { useState, useEffect } from 'react'
import './App.css'

const blacklist = [
  'font',
  'js',
  'php',
  'css',
  'img'
]

function App() {
  const experiments = useExperiments()
  return (
    <>
      <h1>Welcome to experiments</h1>
      <div>
        <ul>
          {experiments && experiments.length === 0 && 'Loading experiments..'}
          {experiments
            ? experiments.map((x, key) => (
                <li key={key}>
                  <a href={`${x}/`}>{x}</a>
                </li>
              ))
            : 'Unable to load experiments'}
        </ul>
      </div>
    </>
  )
}

function useExperiments() {
  const [experiments, setExperiments] = useState([])
  useEffect(async () => {
    const result = await fetch('experiments.json')
      .then(response => response.json())
      .catch(e => {
        console.error(e)
      })
      .then(items => items && items.filter(x => !blacklist.includes(x)))
    setExperiments(result)
  }, [])
  return experiments
}

export default App
