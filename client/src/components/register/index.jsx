import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import User from '../../data/User'

export default function Register(props) {
  const { setUserData, setIsAuthenticated } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  function controlPassword() {
    setErrorMessage('Good!')
    
    if(password !== passwordConfirmation) {
      setPassword('')
      setPasswordConfirmation('')
      return setErrorMessage('Passwords does not match, try again')
    }

    if(password.length < 6) {
      setPassword('')
      setPasswordConfirmation('')
      return setErrorMessage('Password must contain at least 6 characters')
    }
    
    return true
  }

  function createUser() {
    User.register(username, email, password)
      .then( data => {
        loginUser(data)
      })
      .catch( error => {
        console.log(error)
        setErrorMessage(error.response.data.message)
      })
  }

  function loginUser(data) {
    const token = data.data.user.token
    const userInfo = data.data.user.user
    setTokenInStorage(token)
    setUserData(userInfo)
    setIsAuthenticated(true)
    setErrorMessage('')
    props.history.push('/')
  }

  function setTokenInStorage(token) {
    User.saveToken(token)
  }

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handleEmail(e) {
    setEmail(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  function handlePasswordConfirmation(e) {
    setPasswordConfirmation(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrorMessage('')
    const isGoodPassword = controlPassword()
    if (isGoodPassword) {
      createUser()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={username} onChange={handleUsername} placeholder='Username' required />
      <input type='email' value={email} onChange={handleEmail} placeholder='E-mail' required />
      <input type='password' value={password} onChange={handlePassword} placeholder='Password' required />
      <input type='password' value={passwordConfirmation} onChange={handlePasswordConfirmation} placeholder='Confirm Password' required />
      <input type="submit" value="Create user" />
      <p>{errorMessage}</p>
    </form>
  )
}