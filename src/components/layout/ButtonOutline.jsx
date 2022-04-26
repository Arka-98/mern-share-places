import React from 'react'
import PropTypes from 'prop-types'

function ButtonOutline({ type, isDisabled, onClick, children, bgColorOutline, customClass }) {
  return (
    <button type={type} disabled={isDisabled} onClick={onClick} className={`text-sm text-${bgColorOutline} rounded-sm px-3 py-1.5 bg-transparent border-2 border-${bgColorOutline} hover:bg-${bgColorOutline} hover:border-transparent hover:text-white duration-150 ${isDisabled && 'bg-opacity-60'} ${customClass}`}>
        {children}
    </button>
  )
}

ButtonOutline.defaultProps = {
    type: 'button',
    isDisabled: false,
    onClick: null,
    bgColorOutline: 'slate-600',
    customClass: ''
}

ButtonOutline.propTypes = {
    children: PropTypes.node.isRequired
}

export default ButtonOutline