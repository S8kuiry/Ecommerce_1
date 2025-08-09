import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [state, setState] = useState(true); // true = login, false = signup
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { backendUrl ,token,setToken} = useContext(ShopContext)
  const navigate = useNavigate()


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    // Use name, email, password here
    if (state) {
      try {
        const response = await axios.post(backendUrl+'/api/user/login',{email,password})
        if(response.data.success){
          toast.success(response.data.message)
          const receivedToken = response.data.token;
setToken(receivedToken);
localStorage.setItem('userToken', receivedToken);

          navigate('/cart')
          
        }else{
          toast.error(response.data.message)
        }

        
      } catch (error) {
        console.log(error)
        toast.error(error)
        
      }

    } else {
      try {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
        if (response.data.success) {
          toast.success("Registered Successfully")
          toast.login("Please Login to continue")
        } else {
          toast.error(response.data.message)
        }

      } catch (error) {
        console.log(error)
        toast.error(error)

      }

    }
  };

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="w-full min-h-[80vh] h-auto flex flex-col items-center justify-start py-20"
    >
      <form
        onSubmit={onSubmitHandler}
        className="w-100 flex flex-col items-center justify-start gap-4"
      >
        <div className="text-3xl">
          <Title text1={state ? 'Login' : 'Sign'} text2={state ? '' : 'Up'} />
        </div>

        {!state && (
          <input
            type="text"
            className="w-[90%] py-2 px-2 border border-gray-900/50 outline-none"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          className="w-[90%] py-2 px-2 border border-gray-900/50 outline-none"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="w-[90%] py-2 px-2 border border-gray-900/50 outline-none"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <motion.button
          whileTap={{ scale: 0.96 }}
          type="submit"
          className="cursor-pointer w-[90%] py-2 px-1 border text-white bg-gray-900"
        >
          {state ? 'Login' : 'Sign Up'}
        </motion.button>

        <div className="w-[90%] py-2 px-1 flex items-center justify-center">
          {state ? (
            <p className="text-sm text-gray-600">
              Don't have an Account?{' '}
              <span
                onClick={() => setState(false)}
                className="text-gray-900 font-medium cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Already have an Account?{' '}
              <span
                onClick={() => setState(true)}
                className="text-gray-900 font-medium cursor-pointer"
              >
                Login
              </span>
            </p>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default Login;
