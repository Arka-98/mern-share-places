import React, { useContext, useEffect } from 'react'
import Button from '../components/layout/Button'
import Input from '../components/layout/Input'
import Label from '../components/layout/Label'
import Textarea from '../components/layout/Textarea'
import { MdEdit } from 'react-icons/md'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import { toast } from 'react-toastify'
import useHttpClient from '../components/hooks/useHttpClient'
import Spinner from '../components/layout/Spinner'
import { useNavigate, useParams } from 'react-router-dom'
import AppContext from '../components/context/AppContext'
import ImageUpload from '../components/layout/ImageUpload'
import FileInput from '../components/layout/FileInput'

function EditPlace() {
  const navigate = useNavigate()
  const params = useParams()
  const { loading, fetchData } = useHttpClient()
  const { user, token } = useContext(AppContext)
  const [formData, dispatch] = useForm({ input: { title: "", description: "", image: null, address: "" }, errors: { title: false, description: false, image: false, address: false }, isError: true })
  
  useEffect(() => {
    fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/${params.placeId}`)
    .then((data) => {
      const { title, description, address, image } = data
      dispatch({ type: FORM_ACTIONS.SET_CUSTOM_INPUT, payload: { title, description, address, image } })
    })
    .catch(error => toast.error(error.message, { autoClose: 3000 }))
  }, [])

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
    const { title, description, address, image } = formData.input
    const data = new FormData()
    data.append('title', title)
    data.append('description', description)
    data.append('address', address)
    data.append('image', image)
    try {
      await fetchData(`${process.env.REACT_APP_API_BASE_URL}/places/${params.placeId}`, 'PUT', { Authorization: `Bearer ${token}` }, data)
      navigate(`/${user._id}/places`)
      toast.success('Place updated', { autoClose: 3000 })
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 })
    }
  }
  return loading ? <Spinner/> : (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col gap-3 text-slate-700 bg-stone-100 rounded-md px-12 py-10 border-2'>
        <div className='flex gap-2 items-center text-3xl font-semibold mb-8'>
          Update a Place
          <MdEdit className='text-2xl' />
        </div>
        <div className="relative space-y-3">
          <Label required={true}>Upload an Image</Label>
          <div className='flex items-center gap-6'>
            <ImageUpload image={formData.input.image} type='square' />
            <FileInput type="file" accept='.jpg,.png,.jpeg' onChange={handleChange} name="image" />
          </div>
        </div>
        <div className="relative space-y-2">
          <Label>Title</Label>
          <Input name='title' placeholder='Enter a title' value={formData.input.title} onChange={handleChange} onBlur={handleBlur} error={formData.errors.title} customClass='text-slate-700'/>
        </div>
        <div className="relative space-y-2">
          <Label>Description</Label>
          <Textarea name='description' placeholder='Enter a description' value={formData.input.description} onChange={handleChange} onBlur={handleBlur} error={formData.errors.description} customClass='text-slate-700'/>
        </div>
        <div className="relative space-y-2">  
          <Label>Address</Label>
          <Input name='address' placeholder='Enter an address' value={formData.input.address} onChange={handleChange} onBlur={handleBlur} error={formData.errors.address} customClass='text-slate-700'/>
        </div>
        <Button type="submit" isDisabled={formData.isError} bgColor='bg-blue-500' customClass='w-full mt-5'>Update Place</Button>
      </form>
    </>
  )
}

export default EditPlace