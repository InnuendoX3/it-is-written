import React, { useState } from 'react'

import BibleVerse from './BibleVerse'
import VerseForm from './VerseForm'
import Results from './Results'

export default function Practice() {
  const [readingMode, setReadingMode] = useState(true)
  const [writtingMode, setWrittingMode] = useState(false)
  const [showResults, setShowResults] = useState(false)


  return (
    <div className='App'>
      { readingMode && 
        <BibleVerse
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