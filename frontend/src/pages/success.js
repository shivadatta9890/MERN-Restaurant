import React from 'react'
import { MdOutlineDownloadDone } from "react-icons/md";
const Success = () => {
  return (
    <div className='bg-green-200 h-36 max-w-md m-auto mt-2 font-semibold w-full flex justify-center items-center gap-3 text-lg'>
        <p>Payment Successful</p>
            <span className='font-semibold text-xl'><MdOutlineDownloadDone /></span>
        
    </div>
  )
}

export default Success;