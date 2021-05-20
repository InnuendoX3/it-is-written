import React, { useEffect, useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import UserKit from '../data/UserKit'

import Navbar from './Navbar'

export default function Layout({children}) {
  const { userData, setUserData, setIsAuthenticated } = useContext(UserContext)



  useEffect( () => {
    const token = UserKit.loadToken()

    if(!userData && token) {
      reloadUserInfo()
    }

    async function reloadUserInfo() {
      await UserKit.getUserInfo()
        .then(data => {
          const userData = data.data
          console.log('data', data)
          setUserData(userData)
          setIsAuthenticated(true)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Navbar />
      <main className='little-spc'>
        {children}
      </main>
    </div>
  )
}