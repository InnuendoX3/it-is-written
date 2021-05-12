import React, { useContext } from 'react'

import { BibleContext } from '../../contexts/BibleContext'

export default function Results(props) {
  const { passage, userText, setUserText, textDiff } = useContext(BibleContext)
  const { setReadingMode, setWrittingMode, setShowResults } = props.modes
  
  function handleTryAgain(e) {
    e.preventDefault()

    setUserText('')

    setReadingMode(true)
    setWrittingMode(false)
    setShowResults(false)

  }
  
  return (
    <div>
      <h2>{passage.reference}</h2>
      <p>{passage.content}</p>
      <h2>Your text:</h2>
      <p>{userText}</p>

      { textDiff &&  <h3>{ textDiff.percentage } %</h3> }
      
      <button onClick={handleTryAgain}>Try again</button>
    </div>
  )
}