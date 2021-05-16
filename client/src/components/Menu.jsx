import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu() {
  return (
    <menu>
      <NavLink to='/'>It Is Written</NavLink> - 
      <NavLink to='/select'>Select Passage</NavLink> -
      <NavLink to='/random'>Random Passage</NavLink>
    </menu>
  )
}