import React, { useContext } from 'react'

import { NavLink } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

import UserKit from '../data/UserKit'

export default function Navbar() {
  const { 
    isAuthenticated, 
    setIsAuthenticated, 
    userData, 
    setUserData,
    isAdmin
  } = useContext(UserContext)

  function logout() {
    UserKit.removeToken()
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
      { isAuthenticated && <NavLink to='/favourites'>My favourites</NavLink>} -
      { isAdmin && <NavLink to='/create'>Create</NavLink> } -
      { userData && <span>{userData.username}</span> } -
      { isAuthenticated && <NavLink to='/' onClick={logout}>Logout</NavLink>}

    </nav>
  )
}