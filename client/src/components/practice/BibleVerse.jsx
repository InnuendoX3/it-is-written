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


  function handleClick() {
    setReadingMode(!readingMode)
    setWrittingMode(!writtingMode)
  }
  
  function setFavourite() {
    PassageKit.saveFavourite(passage)
      .then( data => {
        const passageSaved = data.data.body
        setPassage(passageSaved)
        setIsFavourite(passageSaved.isFavourite)
      })
      .catch( error => {
        console.log(error)
      })  
  }

  function unsetFavourite() {
    PassageKit.deleteFavourite(passage._id)
      .then( data => {
        if (data.status === 200) {
          setIsFavourite(false)
        }
      })
      .catch( error => {
        console.log(error)
      }) 
  }

  useEffect(() => {
    // Avoid error when refreshing page
    if( !passage ) {
      props.history.push('/')
    } else {
      setIsFavourite(passage.isFavourite)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <div className='little-spc'>
      { passage && <p>{passage.content}</p>}
      <button onClick={handleClick} >I'm ready!</button>
      { !isFavourite &&
        <button onClick={setFavourite} >Add as favourite</button>
      }
      { isFavourite &&  
        <button onClick={unsetFavourite} >Delete from favourite</button>
      }
    </div>
  )
}