import React from 'react'
import { createPortal } from 'react-dom'

function Backdrop({ handleClick, customClass }) {
  return createPortal(
    <div className={`bg-black fixed animate__animated animate__fadeIn duration-300 backdrop-blur-sm bg-opacity-60 z-40 w-screen h-screen ${customClass}`} onClick={handleClick} />,
    document.getElementById('backdrop')
  )
}

Backdrop.defaultProps = {
  customClass: ''
}

export default Backdrop