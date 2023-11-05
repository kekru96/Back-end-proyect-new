import React from 'react'

export const Spinner = () => {
    return (
        <div className='flex justify-center items-center w-full mt-5'>
            <div className="border-t-transparent border-solid animate-spin  rounded-full border-myLightGreen border-8 h-40 w-40"></div>
        </div>
    )
}
