import React, { useContext, useState, useCallback } from 'react'
import { BibleContext } from '../../contexts/BibleContext'

export default function BibleVerse(props) {
  const { setPassagePlainText } = useContext(BibleContext)

  const verseText = props.verseInHTML
  const { 
    setReadingMode,
    readingMode,
    setWrittingMode,
    writtingMode
  } = props.modes
  
  const verseRef = useTextContent(null)

  //Function to get the text (textContent) that is inside the HTML
  //https://chasem.co/2019/09/use-text-content-hook
  function useTextContent(initial) {
    const [textContent, setTextContent] = useState(initial)

    const ref = useCallback( node => {
      if( node !== null ) {
        setTextContent(node.textContent)
      }
    }, [])

    ref.current = textContent
    console.log('ref.current!!', ref.current)
    setPassagePlainText(ref.current)
    return ref
  }
  
  function handleClick() {
    setReadingMode(!readingMode)
    setWrittingMode(!writtingMode)
  }

  return (
    <div className='little-spc'>
      <p ref={verseRef} dangerouslySetInnerHTML={verseText} />
      <button onClick={handleClick} >I'm ready!</button>
    </div>
  )
}