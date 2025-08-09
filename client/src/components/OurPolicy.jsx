import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'

const policies = [
  {
    image: assets.exchange_icon,
    policy: "Easy Exchange Policy",
    service: "We offer hassle free exchange policy"
  },
  {
    image: assets.quality_icon,
    policy: "7 Days Return Policy",
    service: "We provide 7 days free return policy"
  },
  {
    image: assets.support_img,
    policy: "Best Customer Support",
    service: "We provide 24/7 customer support"
  }
]

const OurPolicy = () => {
  return (
    <div className="my-20 sm:my-40 w-full flex justify-center">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-20 items-center justify-center flex-wrap">
        {policies.map((itm, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.3 }}
            className="cursor-pointer flex flex-col items-center text-center max-w-xs"
          >
            <img src={itm.image} alt={itm.policy} className="w-11 mb-4" />
            <p className="text-sm font-semibold">{itm.policy}</p>
            <p className="text-sm text-gray-500">{itm.service}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default OurPolicy
