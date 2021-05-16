import React, { useContext } from 'react'
import { BibleContext } from '../../contexts/BibleContext'

export default function BibleVerse(props) {
  const { passage } = useContext(BibleContext)

  const { 
    setReadingMode,
    readingMode,
    setWrittingMode,
    writtingMode
  } = props.modes

  function handleClick() {
    setReadingMode(!readingMode)
    setWrittingMode(!writtingMode)
  }

  return (
    <div className='little-spc'>
      <p>{passage.content}</p>
      <button onClick={handleClick} >I'm ready!</button>
    </div>
  )
}