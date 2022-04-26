import React, { useContext, useEffect, useState } from 'react'
import { MdPerson, MdPhone, MdMail } from 'react-icons/md'
import { toast } from 'react-toastify'
import AppContext from '../components/context/AppContext'
import useHttpClient from '../components/hooks/useHttpClient'
import Card from '../components/layout/Card'
import Spinner from '../components/layout/Spinner'
import PlacesList from '../components/places/PlacesList'
import { MdOutlineEdit, MdEdit, MdOutlineClose, MdCheck } from 'react-icons/md'
import Button from '../components/layout/Button'
import InputBorder from '../components/layout/InputBorder'
import ImageUploadProfile from '../components/layout/ImageUploadProfile'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const { user, token, updateUser } = useContext(AppContext)
  const { loading, fetchData } = useHttpClient()
  const [userPlaces, setUserPlaces] = useState(null)
  const [edit, setEdit] = useState(false)
  const [formData, dispatch] = useForm({ input: { username: user.username, contact: user.contact, image: user.image }, errors: { username: false, image: false, contact: false }, isError: false })

  useEffect(() => {
    loadPlaces()
  }, [])

  useEffect(() => {
    dispatch({ type: FORM_ACTIONS.CHECK_ERROR })
  }, [formData.input, formData.errors])

  const loadPlaces = async () => {
    try {
      const data = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/user/${user._id}`)
      setUserPlaces(data)
    } catch (error) {
      setUserPlaces(null)
      toast.error(error.message, { autoClose: 3000 })
    }
  }

  const handleDelete = async (placeId) => {
    try {
      const responseData = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/${placeId}`, 'DELETE')
      loadPlaces()
      toast.success('Place deleted', { autoClose: 3000 })
    } catch (error) {
      toast.error('Failed to delete place', { autoClose: 3000 })
    }
  }

  const handleCancel = (e) => {
    dispatch({ type: FORM_ACTIONS.SET_CUSTOM_INPUT, payload: { username: user.username, contact: user.contact, image: user.image } })
    setEdit(false)
  }

  const handleChange = (e) => {
    let { name, value, files } = e.target
    if(name === 'image') {
      value = files.length === 0 ? '' : files[0].size > 3000000 ? '' : files[0]
      if(!value) {
        e.target.value = ''
      }
    }
    dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: {name, value} })
    dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: {name, value} })
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: {name, value} })
    dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, image, contact } = formData.input
    const data = new FormData()
    data.append('username', username)
    data.append('image', image)
    data.append('contact', contact)
    try {
      const responseData = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/${user._id}`, 'PUT', { Authorization: `Bearer ${token}` }, data)
      updateUser({ ...user, ...formData.input })
      toast.success('Profile updated', { autoClose: 3000 })
    } catch (error) {
      // dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name: 'image', value: null } })
      toast.error(error.message, { autoClose: 3000 })
    }
    setEdit(false)
  }

  return loading ? <Spinner/> : (
    <div className='text-slate-700'>
      <div className="text-4xl font-normal mb-20">My Profile</div>
      <div className="flex relative justify-between sm:gap-12 bg-stone-100 border-2 border-slate-300 rounded-md px-10 py-8">
        <ImageUploadProfile image={formData.input.image} />
        {
          edit &&
          <>
            <label htmlFor="image-input" className='bg-black z-30 bg-opacity-80 hover:bg-opacity-60 hover:cursor-pointer duration-150 absolute top-12 left-1/2 px-2 py-0.5 rounded-xl -translate-x-1/2'>
              <MdOutlineEdit className='text-white' />
            </label>
            <input type="file" accept='.jpg,.png,.jpeg' onChange={handleChange} name="image" id='image-input' className='hidden' />
          </>
        }
        <div className='flex flex-col gap-3 mt-12 md:m-0'>
          <div className="flex gap-3 items-center">
            <MdPerson className='text-xl' />
            {
              edit ? <InputBorder type="text" name="username" value={formData.input.username} error={formData.errors.username} onChange={handleChange} onBlur={handleBlur} /> : <p className='font-semibold'>{user.username}</p>
            }
          </div>
          <div className="flex gap-3 items-center">
            <MdPhone className='text-xl' />
            {
              edit ? <InputBorder type="number" name="contact" value={formData.input.contact} error={formData.errors.contact} onChange={handleChange} onBlur={handleBlur} /> : <p className='font-semibold'>{user.contact}</p>
            }
          </div>
          <div className="flex gap-3 items-center">
            <MdMail className='text-xl' />
            <p className='font-semibold'>{user.email}</p>
          </div>
        </div>
        <div>
          {
            edit ? 
            <div className='flex gap-3'>
              <Button bgColor='bg-green-500' onClick={handleSubmit} isDisabled={formData.isError}>
                <MdCheck className='text-lg md:hidden' />
                <span className='hidden md:inline-block'>Done</span>
              </Button>
              <Button bgColor='bg-red-500' onClick={handleCancel}>
                <MdOutlineClose className='text-lg md:hidden' />
                <span className='hidden md:inline-block'>Cancel</span>
              </Button>
            </div> :
            <Button bgColor='bg-green-500' onClick={() => setEdit(true)}>
              <MdEdit className='text-base' />
              Edit
            </Button>
          }
        </div>
      </div>
      <hr className='my-12 border-solid border-slate-300' />
      <div className="text-4xl font-normal mb-8">My Places</div>
      { 
        userPlaces ? <PlacesList places={userPlaces} handleDelete={handleDelete} /> :
        <Card>You haven't added any places yet</Card>
      }
    </div>
  )
}

export default Profile