import React, { useState, useEffect } from 'react'

export default function VerseList(props) {
  //const { verses, setInitialVerse, setFinalVerse, initialVerse } = props
  const { content, setContent, selection, setSelection, isInitialVerseList, isFinalVerseList } = props
  const { initialVerse } = selection

  const [verseNumberTitle, setverseNumberTitle] = useState(getTitle())
  const [isSelected, setIsSelected] = useState(false)

  let verseList = content.verses



  if( isFinalVerseList ) {
    console.log('entra al if preguntando si verseListType es final')
    verseList = listFromInitialVerse()
  }
  
  function getTitle() {
    const initialVerseTitle = 'Select initial verse number'
    const finalalVerseTitle = 'Select final verse number'
    return isInitialVerseList ? initialVerseTitle : finalalVerseTitle
  }

  function listFromInitialVerse () {
    const indexNumber = content.verses.map( verse => verse.number).indexOf(initialVerse.number)
    return content.verses.slice(indexNumber )
  }
  
  function selectVerse(verse, e) {
    e.preventDefault()

    if(isInitialVerseList) {
      setSelection({...selection, initialVerse: verse})
    } else {
      setSelection({...selection, finalVerse: verse})
    } 
  }

  function handleOnTitleClick() {
    console.log('noting')
  }

  useEffect(() => {

  }, [initialVerse])

  return (
    <div className='little-spc'>
      <h3 onClick={handleOnTitleClick}>{verseNumberTitle}</h3>

      { verseList.map( (verse, index) => {
          return (
            <button key={index} onClick={ e => selectVerse(verse, e)}>
              {verse.number}
            </button>
          )
        })        
      }
    </div>
  )
}