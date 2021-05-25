import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

export default function Intro() {
  const passage = '"This Book of the Law must not depart from your mouth. Meditate on it day and night so that you may act carefully according to all that is written in it."'
  const bible = 'English Standard Version'
  const reference = 'Joshua 1:8'
  const instructions = 'Read, memorize and write the passage back!'

  return (
    <Container>
      <h1><em>It Is Written</em></h1>
      <Container className='bible_text_container'>
          <div className='bible_text_content'>
            {passage}
          </div>
          <div className='bible_text_info'>
            <span>{bible}</span>
            <span>{reference}</span>
          </div>
        </Container>
      <h5>{instructions}</h5>
      <div>
      </div>
      <div className='button_list_col'>
        <Link className='btn btn-dark'  to="/select" >Select a Passage</Link>
        <Link className='btn btn-dark'  to="/random" >Random Passage</Link>
      </div>
      <div className='h_space alert alert-info t-center'>
        Log in to save your favourite passages.
      </div>

    </Container>
  )
}