import React, { useContext, useState } from 'react'
import AppContext from '../context/AppContext'
import Backdrop from '../layout/Backdrop'
import Button from '../layout/Button'
import MapModal, { ConfirmationModal } from '../layout/Modal'
import { MdOutlineMap, MdEdit, MdDelete, MdThumbUp } from 'react-icons/md'
import { BiLoaderAlt } from 'react-icons/bi'
import StyledLinkButton from '../layout/StyledLinkButton'
import ToggleButton from '../layout/ToggleButton'
import useHttpClient from '../hooks/useHttpClient'
import { toast } from 'react-toastify'

function PlaceItem({ place, handleDelete }) {
  const { isLoggedIn, user, token } = useContext(AppContext)
  const [isMapModalOpen, setIsMapModalOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const { loading, fetchData } = useHttpClient()
  const [likes, setLikes] = useState(() => ({ selected: isLoggedIn && place.likedUserIds.includes(user._id), count: place.likedUserIds.length }))
    const handleChange = async () => {
        try {
          await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/${place._id}/like`, 'PUT', { Authorization: `Bearer ${token}` })
          setLikes(prevData => ({ selected: !prevData.selected, count: prevData.selected ? prevData.count - 1 : prevData.count + 1 }))
        } catch (error) {
          toast.error(error.message, { autoClose: 3000 })
        }
    }
  return (
    <div className='flex flex-col sm:flex-row w-full sm:h-[55vw] md:h-[40vw] lg:h-[30vw] xl:h-[25vw] bg-stone-100 border-2 border-stone-300 hover:shadow-lg hover:shadow-stone-300 hover:-translate-y-0.5 duration-200 rounded-md overflow-hidden'>
      <div className='basis-1/2'>
        <img src={`${process.env.REACT_APP_ASSET_URL}/${place.image}`} alt={place.title} className='object-cover w-full h-52 sm:h-full' />
      </div>
      <div className="flex flex-col text-slate-800 gap-4 p-8 justify-center basis-1/2">
        <p className='text-2xl font-semibold'>{place.title}</p>
        <p className='text-sm font-semibold'>{place.address}</p>
        <p className='text-sm'>{place.description}</p>
        <hr className='my-5 border-stone-400' />
        <div className="flex justify-center items-center gap-6">
          {
            <ToggleButton onClick={handleChange} selected={likes.selected} isDisabled={!isLoggedIn || loading}>
              {loading ? <BiLoaderAlt className='text-white text-xl px-1 lg:px-5 animate-spin box-content'/> : 
                <>
                  <MdThumbUp className='text-base'/>
                  <span className='font-semibold'>{likes.count}</span>
                  <span className='hidden lg:inline-block'>Like{likes.count !== 1 && 's' }</span>
                </>}
            </ToggleButton>
          }
          <Button bgColor='bg-green-600' onClick={() => setIsMapModalOpen(prevState => !prevState)} customClass='flex gap-1 items-center'>
            <MdOutlineMap className='text-base'/>
            <span className='hidden lg:inline-block'>Map</span>
          </Button>
          {
            isLoggedIn && place.userId === user._id &&
            <>
              <StyledLinkButton to={`/edit-place/${place._id}`} customClass='flex gap-1 items-center'>
                <MdEdit className='text-base'/>
                <span className='hidden lg:inline-block'>Edit</span>
              </StyledLinkButton>
              <Button bgColor='bg-rose-600' onClick={() => setIsConfirmModalOpen(prevState => !prevState)} customClass='flex gap-1 items-center'>
                <MdDelete className='text-base'/>
                <span className='hidden lg:inline-block'>Delete</span>
              </Button>
            </>
          }
        </div>
      </div>
      {
        isMapModalOpen &&
        <>
          <Backdrop handleClick={() => setIsMapModalOpen(false)} />
          <MapModal location={place.location} address={place.address} onClick={() => setIsMapModalOpen(false)} />
        </>
      }
      {
        isConfirmModalOpen &&
        <>
          <Backdrop handleClick={() => setIsConfirmModalOpen(false)} />
          <ConfirmationModal onClick={() => setIsConfirmModalOpen(false)} handleDelete={() => handleDelete(place._id)} />
        </>
      }
    </div>
  )
}

export default PlaceItem