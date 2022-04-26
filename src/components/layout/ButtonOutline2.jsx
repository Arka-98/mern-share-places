import React from 'react'
import PropTypes from 'prop-types'

function ButtonOutline2({ type, isDisabled, onClick, children, bgColorOutline, customClass }) {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={`text-sm text-slate-700 rounded-sm px-3 py-1.5 my-5 bg-transparent border-2 border-slate-700 hover:bg-slate-700 hover:text-stone-100 hover:border-transparent duration-150 disabled:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-slate-700 disabled:hover:text-slate-700`}>
        {children}
    </button>
  )
}

ButtonOutline2.defaultProps = {
    type: 'button',
    isDisabled: false,
    onClick: null,
    bgColorOutline: 'slate-600',
    customClass: ''
}

ButtonOutline2.propTypes = {
    children: PropTypes.node.isRequired
}

export default ButtonOutline2