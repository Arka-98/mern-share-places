import React from 'react'
import PlaceItem from './PlaceItem'

function PlacesList({ places, handleDelete }) {
  return (
    <div className='flex flex-wrap gap-6'>
        {places?.map(place => <PlaceItem key={place._id} place={place} handleDelete={handleDelete}/>)}
    </div>
  )
}

export default PlacesList