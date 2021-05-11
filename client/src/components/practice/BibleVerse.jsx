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

  // To inject the content from API that comes in HTML
  // This is called dangerous HTML 
  const verseInHTML = {
    __html: passage.content
    //__html: '<span>This is some test text to test. To avoid so many API calls. Try to repeat it.</span>'
  }
  
  

  function handleClick() {
    setReadingMode(!readingMode)
    setWrittingMode(!writtingMode)
  }

  return (
    <div className='little-spc'>
      <p dangerouslySetInnerHTML={verseInHTML} />
      <button onClick={handleClick} >I'm ready!</button>
    </div>
  )
}