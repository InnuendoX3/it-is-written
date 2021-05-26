import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

export default function Intro() {
  const passage = '"This Book of the Law must not depart from your mouth. Meditate on it day and night so that you may act carefully according to all that is written in it."'
  const instructions = 'Read, memorize and write the passage again.'

  return (
    <Container>
      <h1 className='app_name'>It Is Written</h1>
      <Container className='bible_text_container'>
          <div className='bible_text_intro'>
            {passage}
          </div>
        </Container>
      <h5>{instructions}</h5>
      <div>
      </div>
      <div className='button_list_col'>
        <Link className='btn btn-dark'  to="/select" >Select a Passage</Link>
        <Link className='btn btn-dark'  to="/random" >Random Passage</Link>
      </div>
      <div className='h_space alert alert-dark t-center'>
        <Link to='/login'>Log in</Link> to save your favourite passages.
      </div>

    </Container>
  )
}