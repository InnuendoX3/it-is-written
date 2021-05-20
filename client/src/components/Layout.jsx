import React, { useEffect, useContext } from 'react'

import { UserContext } from '../contexts/UserContext'
import UserKit from '../data/UserKit'

import Navbar from './Navbar'

export default function Layout({children}) {
  const { userData } = useContext(UserContext)

  useEffect(() => {
    const token = UserKit.loadToken
    if(!userData && token) {
      console.log('TODO: Refreshed page lost the user on Context')
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