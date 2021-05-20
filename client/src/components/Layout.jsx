import React, { useEffect, useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import UserKit from '../data/UserKit'

import Navbar from './Navbar'

export default function Layout({children}) {
  const { userData, setUserData } = useContext(UserContext)



  useEffect( () => {
    const token = UserKit.loadToken()

    async function reloadUserInfo() {
      await UserKit.getUserInfo()
        .then(data => {
          const userData = data.data
          console.log('data', data)
          setUserData(userData)
        })
        .catch(error => {
          console.log(error)
        })
    }

    if(!userData && token) {
      reloadUserInfo()
    }

  }, [])
  return (
    <div>
      <Navbar />
      <main className='little-spc'>
        {children}
      </main>
    </div>
  )
}