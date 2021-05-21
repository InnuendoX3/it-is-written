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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">

        <NavLink className="navbar-brand" to='/'>It Is Written</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarColor01">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to='/select'>Select Passage</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to='/random'>Random Passage</NavLink>  
            </li>

            { !isAuthenticated && 
              <li className="nav-item">
                <NavLink className="nav-link" to='/register'>Register</NavLink> 
              </li>
            }
            { !isAuthenticated &&
              <li className="nav-item">            
                <NavLink className="nav-link" to='/login'>Login</NavLink>
              </li>
            }
            { isAuthenticated &&
              <li className="nav-item"> 
                <NavLink className="nav-link" to='/favourites'>My favourites</NavLink>
              </li>
            }
            { isAdmin &&
              <li className="nav-item"> 
                <NavLink className="nav-link" to='/create'>Create</NavLink>
              </li>
            }
            { userData &&
              <li className="nav-item"> 
                <span>{userData.username}</span>
              </li>
            }
            { isAuthenticated &&
              <li className="nav-item">
                <NavLink className="nav-link" to='/' onClick={logout}>Logout</NavLink>
              </li>
            }

          </ul>
        </div>
      </div>
    </nav>
  )
}