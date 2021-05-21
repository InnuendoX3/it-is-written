import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

export default function BibleList(props) {
  const { content, setContent, selection, setSelection } = props

  const [isSelected, setIsSelected] = useState(false)
  const [bibleTitle, setBibleTitle] = useState('Select Bible')

  function selectBible(bible, e) {
    e.preventDefault()
    const abbr = bible.abbreviation
    const url = `/api/bibles/${abbr}/books/`

    setSelection({
      bible: bible,
      book: null,
      chapter: null,
      initialVerse: null,
      finalVerse: null
    })
    setBibleTitle(bible.name)
    setIsSelected(true)
    
    axios(url)
      .then( res => {
        setContent({...content, books: res.data.books})
      })
      .catch( error => console.log(error))

  }

  function handleOnTitleClick() {
    setContent({...content, books: null, chapters: null, verses: null})
    setSelection({...selection, initialVerse: null})
    setIsSelected(false)
    setBibleTitle('Select Bible')
  }

  return (
    <div>
      <h3 onClick={handleOnTitleClick} >{bibleTitle}</h3>

      { !isSelected && 
        <div className='button_list_col'>
          { content.bibles.map( (bible, index) => {
              return (
                <Button
                  variant='dark'
                  key={index} 
                  onClick={ e => selectBible(bible, e)}
                > 
                  {bible.name} 
                </Button>
              )
            })
          }
        </div>
      }

    </div>
  )
}