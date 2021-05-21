import React, { useState, useEffect, useContext } from 'react'

import { BibleContext } from '../../contexts/BibleContext'

import BibleVerse from './BibleVerse'
import VerseForm from './VerseForm'
import Results from './Results'

export default function Practice(props) {
  const { setUserText } = useContext(BibleContext)

  const [readingMode, setReadingMode] = useState(true)
  const [writtingMode, setWrittingMode] = useState(false)
  const [showResults, setShowResults] = useState(false)


  useEffect(() => {
    setUserText('') //Reset textarea from old userText
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=''>
      { readingMode && 
        <BibleVerse
          modes={
            {
              setReadingMode,
              readingMode,
              setWrittingMode,
              writtingMode,
            }
          }
          history={props.history}
        /> 
      }

      { writtingMode && 
        <VerseForm 
          modes={
            {
              setShowResults,
              setWrittingMode
            }
          }
        />
      }

      { showResults &&
        <Results 
          modes={
            {
              setReadingMode,
              setWrittingMode,
              setShowResults
            }
          } 
        />

      }

    </div>
  )
}