import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import {motion} from 'framer-motion'

const Contact = () => {
  return (
    <motion.div
    initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}

     className='w-full min-h-screen h-auto py-14 flex flex-col items-center justify-start px-4 sm:px-8'>
      <div className="text-3xl mb-6 text-center">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:gap-12 gap-8 mt-6">
        <motion.img
        whileTap={{scale:0.96}}
          src={assets.contact_img}
          className='w-full sm:w-[45%]  shadow-md object-cover'
          alt="Contact Us"
        />

        <div className="w-full sm:w-[45%] h-auto flex flex-col items-start justify-start gap-4 text-gray-600 text-sm">
          <p className='font-semibold'>OUR STORE</p>
          <p>54709 Willms Station<br />Suite 350, Washington, USA</p>

          <div>
            <p>Tel: (415) 555‑0132</p>
            <p>Email: greatstackdev@gmail.com</p>
          </div>

          <p className='font-semibold mt-4'>Careers at Forever</p>
          <p>Learn more about our teams and job openings.</p>

          <button className='py-2 px-4 border border-gray-700 text-gray-700 hover:bg-gray-800 hover:text-white transition-all duration-300 mt-2'>
            Explore Jobs
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Contact
