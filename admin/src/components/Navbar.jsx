import React from 'react'
import { assets } from '../assets/assets'
import {motion} from 'framer-motion'

const Navbar = ({setToken}) => {
  const handleLogout = ()=>{
    localStorage.removeItem('token');
     setToken("");
  }
  return (
    <div className='w-full py-2 px-10 flex items-center justify-between border-b border-gray-300'>
      <img src={assets.logo} className='w-33'></img>
      <motion.button onClick={handleLogout} whileTap={{scale:0.96}} className='cursor-pointer rounded-full py-2 px-5 sm:px-7 sm:py-2 text-white bg-gray-600 text-sm'>Logout</motion.button>

    </div>
  )
}

export default Navbar