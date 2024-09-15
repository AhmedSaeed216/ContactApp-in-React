import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
const Model = ({ isOpen, onClose, children }) => {
    return <>{isOpen && (
    <>
    <div className=' m-auto relative z-50 bg-white min-h-[200px] max-w-[80%] p-4'>
        <div className='flex justify-end'>
            <AiOutlineClose
                onClick={onClose} 
                className=' text-xl cursor-pointer'/>
            
        </div>
        {children}
    </div>

    <div onClick={onClose} className=' z-40 absolute backdrop-blur top-0 h-screen w-screen'/>
    </>
    )}
    </>;
  };
  

export default Model

