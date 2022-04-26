import React, { useEffect, useState } from 'react'

let logoutTimer

function useAuth() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)
    const [expiration, setExpiration] = useState()

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

    return { token, user, logIn, logOut, updateUser }
}

export default useAuth