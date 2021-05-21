import React, { useContext } from 'react'

import { BibleContext } from '../../contexts/BibleContext'

import Button from 'react-bootstrap/Button'


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
      <p className='results_texts'>{passage.content}</p>
      <h4>Your text:</h4>
      <p className='results_texts'>{userText}</p>

      <div className='buttons_horizontal'>
        { textDiff &&  <h3>{ textDiff.percentage } %</h3> }
        <Button onClick={handleTryAgain}>Try again</Button>
      </div>
    </div>
  )
}