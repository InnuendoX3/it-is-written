import React from 'react'

import Routes from './components/routes'
import BibleProvider from './contexts/BibleContext'
import UserProvider from './contexts/UserContext'

import 'bootswatch/dist/morph/bootstrap.min.css'
import './App.css';

function App() {

  return (
    <>
      <UserProvider>
      <BibleProvider>
        <Routes />
      </BibleProvider>
      </UserProvider>
    </>
  )
}

export default App;
