import React, { useState } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../assets/logo.png';
import SearchBar from './SearchBar';

const Header = () => {
  const navigate = useNavigate(); 
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const user = useSelector((store) => store.user);
  
  const handleSignOut = () => {
    signOut(auth).then(() => {
      navigate("/");
    }).catch((error) => {
      console.log(error);
    });
  }
  return (
    <>
      <div className='absolute top-0 left-0 right-0 z-50 flex justify-between items-center p-4'>
          <img src={logo} alt="Cheapflix" className='w-36 h-auto' />
          {user && (
            <div className='flex items-center gap-4'>
              <button 
                onClick={() => setIsSearchOpen(true)}
                className='text-white hover:text-gray-300 transition-colors p-2'
              >
                🔍
              </button>
              <button className='text-white bg-red-600 px-4 py-2 rounded-md' onClick={handleSignOut}>Sign out</button>
            </div>
          )}
      </div>
      
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}

export default Header