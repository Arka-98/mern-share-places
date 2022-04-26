import React, { createContext } from 'react'
import useAuth from '../hooks/useAuth'

const AppContext = createContext()

export function AppProvider({ children }) {
    const { token, user, logIn, logOut, updateUser } = useAuth()
    return (
        <AppContext.Provider value={{ isLoggedIn: !!token, token, user, updateUser, logIn, logOut }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext