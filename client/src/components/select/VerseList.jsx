import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'

import { BibleContext } from '../../contexts/BibleContext'

export default function VerseList(props) {
  const { setPassage } = useContext(BibleContext)
  
  const { content, setContent, selection, setSelection, isInitialVerseList, isFinalVerseList } = props
  const { initialVerse, finalVerse } = selection

  const [verseNumberTitle, setVerseNumberTitle] = useState(getTitle())
  const [isSelected, setIsSelected] = useState(false)
  const [hasSelectedLastVerse, setHasSelectedLastVerse] = useState(false)
  

  let verseList = content.verses


  if( isFinalVerseList ) {
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
      setVerseNumberTitle(`From verse nr. ${verse.number}`)
      setIsSelected(true)
    } else {
      setSelection({...selection, finalVerse: verse})
      getPassage(verse)
    } 
  }

  function getPassage(finalVerse2) {
    const abbr = selection.bible.abbreviation
    const initialVerseId = initialVerse.id
    const finalVerseId = finalVerse2.id

    const url = `/api/bibles/${abbr}/passages/${initialVerseId}-${finalVerseId}`
    
    axios(url)
      .then( res => {
        console.log('res.data.passage axios', res.data.passage)
        setPassage(res.data.passage)
        setHasSelectedLastVerse(true)
      })
      .catch( error => console.log(error))
  }

  function handleOnTitleClick() {
    setIsSelected(false)
  }

  return (
    <div>
      <h3 onClick={handleOnTitleClick}>{verseNumberTitle}</h3>

      { !isSelected &&
        <div className='little-spc'>
          { verseList.map( (verse, index) => {
              return (
                <button key={index} onClick={ e => selectVerse(verse, e)}>
                  {verse.number}
                </button>
              )
            })        
          }
        </div>
      }
      
      { hasSelectedLastVerse && <Redirect to='/practice' /> }

    </div>
  )
}