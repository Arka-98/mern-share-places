import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

function StyledLink({ children, to, onClick, customClass }) {
  const location = useLocation()
  const matchPath = (path) => {
    if(location.pathname === path) {
      return true
    }
    return false
  }
  return (
    <Link to={to} onClick={onClick} className={`w-fit py-1.5 px-3 duration-100 hover:bg-slate-300 hover:text-slate-700 rounded-sm ${customClass} ${matchPath && matchPath(to) && "bg-slate-600 text-white"}`}>{children}</Link>
  )
}

StyledLink.defaultProps = {
    onClick: null,
    customClass: ''
}

StyledLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}

export default StyledLink