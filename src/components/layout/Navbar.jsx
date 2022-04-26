import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MdClose } from 'react-icons/md'
import Backdrop from './Backdrop'
import SideDrawer from './SideDrawer'
import RenderNavLinks from './RenderNavLinks'
import AppContext from '../context/AppContext'
import { MdOutlineShare } from 'react-icons/md'

function Navbar() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { logOut } = useContext(AppContext)
  const handleClick = () => {
    setIsMenuOpen(prevState => !prevState)
  }
  const closeMenu = () => {
    setIsMenuOpen(false)
  }
  const buttonClickHandler = () => {
    console.log('called')
    logOut()
    navigate('/login')
    setIsMenuOpen(false)
}
  return (
    <div className='sticky top-0 z-10 w-full bg-stone-100 bg-opacity-80 backdrop-blur-sm border-b-2 text-slate-700 py-4 px-10'>
        <div className="container relative mx-auto flex items-center justify-between">
            <Link to='/' onClick={closeMenu} className='flex gap-3 items-center text-xl font-semibold'>
              <MdOutlineShare className='text-2xl text-black' />
              <span>SharePlaces</span>
            </Link>
            <div className="hidden gap-4 md:flex">
              <RenderNavLinks buttonClickHandler={buttonClickHandler} />
            </div>
            <div className='flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-full hover:bg-slate-200 active:bg-slate-300 duration-100 md:hidden' onClick={handleClick}>
                {!isMenuOpen &&
                  <>
                    <span className='block h-0.5 w-6 bg-slate-700'/>
                    <span className='block h-0.5 w-6 bg-slate-700'/>
                    <span className='block h-0.5 w-6 bg-slate-700'/>
                  </>
                }
            </div>
        </div>
        {isMenuOpen &&
          <>
            <Backdrop handleClick={closeMenu} customClass='md:hidden' />
            <SideDrawer>
              <MdClose className='absolute left-3 top-3 text-black hover:opacity-70 duration-100 text-xl' onClick={closeMenu} />
              <RenderNavLinks handleClick={handleClick} buttonClickHandler={buttonClickHandler} />
            </SideDrawer>
          </>
        }
    </div>
  )
}

export default Navbar