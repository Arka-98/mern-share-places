import React, { useEffect, useState } from 'react'

function useAuth() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [expiration, setExpiration] = useState()

    const logIn = (user, token, expiration) => {
        setUser(user)
        setToken(token)
        const tokenExpirationDate = expiration || new Date(new Date().getTime() + (1000*60*60))
        setExpiration(tokenExpirationDate)
        localStorage.setItem('userData', JSON.stringify({ user, token, expiration: tokenExpirationDate.toISOString() }))
    }
    const logOut = () => {
        setUser(null)
        setToken(null)
        setExpiration(null)
        localStorage.removeItem('userData')
    }
    const updateUser = (user) => {
        setUser(user)
        localStorage.clear()
        localStorage.setItem('userData', JSON.stringify({ user, token }))
    }

    return { token, user, expiration, logIn, logOut, updateUser }
}

export default useAuth