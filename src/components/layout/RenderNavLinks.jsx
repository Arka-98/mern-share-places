import React, { useContext } from 'react'
import StyledLink from './StyledLink'
import PropTypes from 'prop-types'
import AppContext from '../context/AppContext'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function RenderNavLinks({ handleClick, buttonClickHandler }) {
    const navigate = useNavigate()
    const { isLoggedIn } = useContext(AppContext)
    return (
        <>
            <StyledLink to='/' onClick={handleClick} customClass='font-semibold'>Home</StyledLink>
            {
                isLoggedIn ? 
                <>
                    <StyledLink to='/add-place' onClick={handleClick} customClass='font-semibold'>Add Place</StyledLink>
                    <StyledLink to='/profile' onClick={handleClick} customClass='font-semibold'>Profile</StyledLink>
                    <StyledLink to='/about' onClick={handleClick} customClass='font-semibold'>About</StyledLink>
                    <Button bgColor='bg-red-500' onClick={buttonClickHandler}>Logout</Button>
                </> :
                <>
                    <StyledLink to='/login' onClick={handleClick} customClass='font-semibold'>Login</StyledLink>
                    <StyledLink to='/register' onClick={handleClick} customClass='font-semibold'>Register</StyledLink>
                    <StyledLink to='/about' onClick={handleClick} customClass='font-semibold'>About</StyledLink>
                </>
            }
        </>
    )
}

RenderNavLinks.defaultProps = {
    handleClick: null,
    buttonClickHandler: null
}

export default RenderNavLinks