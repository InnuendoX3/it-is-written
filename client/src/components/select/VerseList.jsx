import React, { useState, useContext } from 'react'
import { Redirect } from 'react-router'

import Button from 'react-bootstrap/Button'

import { BibleContext } from '../../contexts/BibleContext'
import PassageKit from '../../data/PassageKit'

export default function VerseList(props) {
  const { setPassage } = useContext(BibleContext)
  
  const { content, selection, setSelection, isInitialVerseList, isFinalVerseList } = props
  const { initialVerse } = selection

  const [verseNumberTitle, setVerseNumberTitle] = useState(getTitle())
  const [isSelected, setIsSelected] = useState(false)
  const [hasSelectedLastVerse, setHasSelectedLastVerse] = useState(false)
  

  let verseList = content.verses


  if( isFinalVerseList ) {
    verseList = listFromInitialVerse()
  }
  
  function getTitle() {
    const initialVerseTitle = 'Select initial verse'
    const finalalVerseTitle = 'Select final verse'
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
      setVerseNumberTitle(`From verse ${verse.number}`)
      setIsSelected(true)
    } else {
      setSelection({...selection, finalVerse: verse})
      // ToDo: Use getPassage with the finalVerse from State Selection ?
      getPassage(verse)
    } 
  }

  async function getPassage(finalVerse2) {
    const abbr = selection.bible.abbreviation
    const initialVerseId = initialVerse.id
    const finalVerseId = finalVerse2.id

    await PassageKit.getPassage(abbr, initialVerseId, finalVerseId)
      .then( res => {
        setPassage(res.data)
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
        <div className='botton_list'>
          { verseList.map( (verse, index) => {
              return (
                <Button key={index} onClick={ e => selectVerse(verse, e)} variant="light">
                  {verse.number}
                </Button>
              )
            })        
          }
        </div>
      }
      
      { hasSelectedLastVerse && <Redirect to='/practice' /> }

    </div>
  )
}