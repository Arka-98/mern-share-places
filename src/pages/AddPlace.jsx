import React, { useContext, useEffect, useRef } from 'react'
import Button from '../components/layout/Button'
import Input from '../components/layout/Input'
import Label from '../components/layout/Label'
import Textarea from '../components/layout/Textarea'
import { MdAdd } from 'react-icons/md'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import useHttpClient from '../components/hooks/useHttpClient'
import Spinner from '../components/layout/Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AppContext from '../components/context/AppContext'
import ImageUpload from '../components/layout/ImageUpload'
import FileInput from '../components/layout/FileInput'

function AddPlace() {
  const navigate = useNavigate()
  const { loading, fetchData } = useHttpClient()
  const { user, token } = useContext(AppContext)
  const [formData, dispatch] = useForm({ input: { title: "", description: "", image: null, address: "" }, errors: { title: null, description: null, image: null, address: null }, isError: true })
  
  useEffect(() => {
    dispatch({ type: FORM_ACTIONS.CHECK_ERROR })
  }, [formData.input, formData.errors])

  const handleChange = (e) => {
    let { name, value, files } = e.target
    if(name === 'image') {
      value = files.length === 0 ? '' : files[0].size > 3000000 ? '' : files[0]
      if(!value) {
        e.target.value = ''
      }
    }
    dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name, value } })
  }
  const handleBlur = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.SET_ERRORS, payload: { name, value } })
    dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { title, description, image, address } = formData.input
    const data = new FormData()
    data.append('title', title)
    data.append('description', description)
    data.append('image', image)
    data.append('address', address)
    try {
      await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/`, 'POST', { Authorization: `Bearer ${token}` }, data)
      navigate(`/${user._id}/places`)
      toast.success('Place created successfully', { autoClose: 3000 })
    } catch (error) {
      dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name: 'image', value: null } })
      toast.error(error.message, { autoClose: 3000 })
    }
  }
  return loading ? <Spinner/> : (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 text-slate-700 bg-stone-100 rounded-md px-12 py-10 border-2'>
        <div className='flex gap-2 items-center text-3xl font-semibold mb-8'>
          Add a Place
          <MdAdd />
        </div>
        <div className="relative space-y-3">
          <Label required={true}>Upload an Image</Label>
          <div className='flex items-center gap-6'>
            <ImageUpload image={formData.input.image} type='square' />
            <FileInput type="file" accept='.jpg,.png,.jpeg' onChange={handleChange} name="image" />
          </div>
        </div>
        <div className="relative space-y-2">
          <Label required={true}>Title</Label>
          <Input name='title' placeholder='Enter a title' value={formData.input.title} onChange={handleChange} onBlur={handleBlur} error={formData.errors.title} customClass='text-slate-700' />
        </div>
        <div className="relative space-y-2">
          <Label required={true}>Description</Label>
          <Textarea name='description' placeholder='Enter a description' value={formData.input.description} onChange={handleChange} onBlur={handleBlur} error={formData.errors.description} customClass='text-slate-700' />
        </div>
        <div className="relative space-y-2">  
          <Label required={true}>Address</Label>
          <Input name='address' placeholder='Enter an address' value={formData.input.address} onChange={handleChange} onBlur={handleBlur} error={formData.errors.address} customClass='text-slate-700' />
        </div>
        <Button type="submit" isDisabled={formData.isError} bgColor='bg-blue-500' customClass='w-full mt-5'>Add Place</Button>
      </form>
    </>
  )
}

export default AddPlace