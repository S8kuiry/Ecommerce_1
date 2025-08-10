import React, { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import {Toaster} from 'react-hot-toast'

const App = () => {
  const [token,setToken] = useState("")
  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if(storedToken) setToken(storedToken)
     
  },[])
  return (
    token === ""?<Login setToken={setToken}/>:
    <>
    <Toaster position='top-center'/>
      <Navbar setToken={setToken} />

      <div className='w-full fixed top-18 inset-x-0 h-[95vh] flex items-center justify-between' >
        <Sidebar />
        <div className=" h-[100%] w-[83%] overflow-y-scroll p-5 pb-15" >
          <Routes>
            <Route path='/' element={<Add token={token}/>}></Route>
            <Route path='/list' element={<List token={token} />}></Route>
            <Route path='/order' element={<Orders token={token} />}></Route>


          </Routes>
        </div>

      </div>
    </>
  )
}

export default App