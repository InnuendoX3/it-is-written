import React, { useEffect, useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import UserKit from '../data/UserKit'

import NavigationBar from './Navbar'

import Container from 'react-bootstrap/Container'

export default function Layout({children}) {
  const { userData, setUserData, setIsAuthenticated, setIsAdmin } = useContext(UserContext)



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
          setIsAdmin(userData.role === 'admin')
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <NavigationBar />
      <Container className='h_space'>
        {children}
      </Container>
    </div>
  )
}