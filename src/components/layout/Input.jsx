import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { MdError } from 'react-icons/md'
import ReactTooltip from 'react-tooltip'

function Input({ type, name, value, placeholder, disabled, onChange, onBlur, error, customClass }) {
  return (
    <>
      <input type={type} name={name} value={value} disabled={disabled} placeholder={placeholder} onChange={onChange} onBlur={onBlur} className={`w-full outline-none h-fit py-1 px-2 placeholder:text-sm border-2 border-slate-500 rounded-md focus:ring-offset-2 focus:ring-offset-stone-100 focus:border-transparent focus:ring-2 duration-150 hover:border-blue-500 focus:ring-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed ${customClass} ${error && 'border-0 ring-offset-2 ring-offset-stone-100 ring-2 ring-red-500 focus:ring-red-500'}`} />
      {
        error && 
        <div className='absolute text-red-500 bottom-2 right-3 m-0'>
          <MdError />
        </div>
      }
    </>
  )
}

Input.defaultProps = {
    type: 'text',
    error: false,
    customClass: '',
    disabled: false,
    onBlur: null
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Input