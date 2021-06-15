import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router' 

import { BibleContext } from '../../contexts/BibleContext'
import PassageKit from '../../data/PassageKit'
import Button from 'react-bootstrap/Button'

export default function Random() {
  const { setPassage } = useContext(BibleContext)
  const [isLanguageSelected, setIsLanguageSelected] = useState(false)

  async function handleClick(langId) {
    await PassageKit.getRandom(langId)
      .then( res => {
        setPassage(res.data)
        setIsLanguageSelected(true)
      })
      .catch( error => console.log(error))      
  }

  return (
    <div className=''>
      <h3>Random passage</h3>

      <div className='button_list_col'>
        <Button variant='dark' onClick={() => handleClick(1)}>English</Button>
        <Button variant='dark' onClick={() => handleClick(2)}>Español</Button>  
      </div>

      { isLanguageSelected && 
        <Redirect to='/practice' />
      }

    </div> 
  )
}