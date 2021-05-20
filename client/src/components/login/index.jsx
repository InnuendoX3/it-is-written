import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import UserKit from '../../data/UserKit'

export default function Login(props) {
  const { setUserData, setIsAuthenticated } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  
  function loginUser(data) {
    console.log(data.data.user)
    const token = data.data.user.token
    const userInfo = data.data.user.user
    setTokenInStorage(token)
    setUserData(userInfo)
    setIsAuthenticated(true)
    setErrorMessage('')
    props.history.push('/')
  }

  function setTokenInStorage(token) {
    UserKit.saveToken(token)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function authenticateUser(e) {
    e.preventDefault()
    UserKit.login(email, password)
      .then( data => {
        loginUser(data)
      })
      .catch( error => {
        console.log(error)
        setErrorMessage(error.response.data.message)
      })
  }

  return (
    <form onSubmit={authenticateUser}>
      <input type='email' value={email} onChange={handleEmail} placeholder='E-mail' required />
      <input type='password' value={password} onChange={handlePassword} placeholder='Password' required />
      <input type="submit" value="Login" />
      <p>{errorMessage}</p>
    </form>
  )
}