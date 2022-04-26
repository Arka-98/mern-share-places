import React from 'react'

function Card({ children }) {
  return (
    <div className='flex flex-col justify-center items-center p-5 text-slate-700 bg-stone-100 border-2 rounded-lg font-semibold'>
        {children}
    </div>
  )
}

export default Card