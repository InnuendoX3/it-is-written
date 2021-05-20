import React, {createContext, useState} from 'react'

export const UserContext = createContext(null)

function UserProvider({children}) {

  const [userData, setUserData] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const contextValues = {
    userData,
    setUserData,
    isAuthenticated,
    setIsAuthenticated,
    isAdmin,
    setIsAdmin
  }

  return (
    <UserContext.Provider value={contextValues} >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider