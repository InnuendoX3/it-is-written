import React from 'react'

export default function VerseList(props) {
  const { verses, setInitialVerse, setFinalVerse, initialVerse } = props
  let verseList = verses

  if( initialVerse ) {
    verseList = listFromInitialVerse()
  }
  
  function listFromInitialVerse () {
    const indexNumber = verses.map( verse => verse.number).indexOf(initialVerse.number)
    return verses.slice(indexNumber )
  }
  
  function selectVerse(verse, e) {
    e.preventDefault()
    if(initialVerse) {
      setFinalVerse(verse)
    } else {
      setInitialVerse(verse)
    } 
  }

  return (
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
  )
}