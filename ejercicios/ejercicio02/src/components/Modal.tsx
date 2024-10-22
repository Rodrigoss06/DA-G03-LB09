import React, { ReactNode } from 'react'

function Modal({children}:{children:ReactNode}) {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
      <div className='bg-white rounded-lg shadow-lg p-6 max-w-lg w-full'>
        {children}
      </div>
    </div>
  )
}

export default Modal