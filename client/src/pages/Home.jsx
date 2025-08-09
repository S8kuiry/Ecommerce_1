import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import Subscription from '../components/Subscription'
import {motion} from 'framer-motion'

const Home = () => {
  return (
    <motion.div 
    initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    className='pb-10'>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <Subscription/>
       
    </motion.div>
  )
}

export default Home