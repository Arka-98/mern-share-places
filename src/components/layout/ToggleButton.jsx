import React, { useState } from 'react'

function ToggleButton({ type, isDisabled, children, selected, onClick, customClass }) {
    return (
      <button type={type} disabled={isDisabled} onClick={onClick} className={`flex gap-1 text-sm items-center rounded-sm px-2.5 py-0.5 lg:py-1 disabled:cursor-not-allowed hover:opacity-80 duration-150 border-2 ${ selected ? 'text-stone-200 border-blue-600 bg-blue-600' : 'text-blue-600 border-blue-600 bg-stone-100' } ${customClass}`}>
          {children}
      </button>
    )
}

ToggleButton.defaultProps = {
    onClick: null,
    selected: false,
    customClass: ''
}

export default ToggleButton