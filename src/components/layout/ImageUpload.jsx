import React, { useMemo } from 'react'
import { MdOutlineImage } from 'react-icons/md'
import PropTypes from 'prop-types'

function ImageUpload({ image, type }) {
    const imgURL = useMemo(() => !image ? null : typeof image === 'string' ? `${process.env.REACT_APP_ASSET_URL}/${image}` : URL.createObjectURL(image), [image])
    return (
        <>
            <div className={`flex items-center justify-center overflow-hidden bg-transparent border border-slate-700 ${type === 'mini' ? 'w-24 h-24' : type === 'square' && 'w-36 h-36'}`}>
                {
                    image ? <img src={imgURL} alt="Avatar" className='object-cover' /> : <MdOutlineImage className='text-2xl' />
                }
            </div>
        </>
    )
}

ImageUpload.defaultProps = {
    type: 'mini',
    image: null
}

ImageUpload.propTypes = {
    image: PropTypes.any,
}

export default ImageUpload