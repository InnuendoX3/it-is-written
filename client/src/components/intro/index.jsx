import React from 'react'
import { Link } from 'react-router-dom'

import Container from 'react-bootstrap/Container'

export default function Intro() {

  return (
    <Container className=''>
      <h1><em>It Is Written</em></h1>
      <p>"This Book of the Law must not depart from your mouth. Meditate on it day and night so that you may act carefully according to all that is written in it."</p>
      <h4>Read, retain and write</h4>
      <div>
        <Link className='f-cen-cen badge badge-dark'  to="/select" >Let's practice</Link>
      </div>
    </Container>
  )
}