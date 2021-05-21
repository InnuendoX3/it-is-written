import React, { useContext, useState, useEffect } from 'react'
import { BibleContext } from '../../contexts/BibleContext'

import PassageKit from '../../data/PassageKit'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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
      { passage && 
        <Container className='bible_text'>{passage.content}</Container>
      }
      <Container className='buttons_horizontal'>
        { !isFavourite &&
          <Button variant="light" onClick={setFavourite} >Add as favourite</Button>
        }
        { isFavourite &&  
          <Button variant="warning" onClick={unsetFavourite} >Delete from favourite</Button>
        }
        <Button onClick={handleClick} >I'm ready!</Button>
      </Container>
    </div>
  )
}