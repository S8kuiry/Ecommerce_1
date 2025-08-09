import React, { useContext, useEffect, useState } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const BestSeller = () => {
    const { products, currency } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        setBestSeller(products.filter((pdt) => pdt.bestseller === true))

    }, [products])

    return (
        <div className='mt-19 flex flex-col items-center justify-center gap-2'>
            <div className="text-center text-3xl ">
                <Title text1={"BEST"} text2={"SELLERS"} />
                <p className=' text-gray-600/90 md:text-[1.01rem]  text-center text-sm ' >Discover our best sellers — where timeless style meets modern trends. Shop now and elevate your wardrobe with exclusive new arrivals!</p>

            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
                {bestSeller.map((itm) => (
                    <Link to={`/product/${itm._id}`} className="flex flex-col items-start justify-start w-[14rem] h-[21rem] gap-2 m-2">
                        <div className="relative w-full h-[16rem] overflow-hidden">< motion.img
                            whileHover={{ scale: 1.12 }}
                            src={itm.image[0].url} className='absolute inset-x-0 inset-y-0 cursor-pointer ' /></div>
                        <p className='text-sm text-gray-500'>{itm.name}</p>
                        <p className='font-semibold'>{currency}{itm.price}</p>

                    </Link>
                ))}
            </div>
        </div>
    )
}

export default BestSeller