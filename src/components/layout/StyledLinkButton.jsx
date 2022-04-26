import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function StyledLinkButton({ to, onClick, children, bgColor, customClass }) {
  return (
    <Link to={to} onClick={onClick} className={`text-sm text-white text-center rounded-sm px-3 py-1.5 ${bgColor} hover:opacity-80 duration-150 ${customClass}`}>
        {children}
    </Link>
  )
}

StyledLinkButton.defaultProps = {
    onClick: null,
    bgColor: 'bg-slate-600',
    customClass: ''
}

StyledLinkButton.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default StyledLinkButton