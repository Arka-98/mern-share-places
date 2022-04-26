import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function PageLayout() {
  return (
    <>
        <Navbar />
        <div className='w-10/12 mx-auto my-10'>
            <Outlet/>
        </div>
    </>
  )
}

export default PageLayout