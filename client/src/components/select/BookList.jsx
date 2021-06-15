import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import PassageKit from '../../data/PassageKit'

export default function BookList(props) {
  const { content, setContent, selection, setSelection } = props 

  const [bookTitle, setBookTitle] = useState('Select book')
  const [isSelected, setIsSelected] = useState(false)


  async function selectBook(book, e) {
    e.preventDefault()
    const abbr = selection.bible.abbreviation
    
    setSelection({...selection, book: book})
    setBookTitle(book.name)
    setIsSelected(true)

    await PassageKit.getChapters(abbr, book.id)
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
        <div  className='botton_list'>
          { content.books.map( (book, index) => {
              return (
                <Button
                  variant="light"
                  key={index}
                  onClick={ e => selectBook(book, e)}
                >
                  {book.name}
                </Button>
              )
            })
          }            
        </div>
      }

    </div>
  )
}