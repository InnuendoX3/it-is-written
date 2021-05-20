import React, { useState, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

import User from '../../data/User'

export default function Register() {
  const {userData, setUserData} = useContext(UserContext)

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
      User.register(username, email, password)
        .then( data => {
          setUserData(data.data.user.user)
          User.saveToken(data.data.user.token)
        })
        .catch( error => {
          console.log(error)
          setErrorMessage(error.response.data.message)
        })

      

    }


  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={username} onChange={handleUsername} required />
      <input type='email' value={email} onChange={handleEmail} required />
      <input type='password' value={password} onChange={handlePassword} required />
      <input type='password' value={passwordConfirmation} onChange={handlePasswordConfirmation} required />
      <input type="submit" value="Create user" />
      <p>{errorMessage}</p>
    </form>
  )
}