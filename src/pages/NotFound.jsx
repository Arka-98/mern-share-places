import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className='flex flex-col gap-4 justify-center items-center w-full h-[60vh]'>
      <p className='font-extrabold text-7xl text-slate-800'>404</p>
      <p className='text-2xl font-semibold text-slate-600'>Not Found</p>
      <p className='font-semibold'>Back to <Link to='/' className='text-violet-400 border-b-2 hover:text-violet-500 hover:border-violet-500 duration-150'>Home</Link> </p>
    </div>
  )
}

export default NotFound