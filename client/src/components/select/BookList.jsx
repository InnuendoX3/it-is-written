import React, { useState } from 'react'
import axios from 'axios'

export default function BookList(props) {
  const { content, setContent, selection, setSelection } = props 

  const [bookTitle, setBookTitle] = useState('Select book')
  const [isSelected, setIsSelected] = useState(false)


  function selectBook(book, e) {
    e.preventDefault()
    const abbr = selection.bible.abbreviation
    const url = `/api/bibles/${abbr}/books/${book.id}/chapters`
    
    setSelection({...selection, book: book})
    setBookTitle(book.name)
    setIsSelected(true)

    axios(url)
      .then( res => setContent({...content, chapters: res.data.chapters}))
      .catch( error => console.log(error))
  }

  function handleOnTitleClick() {
    setContent({...content, chapters: null, verses: null})
    setSelection({...selection, initialVerse: null})
    setBookTitle('Select book')
    setIsSelected(false)
  }

  return (
    <div>
      <h3 onClick={handleOnTitleClick} >{bookTitle}</h3>

      { !isSelected &&
        <div  className='little-spc'>
          { content.books.map( (book, index) => {
              return (
                <button 
                  key={index}
                  onClick={ e => selectBook(book, e)}
                >
                  {book.name}
                </button>
              )
            })
          }            
        </div>
      }

    </div>
  )
}