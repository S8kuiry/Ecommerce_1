import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import { assets } from '../assets/frontend_assets/assets';
import CartTotal from '../components/CartTotal';
import {motion} from 'framer-motion'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
        
  const { products, currency, cartItems,updateQuatity } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const tempData = [];
    if(products.length > 0){
      
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item]

          })
        }
      }

    }
    
    }
    setCartData(tempData)
  }, [cartItems])
  return cartData.length > 0 ? (
    <motion.div 
    initial={{y:50,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{duration:1.5}}
    className=' pt-14 pb-20'>
      <div className="text-3xl  pb-3">
        <Title text1={"YOUR"} text2={"CART"} />

      </div>
      <div className="min-h-[40vh]  h-auto ">
        {
          cartData.map((item, index) => {
            const productData = products.find((product) => product._id === item.id)

            return (
              <div className="mt-3 py-3 border-t  text-gray-700 grid grid-cols-[2fr_1fr_0.5fr] sm:grid-cols-[2.5fr_2fr_0.5fr] items-center gap-2">
                <div className="h-full flex items-center justify-start gap-3 ">
                  <img src={productData.image[0].url} className='w-16 sm:w-20'></img>

                  {/*---------- details sec ----------- */}
                  <div className="h-full flex flex-col items-start justify-start sm:gap-6 gap-0">
                    <p className='font-semibold text-xs sm:text-large '>{productData.name}</p>


                    <div className="flex items-center justify-start gap-5 mt-2 text-sm">
                      <p className='font-medium text-gray-900 text-sm'>{currency}{productData.price}</p>

                      <div className={`cursor-pointer  w-auto min-w-[2rem] h-[2rem] flex items-center justify-center border border-gray-300 bg-gray-300/40`}>
                        <p className='text-sm'>{item.size}</p>

                      </div>

                    </div>
                  </div>

                </div>
                
                {/*--------------- quantity section ---------------- */}
                <div className="w-full flex items-center justify-start">
                  <input onChange={(e)=>e.target.value === "" || e.target.value === 0?null:updateQuatity(item.id,item.size,Number(e.target.value))
                  } type='number' min={1} defaultValue={item.quantity} className='border max-w-18  sm:max-w-20 px-1 sm:px-2 py-1 outline-none'></input>
                </div>
                {/*----------- bin icon ----------*/}
                <img onClick={()=>updateQuatity(item.id,`${item.size}`,0)} src={assets.bin_icon} className='w-5 cursor-pointer'></img>
                
              </div>
            )
          })
        }
        <hr className='w-full '></hr>
        <div className="w-full min-h-60 h-auto py-4 flex flex-col items-end justify-end  py-10 pt-12">
          <CartTotal/>
           <div className="w-full flex items-center justify-end pt-4"  >
            <motion.button whileTap={{scale:0.96}} onClick={()=>navigate('/place-order')} className='cursor-pointer py-2 px-4 text-white bg-gray-900 text-sm' >Proceed to checkout</motion.button>
        </div>
        </div>
      </div>
    </motion.div>
  ) : (
    <div className="w-full h-[70vh] items-center justify-center flex">
      <p className='text-4xl font-semibold '>Your Cart is Empty!!</p>
    </div>
  )
}

export default Cart