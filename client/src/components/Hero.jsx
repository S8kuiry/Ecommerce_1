import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 mt-10 h-auto '>
      {/*----------- Hero left side ---------*/}
      {/* Hero left side */}
<div className="w-full sm:w-[50%] flex items-center justify-center py-10 sm:py-0 h-[40vh] sm:h-auto">
  <div className="text-[#414141] flex flex-col items-center justify-center text-center">
    <div className="flex items-center gap-2">
      <p className="w-8 md:w-11 bg-[#414141] h-[2px]"></p>
      <p className="font-semibold text-sm md:text-base md:text-xl">OUR BESTSELLERS</p>
    </div>
    <h1 className="  text-3xl sm:py-3 lg:text-6xl leading-relaxed ">
      Latest Arrivals
    </h1>
    <div className="flex items-center gap-2">
      <p className="font-semibold text-sm md:text-base md:text-xl">SHOP NOW</p>
      <p className="w-8 md:w-11 bg-[#414141] h-[2px]"></p>
    </div>
  </div>
</div>


      {/*----------- Hero right side ---------*/}
      <div className="w-full sm:w-[50%] h-[45vh] sm:h-full">
        <img
          src={assets.hero_img}
          alt="hero"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Hero
