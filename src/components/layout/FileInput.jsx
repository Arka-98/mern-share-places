import React from 'react'

function FileInput({ type, accept, onChange, name }) {
  return (
    <input type={type} accept={accept} onChange={onChange} name={name} className='file:text-slate-700 file:px-3 file:py-1.5 file:mr-4 file:text-sm file:bg-transparent file:rounded-sm file:outline-none file:border-2 file:border-solid file:border-slate-700 hover:file:bg-slate-700 hover:file:text-stone-100 hover:file:duration-150' />
  )
}

export default FileInput