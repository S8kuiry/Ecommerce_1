import React from 'react'
import { assets } from '../assets/frontend_assets/assets'
import Title from '../components/Title'
import {motion} from 'framer-motion'

const About = () => {
  return (
    <motion.div
    initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
     className='w-full min-h-[70vh] h-auto py-14 flex  flex-col items-center justify-start px-5 '>
      <div className="my-6 text-3xl">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-15">
        <motion.img whileTap={{scale:0.96}} src={assets.about_img} className='sm:w-[40%] w-[100%] cursor-pointer'></motion.img>
        <div className="sm:w-[45%] w-[100%] h-auto  flex flex-col items-start justify-start ">
          <p className='text-sm text-gray-500'>Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. Our journey began with a simple idea: to provide a platform where customers can easily discover, explore, and purchase a wide range of products from the comfort of their homes.</p>
          <br></br>
          <p className='text-sm text-gray-500'>Since our inception, we've worked tirelessly to curate a diverse selection of high-quality products that cater to every taste and preference. From fashion and beauty to electronics and home essentials, we offer an extensive collection sourced from trusted brands and suppliers.</p>
          <br></br>
          <p className='font-semibold text-gray-500 my-4'>Our Mission</p>
          <p className='text-sm text-gray-500'>Our mission at Forever is to empower customers with choice, convenience, and confidence. We're dedicated to providing a seamless shopping experience that exceeds expectations, from browsing and ordering to delivery and beyond.</p>

        </div>
      </div>
      <div className="mt-12 w-full flex items-center justify-start">
        <div className="text-2xl">
          <Title text1={"WHY"} text2={"CHOOSE US"} />
        </div>
      </div>
      <div className="mt-14 my-20 w-full h-auto flex items-center justify-start">
  <div className="flex flex-col md:flex-row flex-wrap items-center justify-center w-full border cursor-pointer">
    
    <div className="w-full h-55  md:w-[32%] border-b md:border-b-0 md:border-r flex flex-col items-start justify-start gap-3 p-4 text-sm text-gray-500">
      <p className="font-semibold mt-6">Quality Assurance:</p>
      <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
    </div>

    <div className="w-full h-55 md:w-[32%] border-b md:border-b-0 md:border-r flex flex-col items-start justify-start gap-3 p-4 text-sm text-gray-500">
      <p className="font-semibold mt-6">Quality Assurance:</p>
      <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
    </div>


    <div className="w-full h-55 md:w-[32%] border-b md:border-b-0  flex flex-col items-start justify-start gap-3 p-4 text-sm text-gray-500">
      <p className="font-semibold mt-6">Quality Assurance:</p>
      <p>We meticulously select and vet each product to ensure it meets our stringent quality standards.</p>
    </div>


  </div>
</div>


    </motion.div>
  )
}

export default About