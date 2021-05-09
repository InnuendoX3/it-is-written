import React, {createContext, useState} from 'react'

export const BibleContext = createContext(null)

function BibleProvider({children}) {

  const [passage, setPassage] = useState(null)
  const [passagePlainText, setPassagePlainText] = useState(null)

  const contextValues = {
    passage,
    setPassage,
    passagePlainText,
    setPassagePlainText
  }

  return (
    <BibleContext.Provider value={contextValues} >
      {children}
    </BibleContext.Provider>
  )
}

export default BibleProvider