import React from 'react'
import PropTypes from 'prop-types'

function Label({ required, children, note }) {
  return (
    <div className='flex items-center gap-2 font-semibold whitespace-nowrap'>
        {children}
        {note && <p className='text-xs font-normal whitespace-normal'>({note})</p>}
        {required && <p className='text-red-500'>*</p>}
    </div>
  )
}

Label.defaultProps = {
  required: false,
  note: false
}

export default Label