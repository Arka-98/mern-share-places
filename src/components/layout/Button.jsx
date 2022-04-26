import React from 'react'
import PropTypes from 'prop-types'

function Button({ type, isDisabled, onClick, children, bgColor, customClass }) {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={`flex gap-1 items-center justify-center text-sm text-white rounded-sm px-3 py-1.5 ${bgColor} hover:opacity-80 duration-150 disabled:bg-opacity-60 disabled:cursor-not-allowed ${customClass}`}>
        {children}
    </button>
  )
}

Button.defaultProps = {
    type: 'button',
    isDisabled: false,
    onClick: null,
    bgColor: 'bg-slate-600',
    customClass: ''
}

Button.propTypes = {
    children: PropTypes.node.isRequired
}

export default Button