import React, { useEffect, useRef } from 'react'

function Map({ center, zoom }) {
    const mapRef = useRef()
    useEffect(() => {
        const map = new window.google.maps.Map(mapRef.current, {
            center,
            zoom
        })
        new window.google.maps.Marker({ position: center, map })
    }, [])
    return (
        <div ref={mapRef} className='w-full h-[35vw] sm:h-[25vw]'></div>
    )
}

export default Map