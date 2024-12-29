/* eslint-disable no-unused-vars */
import React from 'react'

const Footer = () => {
    return (
        <div className='flex flex-col bg-[#1b1f23] text-white justify-center items-center fixed bottom-0 w-full'>
            <div className="logo font-bold font-serif text-white">
                <span className="text-blue-600">&lt;</span>
                <span className="text-white">Pass</span><span className="text-blue-600">OP/&gt;</span>
            </div>
            <div className='flex gap-1'>
                <span className='font-semibold'>Created with</span>
                <img className='' width={25} src="/icons/heart.png" alt="" />
                <span className='font-semibold'>by Shayan</span>
            </div>

        </div>
    )
}

export default Footer
