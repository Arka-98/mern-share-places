import React from 'react'
import PropTypes from 'prop-types'
import { MdError } from 'react-icons/md'

function Textarea({ type, name, value, placeholder, onChange, onBlur, error, customClass }) {
  return (
    <>
      <textarea type={type} name={name} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} className={`w-full outline-none py-1 px-2 placeholder:text-sm border-2 border-slate-500 hover:border-blue-500 rounded-md focus:ring-offset-2 focus:border-0 duration-150 focus:ring-2 focus:ring-blue-500 ${error && 'border-0 ring-offset-2 ring-2 ring-red-500 focus:ring-red-500'} ${customClass}`} />
      {
        error && <MdError className='absolute text-red-500 top-8 right-3' />
      }
    </>
  )
}

Textarea.defaultProps = {
    type: 'text',
    error: false,
    customClass: '',
    onBlur: null
}

Textarea.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Textarea