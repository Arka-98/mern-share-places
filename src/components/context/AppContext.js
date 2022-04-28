import React, { createContext, useEffect } from 'react'
import useAuth from '../hooks/useAuth'

let logoutTimer
const AppContext = createContext()

export function AppProvider({ children }) {
    const { token, user, expiration, logIn, logOut, updateUser } = useAuth()

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('userData'))
        if(data && data.token && (new Date(data.expiration) > new Date())) {
            logIn(data.user, data.token, new Date(data.expiration))
        }
    }, [])

    useEffect(() => {
        if(token && expiration) {
            logoutTimer = setTimeout(logOut, expiration - new Date())
        } else {
            clearTimeout(logoutTimer)
        }
    }, [token, expiration])

    return (
        <AppContext.Provider value={{ isLoggedIn: !!token, token, user, updateUser, logIn, logOut }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext