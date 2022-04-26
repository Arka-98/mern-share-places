import React, { useMemo } from 'react'

function ImageUploadProfile({ image }) {
    const imgURL = useMemo(() => !image ? null : typeof image === 'string' ? `${process.env.REACT_APP_ASSET_URL}/${image}` : URL.createObjectURL(image), [image])
    return (
        <>
            <div className="absolute left-1/2 -translate-x-1/2 -top-14 ring-1 ring-slate-700 ring-offset-4 ring-offset-stone-100 rounded-full w-28 h-28 overflow-hidden">
                <img src={imgURL} alt='Avatar' className='object-cover w-full h-full' />
            </div>
        </>
    )
}

export default ImageUploadProfile