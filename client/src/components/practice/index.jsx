import React, { useContext, useState } from 'react'
import axios from 'axios'

import { BibleContext } from '../../contexts/BibleContext'
import BibleVerse from './BibleVerse'
import VerseForm from './VerseForm'

export default function Practice() {
  const { passage, passagePlainText } = useContext(BibleContext)

  const [readingMode, setReadingMode] = useState(true)
  const [writtingMode, setWrittingMode] = useState(false)
  const [userText, setUserText] = useState('')
  const [diff, setDiff] = useState(null)

  // To inject the content from API that comes in HTML
  // This is called dangerous HTML 
  const verseInHTML = {
    __html: passage.content
    //__html: '<span>This is some test text to test. To avoid so many API calls. Try to repeat it.</span>'
  }

  function getDiff() {
    const url = `/api/texts/compare`
    //console.log('url', url)

    const textoHTML = passage.content
    console.log('textoHTML', textoHTML)
    //const capturaTexto = 

    const body = { 
      bibleText: passagePlainText,
      userText: userText
     }
    
    axios.post(url, body)
      .then( res => {
        console.log('percentaje', res.data.percentage)
      })
      .catch( error => console.log(error))
  }

  return (
    <div className='App'>
      { readingMode && 
        <BibleVerse
          verseInHTML={verseInHTML}   
          modes={
            {
              setReadingMode,
              readingMode,
              setWrittingMode,
              writtingMode
            }
          } 
        /> 
      }

      { writtingMode && 
        <VerseForm 
          userText={userText}
          setUserText={setUserText}
          getDiff={getDiff}
        /> 
      }

    </div>
  )
}