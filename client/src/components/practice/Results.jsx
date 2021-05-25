import React, { useContext } from 'react'

import { BibleContext } from '../../contexts/BibleContext'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


export default function Results(props) {
  const { passage, userText, setUserText, textDiff } = useContext(BibleContext)
  const { setReadingMode, setWrittingMode, setShowResults } = props.modes
  
  function handleTryAgain(e) {
    e.preventDefault()

    setUserText('')

    setReadingMode(true)
    setWrittingMode(false)
    setShowResults(false)

  }
  
  return (
    <div>
      
      <Container className='bible_text_container'>
        <div className='bible_text_content'>
          {passage.content}
        </div>
        <div className='bible_text_info'>
          <span>{passage.bible}</span>
          <span>{passage.reference}</span>
        </div>
      </Container>
      
      <p className='t-center'><strong>Your text</strong></p>
      <p className='results_texts'>{userText}</p>

      <div className='button_list_col'>
        { textDiff &&  <p className='alert alert-dark t-center'>{ textDiff.percentage } % similar</p> }
        <Button variant='dark' onClick={handleTryAgain}>Try again</Button>
      </div>
    </div>
  )
}