import React, { useEffect, useState } from 'react'

import PassageKit from '../../data/PassageKit'
import FavouriteItem from './favouriteItem'

export default function Favourites(props) {
  const [favouriteList, setFavouriteList] = useState(null)

  useEffect(() => {
    PassageKit.getFavouriteList()
      .then( res => {
        setFavouriteList(res.data)
      })
      .catch( error => {
        console.log(error)
      })

  }, [])

  return (
    <div>
      { favouriteList && 
        favouriteList.map( (favourite, index) => {
          return <FavouriteItem key={index} favourite={favourite} history={props.history}  />
        }
      )}
    </div>
  )
}