import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import {motion, rgba} from 'framer-motion'
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products ,addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [image, setImage] = useState(null)
  const [size,setSize] = useState('')
  
  const fetchProducts = async () => {
  setProductData(false); // Clear previous state
  setImage(null);
  setSize('');

  products.map((item) => {
    if (item._id === productId) {
      setProductData(item);
      setImage(item.image[0]);
      setSize(item.sizes[0]);
    }
  });
};


  useEffect(() => {
    window.scrollTo(0, 0); 
    fetchProducts()
  }, [products,productId])

  

  return productData ? (
    <motion.div 
    initial={{y:30,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{duration:1.5}}
    className=' pt-10 transition-opacity ease-in duration-500 opacity-100 py-10 '>
      {/* products Details  */}
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12 ">

        {/*-------- product images  -------------*/}
        <div className="flex-1 flex flex-col-reverse  sm:flex-row gap-3 ">
          <div className="flex sm:flex-col  overflow-x-hidden  sm:overflow-y-scroll justify-between">
            {productData.image.map((item, index) => (
              <img onClick={() => setImage(item)} src={item.url} className='w-[24%] sm:w-[10rem] sm:mb-3 flex-shrink-0 cursor-pointer'></img>
            ))}
          </div>

          {/*----------- Main Image -------------- */}
          <div className="w-full flex justify-center sm:w-[120%] ">
            <img src={image.url} className='w-full h-auto'></img>
          </div>
        </div>
        {/*--------------- priduct info ------------ */}
        <div className="flex-1 flex flex-col w-full h-full gap-3">
          <h1 className="font-semibold text-2xl mb-2">{productData.name}</h1>

          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={index < 4 ? assets.star_icon : assets.star_dull_icon}
                  className="w-3 sm:w-4 mr-1"
                  alt="star"
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">(122)</p>
          </div>

          <p className='my-2 text-2xl font-semibold'>${productData.price}</p>
          <p className='text-gray-500'>{productData.description}</p>

          {/*------- select size ------------- */}
          <p className='mt-4 mb-4'>Select Size</p>
          <div className="flex flex-row  gap-3 items-center justify-start  ">
            {productData.sizes.map((itm) => (
              <div  onClick={()=> setSize(itm)} className={`cursor-pointer  w-auto min-w-[3rem] h-[3rem] flex items-center justify-center  ${size === itm ? " text-white":" shadow-lg"}  bg-gray-300/70`}>
                <p className='text-sm'>{itm}</p>

              </div>

            ))}
          </div>

          {/*----------Add to cart ---------------- */}
          <div className="flex flex-row items-center justify-start mt-5">
            <motion.button whileTap={{scale:0.96}} onClick={()=> addToCart(productData._id,`${size}`)} className='cursor-pointer py-3 px-5 bg-gray-900  text-white text-sm'>ADD TO CART</motion.button>
          </div>

          {/*---------- conclusion ------------- */}
          <div className="flex flex-col items-start justify-start mt-7 gap-6">
            <hr className='w-full bg-[#ADADAD] '></hr>
            <p className='text-[#555555]'>100% Original product.<br></br>

              Cash on delivery is available on this product.<br></br>

              Easy return and exchange policy within 7 days.</p>
          </div>


        </div>   
      </div>
      {/*----------------- ecommerce description and review section ----------------------- */}
        <div className="w-full flex flex-col items-start justify-start mt-20 mb-15 gap-[0.007rem] ">
          <div className="w-auto h-auto cursor-pointer">
            <button 
            
            className='cursor-pointer bg-transparent border border-gray-400 w-40 py-3 font-semibold text-sm hover:bg-gray-200 transition-all duration-300'>Description</button>
            <button className='cursor-pointer bg-transparent border border-gray-400 w-40 py-3 text-sm hover:bg-gray-200 transition-all duration-300'>Reviews(122)</button>

          </div>
          <div className="cursor-pointer w-full sm:h-60 h-auto pb-10 border border-gray-400 flex flex-col items-center justify-start gap-7 px-8 pt-10 text-gray-600 font-medium">
            <p className='text-sm'>An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet.
               It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers,
                and conduct transactions without the need for a physical presence.
               E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.</p>

              <p className='text-sm '>E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations 
                (e.g., sizes, colors).
                 Each product usually has its own dedicated page with relevant information.</p> 
          </div>
        </div>
      {/*----------------- display related products ---------------- */}
      <RelatedProducts category={productData.category} subcategory={productData.subcategory}/>

    </motion.div>
  ) : (
    <div className="h-[70vh] w-full">

    </div>
  )
}

export default Product