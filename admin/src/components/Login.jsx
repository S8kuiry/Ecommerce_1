import React from 'react'
import {motion} from 'framer-motion'
import { useState } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'


const Login = ({setToken}) => {
    const [email,setEmail] = useState("admin@gmail.com")
    const [password,setPassword] = useState("1234");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const onSubmitHandler = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password})
            if(response.data.success){
                setToken(response.data.token)
                toast.success(response.data.message)
                localStorage.setItem('token',response.data.token)
                
            }


        } catch (error) {
            console.log(error)
            toast.error(error)
 
        }
    }
    

  return (
    <motion.div 
    initial={{y:100,opacity:0}}
    whileInView={{y:0,opacity:1}}
    transition={{duration:2}}
    className='fixed inset-x-0 inset-y-0 flex items-center justify-center bg-gray-100'>
        <form onSubmit={onSubmitHandler} className='w-90  h-85 shadow-lg py-7 px-7 rounded rounded-xl flex flex-col items-start justify-start bg-white gap-3'>
            <h1 className='sm:text-2xl font-bold'>Admin Panel</h1>
            <div  className='w-[100%]'>
                <p>Email Address</p>
                <input readOnly type='text' className='w-[100%] my-2 h-11 outline-none border border-gray-400 rounded px-2' defaultValue={"admin@gmail.com"} ></input>
            </div>
             <div  className='w-[100%]'>
                <p>Password</p>
                <input readOnly type='password' className='w-[100%] my-2 h-11 outline-none border border-gray-400 rounded px-2' defaultValue={"1234"}></input>
            </div>
            <button type='submit' className='cursor-pointer w-full h-11 rounded-sm bg-black text-white flex items-center justify-center'>Login</button>

        </form>

    </motion.div>
  )
}

export default Login