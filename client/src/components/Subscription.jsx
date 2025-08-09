import React from 'react'

const Subscription = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center mt-[-2rem] mb-8 gap-5">
      <p className="text-xl sm:text-2xl font-bold text-center">Subscribe now & get 20% off</p>

      <p className="w-[100%] sm:w-full text-center text-gray-600 text-sm sm:text-base mb-3">
        Stay updated with the latest deals and product launches. Subscribe now for exclusive discounts, early access tailored just for you!
      </p>

      <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3 sm:gap-0 sm:border border-gray-400 rounded overflow-hidden">
        <input
          className="flex-1 px-4 py-3 text-sm sm:text-base outline-none border  sm:border-0"
          placeholder="Enter your email address"
        />
        <button className="bg-gray-900 text-white px-6 py-3 text-sm sm:text-base hover:bg-gray-800 transition">
          SUBSCRIBE
        </button>
      </div>
    </div>
  )
}

export default Subscription
