import React, { useState } from 'react'
import CartTotal from '../components/CartTotal'
import Title from '../components/Title'
import { assets, } from '../assets/frontend_assets/assets'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'

const PlaceOrder = () => {
  const { cartItems, getCartAmount, backendUrl, token, setCartItems, products } = useContext(ShopContext)
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData(data => ({ ...data, [name]: value }))
  }
  const navigate = useNavigate()


  // helper function to load script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      // already loaded
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

  const initpay = async (order) => {
    const loaded = await loadRazorpayScript();
  if (!loaded) {
    toast.error("Razorpay SDK failed to load. Please check your connection.");
    return;
  }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Order Payment",
      description: "Order Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const {data} = await axios.post(backendUrl+'/api/order/verify',response,{
            headers: {
                Authorization: `Bearer ${token}`

              },

          })
          if(data.success){
            navigate('/orders')
            setCartItems({})
          }
          
        } catch (error) {
          console.log(error)
          toast.error(error.message)
          
        }
      }


    }
    const rzp = new window.Razorpay(options)
    rzp.open()

  }


  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.sizes = item;
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }

      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + 10


      }
      switch (method) {
        // method cod 
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`

              },
            }
          )
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
            console.log(response.data)
          } else {
            toast.error(response.data.message)
          }
          break;
        case 'razorpay':
          const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {
            headers: {
              Authorization: `Bearer ${token}`

            },
          })
          if (responseRazorpay.data.success) {
            initpay(responseRazorpay.data.order)
          }

          break

        default:
          break

      }

    } catch (error) {
      console.log(error)
      toast.error(error)



    }

  }

  
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className='h-auto  w-full flex flex-col sm:flex-row  items-center justify-between pt-18 pb-25 '>
      <div className="w-[100%] sm:w-[50%] h-[100%] flex flex-col items-center gap-5 ">
        <div className="text-2xl mb-[-10px]">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="w-full flex items-center justify-between px-3">
          <input type='text' onChange={onChangeHandler} name="firstName" value={formData.firstName} className='h-10 w-[49%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='First Name'></input>
          <input type='text' onChange={onChangeHandler} name='lastName' value={formData.lastName} className='h-10 w-[49%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='Last Name'></input>

        </div>

        <div className="w-full flex items-center justify-between px-3">
          <input onChange={onChangeHandler} name='email' value={formData.email} type='email' className='h-10 w-[100%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='Email Address'></input>

        </div>

        <div className="w-full flex items-center justify-between px-3">
          <input onChange={onChangeHandler} name='street' value={formData.street} type='text' className='h-10 w-[100%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='Street'></input>

        </div>

        <div className="w-full flex items-center justify-between px-3">
          <input type='text' onChange={onChangeHandler} name='city' value={formData.city} className='h-10 w-[49%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='City'></input>
          <input type='text' onChange={onChangeHandler} name='state' value={formData.state} className='h-10 w-[49%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='State'></input>

        </div>

        <div className="w-full flex items-center justify-between px-3">
          <input type='number' onChange={onChangeHandler} name="zipcode" value={formData.zipcode} className='h-10 w-[49%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='Zip Code'></input>
          <input onChange={onChangeHandler} name='country' value={formData.country} type='text' className='h-10 w-[49%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='Country'></input>

        </div>

        <div className="w-full flex items-center justify-between px-3">
          <input onChange={onChangeHandler} name='phone' value={formData.phone} type='phone' className='h-10 w-[100%] outline-none rounded-sm p-2 border placeholder:text-sm' placeholder='Phone'></input>

        </div>
      </div>

      <div className="w-[100%] sm:w-[40%] h-[100%] flex flex-col items-center mt-10 sm:mt-0 sm:items-end justify-start">
        <CartTotal />

        <div className="w-100 mt-10 flex flex-col  items-center justify-start">
          <div className="w-full flex items-center justify-start">
            <Title text1={"PAYMENT"} text2={"METHOD"} />

          </div>
          <div className="flex items-center justify-start gap-2 w-full">



            <div onClick={() => setMethod("razorpay")} className="cursor-pointer w-28 h-10 border flex items-center justify-center gap-6 ">
              <span className={`h-3 w-3 rounded-[50%] border ${method === "razorpay" ? "bg-green-400 " : ""}`}></span>
              <img src={assets.razorpay_logo} className='w-13'></img>
            </div>

            <div onClick={() => setMethod("cod")} className="cursor-pointer w-38  h-10 border flex items-center justify-center gap-2 ">
              <span className={`h-3 w-3 rounded-[50%] border ${method === "cod" ? "bg-green-400" : ""}`}></span>
              <p className='text-xs'>CASH ON DELIVERY</p>
            </div>

          </div>

          <div className="w-full flex items-center justify-end mt-9">
            <motion.button whileTap={{ scale: 0.96 }} onClick={onSubmitHandler} className='cursor-pointer w-auto px-6 py-2 text-white bg-gray-900 text-xs'>PLACE ORDER</motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PlaceOrder 