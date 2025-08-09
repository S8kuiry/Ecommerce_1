import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
import Title from './Title'



const RelatedProducts = ({category,subcategory}) => {
    const {products,currency} = useContext(ShopContext)
    const [related,setRelated] = useState([])

    useEffect(()=>{
        if(products.length > 0){
            let productsCopy = products.slice();
            productsCopy = productsCopy.filter(item => item.category === category);
            productsCopy = productsCopy.filter(item => item.subcategory === subcategory);
            setRelated(productsCopy)

        }

    },[products,category,subcategory])

  return (
    <div className='w-full flex flex-col items-center justify-center mt-14'>
      <div className="text-center text-3xl">
        <Title text1={"RELATED"} text2={"PRODUCTS"}/>
      </div>
        <div className="w-full overflow-y-scroll h-[50vh]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        {related.map((itm)=>(
          <Link to={`/product/${itm._id}`} className="flex flex-col items-start justify-start w-[14rem] h-[21rem] gap-2 m-2">
            <div className="relative w-full h-[16rem] overflow-hidden">< motion.img 
            whileHover={{scale:1.12}}
             src={itm.image[0].url} alt={itm.image[0]} className='absolute inset-x-0 inset-y-0 cursor-pointer '/></div>
            <p className='text-sm text-gray-500'>{itm.name}</p>
            <p className='font-semibold'>{currency}{itm.price}</p>
            
          </Link>
        ))}
      </div>
        </div>
    </div>
  )
}

export default RelatedProducts