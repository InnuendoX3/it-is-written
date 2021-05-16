import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router' 
import axios from 'axios'

import { BibleContext } from '../../contexts/BibleContext'

export default function Random() {
  const { setPassage } = useContext(BibleContext)
  const [isLanguageSelected, setIsLanguageSelected] = useState(false)

  async function handleClick(langId) {
    const url = `/api/passages/random/?language=${langId}`
    await axios(url)
      .then( res => {
        setPassage(res.data)
        setIsLanguageSelected(true)
      })
      .catch( error => console.log(error))
  }

  return (
    <div className='App'>
      <p>Practice with a random passage</p>

      <button onClick={() => handleClick(1)}>English</button>
      <button onClick={() => handleClick(2)}>Español</button>

      { isLanguageSelected && 
        <Redirect to='/practice' />
      }

    </div> 
  )
}