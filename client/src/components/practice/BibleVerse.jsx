import React, { useContext, useState, useEffect } from 'react'
import { BibleContext } from '../../contexts/BibleContext'
import { UserContext } from '../../contexts/UserContext'

import PassageKit from '../../data/PassageKit'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default function BibleVerse(props) {
  const { passage, setPassage } = useContext(BibleContext)
  const { isAuthenticated } = useContext(UserContext)

  const [isFavourite, setIsFavourite] = useState(false)

  const instructions = 'Memorize the Bible text'
  
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
        console.log(error.response)
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
        <Container className='bible_text_container'>
          <div className='bible_text_content'>
            {passage.content}
          </div>
          <div className='bible_text_info'>
            <span>{passage.bible}</span>
            <span>{passage.reference}</span>
          </div>
        </Container>
      }
      <p className='t-center'>{instructions}</p>
      <Container className='button_list_col'>
        <Button variant='dark' onClick={handleClick} >I'm ready!</Button>
        { isAuthenticated && 
          <>
            { !isFavourite &&
              <Button variant='light' onClick={setFavourite} >Add as favourite</Button>
            }
            { isFavourite &&  
              <Button variant='danger' onClick={unsetFavourite} >Delete from favourite</Button>
            }
          </>
        }
      </Container>
    </div>
  )
}