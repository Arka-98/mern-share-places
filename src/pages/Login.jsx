import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import AppContext from '../components/context/AppContext'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import useHttpClient from '../components/hooks/useHttpClient'
import ButtonOutline2 from '../components/layout/ButtonOutline2'
import Input from '../components/layout/Input'
import Label from '../components/layout/Label'
import Spinner from '../components/layout/Spinner'

function Login() {
  const { logIn } = useContext(AppContext)
  const { loading, fetchData } = useHttpClient()
  const [formData, dispatch] = useForm({ input: { email: '', password: '' }, errors: { email: null, password: null }, isError: true, loading: false })
  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name, value } })
    dispatch({ type: FORM_ACTIONS.CHECK_ERROR })
  }
  const handleBlur = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.SET_ERRORS, payload: { name, value } })
    dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const responseData = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/login`, 
        'POST',
        {
          'content-type': 'application/json'
        },
        JSON.stringify(formData.input)
      )
      logIn(responseData.userData, responseData.accessToken)
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 })
    }
  }
  return loading ? <Spinner/> : (
    <div className='flex flex-col gap-16 text-slate-700'>
      <div className="text-5xl font-semibold">Login to your account.</div>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
        <div className="relative space-y-2">
          <Label>Email</Label>
          <Input name='email' value={formData.input.email} placeholder='Enter email' onChange={handleChange} onBlur={handleBlur} error={formData.errors.email} customClass='text-slate-700 border-white ring-offset-gray-600' />
        </div>
        <div className="relative space-y-2">
          <Label>Password</Label>
          <Input type='password' name='password' value={formData.input.password} placeholder='Enter password' onChange={handleChange} onBlur={handleBlur} error={formData.errors.password} customClass='text-slate-700 border-white ring-offset-gray-600' />
        </div>
        <ButtonOutline2 type='submit' isDisabled={formData.isError}>
          Sign In
        </ButtonOutline2>
      </form>
      <Link to='/forgot-password' className="text-sm w-fit float-right -mt-14 text-blue-500">Forgot password?</Link>
      <div className="text-sm mx-auto -mt-10">Don't have an account? <Link to='/register' className='text-blue-500'>Register here</Link></div>
    </div>
  )
}

export default Login