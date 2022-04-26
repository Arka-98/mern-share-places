import React from 'react'
import UserItem from './UserItem'

function UsersList({ users }) {
  return (
    <div className='flex flex-wrap gap-14'>
      {users?.map(user => <UserItem key={user._id} user={user} />)}
    </div>
  )
}

export default UsersList