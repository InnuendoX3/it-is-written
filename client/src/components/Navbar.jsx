import React, { useContext } from 'react'

import { NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

import User from '../data/User'

export default function Navbar() {
  const { isAuthenticated, setIsAuthenticated, userData, setUserData } = useContext(UserContext)

  function logout() {
    User.removeToken()
    setIsAuthenticated(false)
    setUserData(null)
  }

  return (
    <nav>
      <NavLink to='/'>It Is Written</NavLink> - 
      <NavLink to='/select'>Select Passage</NavLink> -
      <NavLink to='/random'>Random Passage</NavLink> -
      { !isAuthenticated && <NavLink to='/register'>Register</NavLink> } -
      { !isAuthenticated && <NavLink to='/login'>Login</NavLink> } -
      { userData && <span>{userData.username}</span> } -
      { isAuthenticated && <NavLink to='/' onClick={logout}>Logout</NavLink>}

    </nav>
  )
}