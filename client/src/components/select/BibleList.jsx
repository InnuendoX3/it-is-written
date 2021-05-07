import React from 'react'
import axios from 'axios'

export default function BibleList(props) {
  const { bibles, setBibleSelected, setBooks } = props

  function selectBible(bible, e) {
    e.preventDefault()
    const abbr = bible.abbreviation

    setBibleSelected(bible)
    
    axios(`/api/bibles/${abbr}/books/`)
      .then( res => setBooks(res.data.books))
      .catch( error => console.log(error))

  }

  return (
    <div className='little-spc'>
      { bibles.map( (bible, index) => {
          return (
            <button 
              key={index} 
              onClick={ e => selectBible(bible, e)}
            > 
              {bible.name} 
            </button>
          )
        })
      }
    </div>
  )
}