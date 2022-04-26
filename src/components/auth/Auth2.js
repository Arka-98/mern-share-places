import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import AppContext from '../context/AppContext'

function Auth2() {
    const { isLoggedIn } = useContext(AppContext)
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default Auth2