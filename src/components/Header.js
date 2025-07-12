import React from 'react'

const Header = () => {
    const logo = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-01/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
  return (
    <div className='absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4'>
        <img src={logo} alt="Netflix" className='w-36 h-auto' />
    </div>
  )
}

export default Header