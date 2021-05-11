import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { BibleContext } from '../../contexts/BibleContext'
import BibleList from './BibleList'
import BookList from './BookList'
import ChapterList from './ChapterList'
import VerseList from './VerseList'


export default function SelectPassage () {
  const {passage, setPassage} = useContext(BibleContext)

  //const [bibles, setBibles] = useState(null)
  //const [bibleSelected, setBibleSelected] = useState(null)
  //const [books, setBooks] = useState(null)
  //const [bookSelected, setBookSelected] = useState(null)
  //const [chapters, setChapters] = useState(null)
  //const [chapterSelected, setChapterSelected] = useState(null)
  //const [verses, setVerses] = useState(null)
  //const [initialVerse, setInitialVerse] = useState(null)
  //const [finalVerse, setFinalVerse] = useState(null)

  const [selection, setSelection] = useState(
    {
      bible: null,
      book: null,
      chapter: null,
      initialVerse: null,
      finalVerse: null
    }
  )

  const [content, setContent] = useState(
    {
      bibles: null,
      books: null,
      chapters: null,
      verses: null
    }
  )

  const { bibles, books, chapters, verses } = content



  useEffect(() => {
    function getBibles() {
      axios('/api/bibles')
        .then( res => setContent({...content, bibles: res.data}))
        .catch( error => console.log(error))
    }
    
    getBibles()
  }, [])

  useEffect(() => {
    console.log('selection', selection)
    console.log('content', content)
  }, [selection, content])

/*   useEffect(() => {
    if(finalVerse) {

      function getPassage() {
        const abbr = bibleSelected.abbreviation
        const initialVerseId = initialVerse.id
        const finalVerseId = finalVerse.id
    
        const url = `/api/bibles/${abbr}/passages/${initialVerseId}-${finalVerseId}`
        
        axios(url)
          .then( res => {
            console.log('res.data.passage axios', res.data.passage)
            setPassage(res.data.passage)
          })
          .catch( error => console.log(error))
      }

      getPassage()
    }
  }, [finalVerse, bibleSelected, initialVerse, setPassage]) */

/*   function ShowPassageInfo() {
    const bibleInfo = bibleSelected ? bibleSelected.name : ''
    const passageInfo = passage ? passage.reference : ''

    return (
      <p>
        <span>{bibleInfo}</span> - <span>{passageInfo}</span>
      </p>
    )
  } */

  const propsList = {content, setContent, selection, setSelection}

  return (
    <div className="App">

      <h1>Hello Father!!!</h1>

      { bibles && <BibleList {...propsList} /> }

      { books && <BookList {...propsList} /> }

      { chapters && <ChapterList {...propsList} /> }

      { verses && <VerseList {...propsList} isInitialVerseList={true} /> }

      { selection.initialVerse && <VerseList {...propsList} isFinalVerseList={true} /> }

      {/* <ShowPassageInfo /> */}

      { passage && <Link to="/practice">Practice</Link> }

    </div>
  )
}