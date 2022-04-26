import React from 'react'
import { Link } from 'react-router-dom'

function UserItem({ user }) {
  return (
    <Link to={`/${user._id}/places`} className='flex items-center gap-5 w-60 py-3 px-4 border-2 border-slate-300 rounded-xl text-slate-700 hover:bg-stone-200 active:bg-stone-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-stone-300 duration-200'>
      <div className="rounded-full w-16 h-16 overflow-hidden shrink-0">
          <img src={`${process.env.REACT_APP_ASSET_URL}/${user.image}`} alt={user.username} className='object-cover' />
      </div>
      <div className="flex flex-col gap-2">
          <p className='text-purple-500 font-semibold'>{user.username}</p>
          <p className='font-bold'>{user.places.length} {user.places.length === 1 ? 'Place' : 'Places'}</p>
      </div>
    </Link>
  )
}

export default UserItem