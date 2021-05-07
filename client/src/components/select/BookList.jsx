import React from 'react'
import axios from 'axios'

export default function BookList(props) {
  const { books, setBookSelected, setChapters, bibleSelected } = props

  function selectBook(book, e) {
    e.preventDefault()
    const abbr = bibleSelected.abbreviation
    
    setBookSelected(book)

    axios(`/api/bibles/${abbr}/books/${book.id}/chapters`)
      .then( res => setChapters(res.data.chapters))
      .catch( error => console.log(error))
  }

  return (
    <div className='little-spc'>
      { books.map( (book, index) => {
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
  )
}