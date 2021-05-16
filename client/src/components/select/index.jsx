import React, { useEffect, useState } from 'react'
import axios from 'axios'

import BibleList from './BibleList'
import BookList from './BookList'
import ChapterList from './ChapterList'
import VerseList from './VerseList'


export default function SelectPassage () {
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
    async function getBibles() {
      axios('/api/bibles')
        .then( res => setContent({...content, bibles: res.data}))
        .catch( error => console.log(error))
    }

    getBibles()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  const propsList = {content, setContent, selection, setSelection}

  return (
    <div className="App">

      { bibles && <BibleList {...propsList} /> }

      { books && <BookList {...propsList} /> }

      { chapters && <ChapterList {...propsList} /> }

      { verses && <VerseList {...propsList} isInitialVerseList={true} /> }

      { selection.initialVerse && <VerseList {...propsList} isFinalVerseList={true} /> }

    </div>
  )
}