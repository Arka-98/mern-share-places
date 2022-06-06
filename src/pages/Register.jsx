import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import Input from '../components/layout/Input'
import Label from '../components/layout/Label'
import { toast } from 'react-toastify'
import Spinner from '../components/layout/Spinner'
import useHttpClient from '../components/hooks/useHttpClient'
import ImageUpload from '../components/layout/ImageUpload'
import ButtonOutline2 from '../components/layout/ButtonOutline2'
import FileInput from '../components/layout/FileInput'

function Register() {
  const navigate = useNavigate()
  const { loading, fetchData } = useHttpClient()
  const [formData, dispatch] = useForm({ input: { username: '', email: '', contact: '', image: null, password: '', confPassword: '' }, errors: { username: null, email: null, image: null, contact: null, password: null, confPassword: null }, isError: true, loading: false })
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
    dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: {name, value} })
    dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: {name, value} })
    if (name === 'password' || name === 'confPassword') {
      dispatch({ type: FORM_ACTIONS.CHECK_PASSWORDS, payload: {name, value} })
    }
  }
  const handleBlur = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
    dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: {name, value} })
    if (name === 'password' || name === 'confPassword') {
      dispatch({ type: FORM_ACTIONS.CHECK_PASSWORDS, payload: {name, value} })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, email, image, contact, password } = formData.input
    const data = new FormData()
    data.append('username', username)
    data.append('email', email)
    data.append('image', image)
    data.append('contact', contact)
    data.append('password', password)
    try {
      const responseData = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/register`, 'POST', {}, data)
      navigate('/login')
      toast.success('User registered successfully', { autoClose: 3000 })
    } catch (error) {
      dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name: 'image', value: null } })
      toast.error(error.message, { autoClose: 3000 })
    }
  }
  return loading ? <Spinner /> : (
    <div className='flex flex-col gap-16 text-slate-700'>
      <div className="text-5xl font-semibold">Sharing places redefined. Sign up now.</div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className="relative space-y-3">
          <Label required={true}>Upload your Image</Label>
          <div className='flex items-center gap-6'>
            <ImageUpload image={formData.input.image} />
            <FileInput type="file" accept='.jpg,.png,.jpeg' onChange={handleChange} name="image" />
          </div>
        </div>
        <div className="relative space-y-2">
          <Label required={true}>Username</Label>
          <Input name='username' value={formData.input.username} placeholder='Enter username' onChange={handleChange} onBlur={handleBlur} error={formData.errors.username} customClass='text-slate-700 border-white ring-offset-gray-600' />
        </div>
        <div className="relative space-y-2">
          <Label required={true} note='Example - email@email.domain'>Email</Label>
          <Input name='email' value={formData.input.email} placeholder='Enter email' onChange={handleChange} onBlur={handleBlur} error={formData.errors.email} customClass='text-slate-700 border-white ring-offset-gray-600' />
        </div>
        <div className="relative space-y-2">
          <Label required={true} note='Should be 10 characters'>Contact</Label>
          <Input type='number' name='contact' value={formData.input.contact} placeholder='Enter contact' onChange={handleChange} onBlur={handleBlur} error={formData.errors.contact} customClass='text-slate-700 border-white ring-offset-gray-600 appearance-none' />
        </div>
        <div className="relative space-y-2">
          <Label required={true} note='Must be at least 8 characters with one number, uppercase and lowercase character'>Password</Label>
          <Input type='password' name='password' value={formData.input.password} placeholder='Enter password' onChange={handleChange} onBlur={handleBlur} error={formData.errors.password} customClass='text-slate-700 border-white ring-offset-gray-600' />
        </div>
        <div className="relative space-y-2">
          <Label required={true}>Confirm Password</Label>
          <Input type='password' name='confPassword' value={formData.input.confPassword} placeholder='Confirm password' onChange={handleChange} onBlur={handleBlur} error={formData.errors.confPassword} customClass='text-slate-700 border-white ring-offset-gray-600' />
        </div>
        <ButtonOutline2 type='submit' isDisabled={formData.isError}>
          Sign Up
        </ButtonOutline2>
      </form>
      <div className="text-sm mx-auto -mt-12">Have an account? <Link to='/login' className='text-blue-500'>Login here</Link></div>
    </div>
  )
}

export default Register