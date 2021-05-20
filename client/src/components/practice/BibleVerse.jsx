import React, { useContext, useState, useEffect } from 'react'
import { BibleContext } from '../../contexts/BibleContext'

import PassageKit from '../../data/PassageKit'

export default function BibleVerse(props) {
  const { passage, setPassage } = useContext(BibleContext)

  const [isFavourite, setIsFavourite] = useState(false)
  
  const { 
    setReadingMode,
    readingMode,
    setWrittingMode,
    writtingMode
  } = props.modes

  function handleFavouritePassageInfo(data) {
    const passageSaved = data.data.body
    setPassage(passageSaved)
    setIsFavourite(passageSaved.isFavourite)
  }

  function handleClick() {
    setReadingMode(!readingMode)
    setWrittingMode(!writtingMode)
  }
  
  function handleFavourite() {
    console.log('passage', passage)
    PassageKit.saveFavourite(passage)
      .then( data => {
        handleFavouritePassageInfo(data)
        //setPassage()
      })

    
  }

  useEffect(() => {
    // Avoid error when refreshing page
    if( !passage ) {
      props.history.push('/')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className='little-spc'>
      { passage && <p>{passage.content}</p>}
      <button onClick={handleClick} >I'm ready!</button>
      { !isFavourite &&
        <button onClick={handleFavourite} >Add as favourite</button>
      }
      { isFavourite &&  
        <button onClick={handleFavourite} >Delete from favourite</button>
      }
    </div>
  )
}