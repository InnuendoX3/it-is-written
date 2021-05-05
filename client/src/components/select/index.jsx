import React, { useEffect, useState } from 'react'
import axios from 'axios'


export default function SelectPassage () {

  const [bibles, setBibles] = useState(null)
  const [testVerse, setTestVerse] = useState(null)

  const verseInHTML = () => {
    return {
      __html: testVerse
    }
  }

  const handleClick = (abbr, e) => {
    e.preventDefault()
    axios(`/api/bibles/${abbr}/verses/JHN.14.15`)
      .then( res => setTestVerse(res.data.verse.content))
      .catch( error => console.log(error))

  }

  useEffect(() => {
    const getBibles = () => {
      axios('/api/bibles')
      .then( res => {
        //console.log('res.data', res.data)
        setBibles(res.data)
      })
    }

    getBibles()
  }, [])

  return (
    <div className="App">
      <h1>Hello Father!!!</h1>
      { bibles && bibles.map( (bible, index) => {
        return <button key={index} onClick={ e => handleClick(bible.abbreviation, e)}> {bible.name} </button>
      }) }

      {
        testVerse && 
          <p dangerouslySetInnerHTML={verseInHTML()} />
      }
    </div>
  );
}