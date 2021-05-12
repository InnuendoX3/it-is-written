import React, { useContext } from 'react'
import axios from 'axios'

import { BibleContext } from '../../contexts/BibleContext'


export default function VerseForm(props) {
  const { passage, userText, setUserText, setTextDiff } = useContext(BibleContext)
  const { setWrittingMode, setShowResults } = props.modes

  function getDiff() {
    const url = `/api/texts/compare`

    const body = { 
      bibleText: passage.content,
      userText: userText
     }
    
    axios.post(url, body)
      .then( res => {
        return setTextDiff(res.data)
      })
      .catch( error => console.log(error))
  }
  
  function handleOnChange(e) {
    setUserText(e.target.value)
  }

  function handleCompare(e) {
    e.preventDefault()
    getDiff()
    setWrittingMode(false)
    setShowResults(true)
  }

  return (
    <form className="little-spc">
      <textarea name="" id="" cols="70" rows="8" onChange={ e => handleOnChange(e)} value={userText} />
      <div>
        <button onClick={handleCompare}>Let's check!</button>
      </div>
    </form>
  )
}