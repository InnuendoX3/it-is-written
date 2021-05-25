import React, { useState } from 'react'
import axios from 'axios'

import Button from 'react-bootstrap/Button'

export default function ChapterList(props) {
  const { content, setContent, selection, setSelection } = props 

  const [chapterNumberTitle, setChapterNumberTitle] = useState('Select chapter')
  const [isSelected, setIsSelected] = useState(false)

  function selectChapter(chapter, e) {
    e.preventDefault()
    const abbr = selection.bible.abbreviation

    setSelection({...selection, chapter: chapter})
    setChapterNumberTitle(`Chapter ${chapter.number}`)
    setIsSelected(true)

    axios(`/api/bibles/${abbr}/chapters/${chapter.id}/verses`)
      .then( res => setContent({...content, verses: res.data.verses}))
      .catch( error => console.log(error))
  }

  function handleOnTitleClick () {
    setContent({...content, verses: null})
    setSelection({...selection, initialVerse: null})
    setChapterNumberTitle('Select chapter')
    setIsSelected(false)
  }

  return (
    <div>
      <h3 onClick={handleOnTitleClick}>{chapterNumberTitle}</h3>

      { !isSelected &&
        <div className='botton_list'>
          { content.chapters.map( (chapter, index) => {
              return (
                <Button key={index} onClick={ e => selectChapter(chapter, e)} variant="light" >
                  {chapter.number}
                </Button>
              )
            })
          }
        </div>
      }

    </div>
  )
}