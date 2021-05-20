import React, {useContext} from 'react'

import PassageKit from '../../data/PassageKit'
import { BibleContext } from '../../contexts/BibleContext'

export default function FavouriteItem(props) {
  const { setPassage } = useContext(BibleContext)
  const { bible, content, reference, _id, average } = props.favourite
  const shortedContent = shortContent(content)


  function shortContent(str) {
    const max = 120
    return (str.length > max) ? str.substr(0, max-1) + '...' : str;
  }

  function handleClick() {
    PassageKit.getFavourite(_id)
      .then( res => {
        console.log(res.data)
        setPassage(res.data)
        props.history.push('/practice')
      })
      .catch( error => {
        console.log(error)
      })
  }

  return (
    <div onClick={handleClick}>
      <p>{shortedContent}</p>
      <p>{reference} - average: {average}</p>

    </div>
  )
}