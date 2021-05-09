import React from 'react'

import Routes from './components/routes'
import BibleProvider from './contexts/BibleContext'

import './App.css';

function App() {

  return (
    <>
      <BibleProvider>
        <Routes />
      </BibleProvider>
    </>
  )
}

export default App;
