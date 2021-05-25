import React, { useContext } from 'react'

import { UserContext } from '../contexts/UserContext'

import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import UserKit from '../data/UserKit'

export default function NavigationBar() {
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
    <Navbar bg="dark" variant="dark" expand="md">

      <Navbar.Brand href='/'>It Is Written</Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          
          <Nav.Link href='/select'>Select Passage</Nav.Link>

          <Nav.Link href='/random'>Random Passage</Nav.Link>  

          { !isAuthenticated && 
              <Nav.Link href='/register'>Register</Nav.Link> 
          }
          { !isAuthenticated &&
              <Nav.Link href='/login'>Login</Nav.Link>
          }
          { isAuthenticated &&
              <Nav.Link href='/favourites'>My favourites</Nav.Link>
          }
          { isAdmin &&
              <Nav.Link href='/create'>Create</Nav.Link>
          }
          { isAuthenticated &&
              <Nav.Link href='/' onClick={logout}>Logout</Nav.Link>
          }
          { userData &&
              <Navbar.Brand>{userData.username}</Navbar.Brand>
          }

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}