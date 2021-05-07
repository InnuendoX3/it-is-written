import React from 'react'
import axios from 'axios'

export default function ChapterList(props) {
  const { chapters, setChapterSelected, setVerses, bibleSelected } = props

  function selectChapter(chapter, e) {
    e.preventDefault()
    const abbr = bibleSelected.abbreviation

    setChapterSelected(chapter)

    axios(`/api/bibles/${abbr}/chapters/${chapter.id}/verses`)
      .then( res => setVerses(res.data.verses))
      .catch( error => console.log(error))
  }

  return (
    <div className='little-spc'>
      { chapters.map( (chapter, index) => {
          return (
            <button key={index} onClick={ e => selectChapter(chapter, e)} >
              {chapter.number}
            </button>
          )
        })

      }
    </div>
  )
}