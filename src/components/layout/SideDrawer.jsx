import React from 'react'
import { createPortal } from 'react-dom'

function SideDrawer({ children }) {
  return createPortal(
    <div className='w-fit h-screen fixed right-0 top-0 p-12 z-50 bg-white text-black font-semibold flex flex-col gap-4 animate__animated animate__slideInRight md:hidden'>
        {children}
    </div>,
    document.getElementById('side-drawer')
  )
}

export default SideDrawer