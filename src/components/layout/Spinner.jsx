import React from "react";
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

function Spinner() {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh]">
            <AiOutlineLoading3Quarters className="text-5xl font-bold animate-spin text-black" />
        </div>
    )
}

export default Spinner