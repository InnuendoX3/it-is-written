import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { BibleContext } from '../../contexts/BibleContext'
import BibleList from './BibleList'
import BookList from './BookList'
import ChapterList from './ChapterList'
import VerseList from './VerseList'


export default function SelectPassage () {
  const { setUserText } = useContext(BibleContext)

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
    console.log('Select useEffect activated (by content or setUserText?)')
    async function getBibles() {
      axios('/api/bibles')
        .then( res => setContent({...content, bibles: res.data}))
        .catch( error => console.log(error))
    }

    getBibles()
    setUserText('') // Reset user text
  }, []) // eslint-disable-line react-hooks/exhaustive-deps



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

      {/* passage && <Link to="/practice">Practice</Link> */}

    </div>
  )
}