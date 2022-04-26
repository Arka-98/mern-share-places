import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import useForm, { FORM_ACTIONS } from '../components/hooks/useForm'
import useHttpClient from '../components/hooks/useHttpClient'
import ButtonOutline2 from '../components/layout/ButtonOutline2'
import Input from '../components/layout/Input'
import Label from '../components/layout/Label'
import Countdown from 'react-countdown'
import { TimerModal } from '../components/layout/Modal'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function ForgotPassword() {
  const navigate = useNavigate()
  const [formData, dispatch] = useForm({ input: { email: '', otp: '', password: '', confPassword: '' }, errors: { email: true, otp: true, password: null, confPassword: null }, isError: true })
  const [isValid, setIsValid] = useState({ email: false, otp: false })
  const { loading, fetchData } = useHttpClient()
  const countdown = useMemo(() => Date.now() + (5*60*1000), [isValid.email])

  const otpRef = useRef()

  useEffect(() => {
    dispatch({ type: FORM_ACTIONS.CHECK_ERROR })
  }, [formData.input, formData.errors])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.SET_INPUT_AND_ERRORS, payload: { name, value } })
    dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: { name, value } })
    if (name === 'password' || name === 'confPassword') {
      dispatch({ type: FORM_ACTIONS.CHECK_PASSWORDS, payload: {name, value} })
    }
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    dispatch({ type: FORM_ACTIONS.VALIDATE_INPUT, payload: {name, value} })
    dispatch({ type: FORM_ACTIONS.TRIM_INPUT, payload: {name, value} })
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    const { email } = formData.input
    try {
      otpRef.current = await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/forgot-password`, 'POST', { 'content-type': 'application/json' }, JSON.stringify({ email }))
      setIsValid(prevData => ({ ...prevData, email: true }))
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 })
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    const { otp } = formData.input
    if(!otp.trim()) {
      toast.info('Please enter OTP', { autoClose: 3000 })
      return
    }
    if(formData.input.otp === otpRef.current.otp.toString()) {
      setIsValid(prevData => ({ ...prevData, otp: true }))
    } else {
      toast.error('Incorrect OTP', { autoClose: 3000 })
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    const { email, password, confPassword } = formData.input
    if(password !== confPassword) {
      toast.error('Passwords do not match', { autoClose: 3000 })
      return
    }
    try {
      await fetchData(`${process.env.REACT_APP_API_BASE_URL}/users/reset-password`, 'PUT', { 'Authorization': `Bearer ${otpRef.current.token}`, 'content-type': 'application/json' }, JSON.stringify({ email, password }))
      navigate('/login')
      toast.success('Password reset successfully', { autoClose: 3000 })
    } catch (error) {
      toast.error(error.message, { autoClose: 3000 })
    }
  }

  return (
    <div className='flex flex-col gap-5 text-slate-700'>
      <div className="text-5xl font-semibold mb-11">Reset your password.</div>
      <div className="relative space-y-2">
        <Label required={true}>Email</Label>
        <Input name='email' value={formData.input.email} disabled={isValid.email} placeholder='Enter email' onChange={handleChange} onBlur={handleBlur} customClass='text-slate-700 border-white ring-offset-gray-600' />
      </div>
      {
        isValid.email && 
        <>
          <Countdown date={countdown} renderer={TimerModal}/>
          <div className="relative space-y-2">
            <Label required={true} note={'Check your email we\'ve sent you an OTP'}>OTP</Label>
            <Input type='password' name='otp' value={formData.input.otp} disabled={isValid.otp} placeholder='Enter OTP' onChange={handleChange} onBlur={handleBlur} customClass='text-slate-700 border-white ring-offset-gray-600' />
          </div>
        </>
      }
      {
        !isValid.otp && (loading ? <AiOutlineLoading3Quarters className='text-3xl animate-spin w-fit mx-auto' /> :
        <ButtonOutline2 isDisabled={formData.errors.email && formData.errors.otp} onClick={!isValid.email ? handleEmailSubmit : handleOtpSubmit}>
          Submit
        </ButtonOutline2>)
      }
      {
        isValid.email && isValid.otp &&
        <form onSubmit={handlePasswordSubmit} className='flex flex-col gap-5'>
          <div className="relative space-y-2">
            <Label required={true} note='Must be at least 8 characters with one number, uppercase and lowercase character'>New Password</Label>
            <Input type='password' name='password' value={formData.input.password} placeholder='Enter new password' onChange={handleChange} onBlur={handleBlur} error={formData.errors.password} customClass='text-slate-700 border-white ring-offset-gray-600' />
          </div>
          <div className="relative space-y-2">
            <Label required={true}>Confirm Password</Label>
            <Input type='password' name='confPassword' value={formData.input.confPassword} placeholder='Confirm password' onChange={handleChange} onBlur={handleBlur} error={formData.errors.confPassword} customClass='text-slate-700 border-white ring-offset-gray-600' />
          </div>
          {
            loading ? <AiOutlineLoading3Quarters className='text-3xl animate-spin w-fit mx-auto' /> :
            <ButtonOutline2 type='submit' isDisabled={formData.isError}>
              Reset Password
            </ButtonOutline2>
          }
        </form>
      }
      <div className="text-sm mx-auto">Back to <Link to='/login' className='text-blue-500'>Login</Link></div>
    </div>
  )
}

export default ForgotPassword