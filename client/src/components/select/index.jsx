import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import { BibleContext } from '../../contexts/BibleContext'
import BibleList from './BibleList'
import BookList from './BookList'
import ChapterList from './ChapterList'
import VerseList from './VerseList'


export default function SelectPassage () {
  const {passage, setPassage} = useContext(BibleContext)

  const [bibles, setBibles] = useState(null)
  const [bibleSelected, setBibleSelected] = useState(null)
  const [books, setBooks] = useState(null)
  const [bookSelected, setBookSelected] = useState(null)
  const [chapters, setChapters] = useState(null)
  const [chapterSelected, setChapterSelected] = useState(null)
  const [verses, setVerses] = useState(null)
  const [initialVerse, setInitialVerse] = useState(null)
  const [finalVerse, setFinalVerse] = useState(null)



  useEffect(() => {
    console.log('UseEffect on mount!')
    function getBibles() {
      axios('/api/bibles')
      .then( res => {
        //console.log('res.data', res.data)
        setBibles(res.data)
      })
    }
    
    getBibles()
  }, [])

  useEffect(() => {
    console.log('useEffect finalVerse null')
    if(finalVerse) {
      console.log('useEffect finalVerse NO null')

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
  }, [finalVerse, bibleSelected, initialVerse, setPassage])

  function ShowPassageInfo() {
    const bibleInfo = bibleSelected ? bibleSelected.name : ''
    const passageInfo = passage ? passage.reference : ''

    return (
      <p>
        <span>{bibleInfo}</span> - <span>{passageInfo}</span>
      </p>
    )
  }

  const bibleListProps = {bibles, setBibleSelected, setBooks}
  const bookListProps = {books, setBookSelected, setChapters, bibleSelected}
  const chapterListProps = {chapters, setChapterSelected, setVerses, bibleSelected}
  const firstVerseListProps = {verses, setInitialVerse}
  const secondVerseListProps = {verses, setFinalVerse, initialVerse}

  return (
    <div className="App">

      <h1>Hello Father!!!</h1>

      { bibles &&  <BibleList {...bibleListProps} /> }

      { books && <BookList {...bookListProps} /> }

      { chapters &&  <ChapterList {...chapterListProps} /> }

      { verses &&  <VerseList {...firstVerseListProps} /> }

      { initialVerse && <VerseList {...secondVerseListProps} /> }

      <ShowPassageInfo />

      { passage && <Link to="/practice">Practice</Link> }

    </div>
  )
}