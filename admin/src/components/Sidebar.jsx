import React, { useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'

const sContent = [
  { name: "Add Items", icon: assets.add_icon, path: '/' },
  { name: "List Items", icon: assets.order_icon, path: '/list' },
  { name: "Order Items", icon: assets.order_icon, path: "/order" }
]

const Sidebar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const getActiveItem = () => {
    const match = sContent.find(itm => itm.path === location.pathname)
    return match ? match.name : sContent[0].name
  }

  const [state, setState] = useState(getActiveItem)

  useEffect(() => {
    setState(getActiveItem())
  }, [location.pathname])

  return (
    <div className='h-full border-r-2 border-gray-300/90
      flex flex-col items-end justify-start w-[13vh] sm:w-[35vh] top-18 gap-6 pt-8'>
      {sContent.map((itm) => (
        <motion.div
          key={itm.name}
          onClick={() => { setState(itm.name); navigate(itm.path || '/') }}
          className={`cursor-pointer border-t border-l border-b border-gray-400
            sm:min-w-[80%] min-w-[80%] w-auto pl-3 py-2
            rounded-tl-sm rounded-bl-sm
            ${state === itm.name ? "bg-[#ffebf5]" : ""}
            flex items-center justify-start gap-3 sm:pl-4 group`}
        >
          <motion.div
            className="flex items-center gap-3 h-full"
            whileHover={{ x: -10 }}
          >
            <img src={itm.icon} className="w-5" alt={itm.name} />
            <p className="hidden sm:block">{itm.name}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default Sidebar
