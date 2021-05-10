import React, {createContext, useState} from 'react'

export const BibleContext = createContext(null)

function BibleProvider({children}) {

  const [passage, setPassage] = useState(null)
  const [userText, setUserText] = useState('')
  const [textDiff, setTextDiff] = useState(null)

  const contextValues = {
    passage,
    setPassage,
    userText,
    setUserText,
    textDiff,
    setTextDiff
  }

  return (
    <BibleContext.Provider value={contextValues} >
      {children}
    </BibleContext.Provider>
  )
}

export default BibleProvider