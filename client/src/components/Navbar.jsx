import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/frontend_assets/assets';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Searchbar from './Searchbar';
import { motion, scale } from 'framer-motion'


const links = [
  { text: "HOME", path: "/" },
  { text: "COLLECTION", path: "/collection" },
  { text: "ABOUT", path: "/about" },
  { text: "CONTACT", path: "/contact" },
];

const sLinks = [
  ...links,
  { text: "ADMIN PANEL", path: "/admin" },
];

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  const { search, setSearch, showSearch, setShowSearch, getCartCount,token,setToken,setCartItems } = useContext(ShopContext);

  const toggleSbar = () => setSidebar(!sidebar);

  useEffect(() => {
    if (showSearch) {
      navigate('/collection');
    }
  }, [showSearch]);

  const handleLogout = async ()=>{
    localStorage.removeItem('userToken')
    setToken("")
    setCartItems({})
    navigate('/login')
  }

  return (
    <>
      {/* Entire Navbar as Column */}
      <div className='relative w-full bg-white shadow-lg flex flex-col'>

        {/* Top Bar: Logo, Links, Icons */}
        <div className='w-full py-3 md:px-6 px-3 flex items-center justify-between'>
          {/* Logo */}
          <img
            onClick={() => navigate('/')}
            src={assets.logo}
            alt="Logo"
            className='cursor-pointer w-[10rem]'
          />

          {/* Desktop Links */}
          <div className="items-center justify-center hidden md:flex">
            {links.map((link, index) => (
              <a
                key={index}
                onClick={() => navigate(link.path)}
                className={`text-[0.98rem] font-semibold text-gray-600 cursor-pointer py-[0.3rem] mx-4 ${location.pathname === link.path ? 'border-b-2 border-gray-800' : ''
                  }`}
              >
                {link.text}
              </a>
            ))}
            <motion.a
            whileTap={{scale:0.96}}
               href="http://localhost:5174"
  target="_blank" // or remove target to open in same tab
  rel="noopener noreferrer"
              className='border border-gray-400 rounded-full py-2 px-4 text-xs font-semibold cursor-pointer text-gray-500'
            >
              Admin Panel
            </motion.a>
          </div>

          {/* Icons */}
          <div className="flex items-center md:gap-6 gap-4 cursor-pointer">
            <motion.img
            whileTap={{ scale: 0.96 }}
              onClick={() => setShowSearch(!showSearch)}
              className='w-[1.4rem]'
              src={assets.search_icon}
              alt="Search"
            />
            <div
            onClick={()=>navigate(token?"/":'/login')}
              className="relative"
              onMouseOver={() => setShowProfileDropdown(true)}
              
            >
              <img
                className='w-[1.4rem] cursor-pointer '
                src={assets.profile_icon}
                alt="Profile"
              />


            </div>

            <motion.div whileTap={{ scale: 0.96 }} onClick={() => token !== ""?navigate('/cart'):navigate('/login')} className="relative">
              <img className='w-[1.4rem]' src={assets.cart_icon} alt="Cart" />
              <div className="rounded-full bg-gray-900 w-4 h-4 absolute  bottom-[0px] left-2 text-white flex items-center justify-center">
                <p className='text-xs'>{getCartCount()}</p>
              </div>
            </motion.div>

            {/* Mobile Menu */}
            <img
              className='w-[1.4rem] md:hidden cursor-pointer'
              src={assets.menu_icon}
              alt="Menu"
              onClick={toggleSbar}
            />
          </div>
        </div>

        {/* Conditionally Render Searchbar */}
        {showSearch && <Searchbar />}
      </div>

      {/* Sidebar for mobile */}
      <div
        onClick={toggleSbar}
        className={`z-20 md:hidden flex flex-col items-start justify-start w-full absolute top-0 inset-x-0 pt-8 py-3 gap-4 bg-white shadow-lg
      ${sidebar ? "left-0" : "-left-full"} transition-all duration-300`}
      >
        {sLinks.map((itm, index) => (
          <a
            key={index}
            onClick={() => {
              navigate(itm.path);
              setSidebar(false);
            }}
            className={`text-[0.98rem] font-semibold text-gray-600 cursor-pointer py-[0.3rem] px-3 w-full ${location.pathname === itm.path ? "bg-gray-900 text-white" : ""
              }`}
          >
            {itm.text}
          </a>
        ))}

      </div>
      {showProfileDropdown && (
        <div onMouseOver={() => setShowProfileDropdown(true)} onMouseLeave={() => setShowProfileDropdown(false)} className="absolute top-14 right-32 w-40 p-3 bg-gray-100 rounded-sm shadow-xl z-80 flex flex-col items-start gap-2">
          <motion.p  whileTap={{scale:0.96}} onClick={()=>navigate('/')} className="text-sm text-gray-700 hover:text-black cursor-pointer hover:bg-gray-300 w-full text-left p-2 rounded-xs">My Profile</motion.p>
          <motion.p  whileTap={{scale:0.96}} onClick={() => navigate('/orders')} className="text-sm text-gray-700 hover:text-black cursor-pointer hover:bg-gray-300 w-full text-left p-2 rounded-xs">My Orders</motion.p>
          <motion.p whileTap={{scale:0.96}} onClick={handleLogout} className="text-sm text-gray-700 hover:text-black cursor-pointer hover:bg-gray-300 w-full text-left p-2 rounded-xs">Logout</motion.p>
        </div>
      )}
    </>
  );
};

export default Navbar;
