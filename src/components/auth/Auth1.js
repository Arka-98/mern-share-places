import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AppContext from '../context/AppContext'

function Auth1() {
    const { isLoggedIn } = useContext(AppContext)
    return isLoggedIn ? <Navigate to='/profile' /> : <Outlet />
}

export default Auth1