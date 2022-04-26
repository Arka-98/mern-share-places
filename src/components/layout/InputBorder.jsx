import React from 'react'

function InputBorder({ type, name, error, disabled, onChange, onBlur, value, customClass }) {
  return (
    <input type={type} name={name} disabled={disabled} value={value} onBlur={onBlur} onChange={onChange} className={`bg-transparent text-slate-700 font-semibold border-b-2 border-stone-300 duration-200 outline-none focus:border-green-500 ${error && 'border-red-400 focus:border-red-500'}`} />
  )
}

InputBorder.defaultProps = {
    type: 'text',
    error: false,
    customClass: '',
    disabled: false,
    onBlur: null
}

export default InputBorder