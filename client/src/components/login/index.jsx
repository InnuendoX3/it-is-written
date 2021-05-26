import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

import UserKit from '../../data/UserKit'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default function Login(props) {
  const { setUserData, setIsAuthenticated, setIsAdmin } = useContext(UserContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  
  function loginUser(data) {
    const token = data.data.user.token
    const userInfo = data.data.user.user
    setTokenInStorage(token)
    setUserData(userInfo)
    setIsAuthenticated(true)
    setIsAdmin(userInfo.role === 'admin')
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
    <Form onSubmit={authenticateUser}>
      <Form.Group>
        <Form.Control type='email' value={email} onChange={handleEmail} placeholder='E-mail' required />
        <Form.Control type='password' value={password} onChange={handlePassword} placeholder='Password' required />
      </Form.Group>
      <Form.Group className='button_list_col'>
        <Button type="submit" variant="dark">Login</Button>
      </Form.Group>
      <p>{errorMessage}</p>
      <p className='t-center'>
        Don't have an account?
        <Link to='/register'> Register here.</Link>
      </p>
      

    </Form>
  )
}