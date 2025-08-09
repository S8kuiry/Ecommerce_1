import React, { useContext } from 'react'
import Title from './Title'
import { ShopContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import {motion} from 'framer-motion'

const CartTotal = () => {
    const navigate = useNavigate()
    const {getCartAmount,currency,delivery_fee} = useContext(ShopContext)
  return (
    <div className='h-auto w-100 flex flex-col items-center justify-start gap-2 cursor-pointer'>
        <div className="w-full text-2xl text-left">
            <Title text1={"CART"} text2={"TOTALS"}/>
        </div>
        <div className="w-full flex items-center justify-between border-b text-sm py-3 font-medium ">
            <p>SubTotal</p>
            <p>{currency}{getCartAmount()}.00</p>
        </div>
        <div className="w-full flex items-center justify-between border-b text-sm py-3 font-medium">
            <p>Shipping Fee</p>
            <p>{currency}{10}.00</p>
        </div>
         <div className="w-full flex items-center justify-between font-bold text-sm py-3">
            <p>Total</p>
            <p>{currency}{getCartAmount() === 0?0:getCartAmount() + delivery_fee }.00</p>
        </div>
       
    </div>
  )
}

export default CartTotal