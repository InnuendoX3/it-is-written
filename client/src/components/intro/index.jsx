import React from 'react'
import { Link } from 'react-router-dom'

export default function Intro() {
  return (
    <div className='App'>
      <h1>This is the intro page</h1>
      <p>"This Book of the Law must not depart from your mouth. Meditate on it day and night so that you may act carefully according to all that is written in it."</p>
      <p>Read, retain and write</p>
      <Link to="/select" >Start</Link>
    </div>
  )
}