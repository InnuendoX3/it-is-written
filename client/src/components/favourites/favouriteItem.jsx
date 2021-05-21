import React, {useContext} from 'react'

import PassageKit from '../../data/PassageKit'
import { BibleContext } from '../../contexts/BibleContext'

import Container from 'react-bootstrap/Container'

export default function FavouriteItem(props) {
  const { setPassage } = useContext(BibleContext)
  const { content, reference, _id, average } = props.favourite

  const shortedContent = shortContent(content)
  const averageRound = Math.round(average)


  function shortContent(str) {
    const max = 120
    return (str.length > max) ? str.substr(0, max-1) + '...' : str;
  }

  function handleClick() {
    PassageKit.getFavourite(_id)
      .then( res => {
        setPassage(res.data)
        props.history.push('/practice')
      })
      .catch( error => {
        console.log(error)
      })
  }

  return (
    <Container>
      <div className='card fav_item' onClick={handleClick}>
        <div className='card-body'>
          <p>{shortedContent}</p>
          <div className='buttons_horizontal'>
            <span>{reference}</span> 
            <span>Average: {averageRound}%</span>
          </div>
        </div>
      </div>
    </Container>
  )
}