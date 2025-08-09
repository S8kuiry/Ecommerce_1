import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Collection = () => {
  const { products, currency,search,showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category,setCategory] = useState([])
  const [subcategory,setSubCategory] = useState([])
  const [sortType,setSortType] = useState('')

  

{/*------------------ tooglecategory --------------------- */}
  const toggleCategory = (e)=>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item=> item !==  e.target.value))
    }else{
      setCategory(prev => [...prev,e.target.value])
    }
  }
{/*------------------- togglesubcategory ------------------ */}
  const toggleSubCategory = (e)=>{
    if(subcategory.includes(e.target.value)){
      setSubCategory(prev=>prev.filter(item=>item !== e.target.value))

    }else{
      setSubCategory(prev=>[...prev,e.target.value])
    }
  }

  

{/*-------------- apply filter ---------------- */}
  const applyFilter = ()=>{
    let productsCopy = products.slice()

    if(category.length > 0){
      productsCopy = productsCopy.filter(item=> category.includes(item.category))
    }
    if(subcategory.length > 0){
      productsCopy = productsCopy.filter(item => subcategory.includes(item.subcategory))
    }
    setFilterProducts(productsCopy)
  }

  {/* ------------------- sort product -------------- */}
  const sortProduct = ()=>{
    let fltCopy = filterProducts.slice()


    switch(sortType){
      case "low-high":
        setFilterProducts(fltCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case "high-low":
        setFilterProducts(fltCopy.sort((a,b)=>(b.price- a.price)));
        break;
      default :
        applyFilter();
        break


    }
  }

  
 useEffect(() => {
  setFilterProducts(products)  
  }, [products])

  {/*----------- apply filter -------------- */}
  useEffect(()=>{
    applyFilter();
  },[category,subcategory])
{/*------------ sort product ------------------- */}
  useEffect(()=>{
    sortProduct()
  },[sortType])

 {/*--------------- search products by name  from navbar  --------------- */}
 useEffect(()=>{
  if(search.trim() !== ""){
    let filtered = products.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    setFilterProducts(filtered)
  }else{
    applyFilter()
  }
 },[search,category,subcategory]) 

 
  return (
    <motion.div 
       initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    className={` transition-all duration-300 flex flex-col sm:flex-row gap-10 pt-10  pb-20 ${showSearch?"transition-all duration-300 pt-20":""}`}>
      {/* Left Filters */}
      <motion.div
     

       className="min-w-53 px-4 cursor-pointer">
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTER
          <img
            className={`h-3 sm:hidden transform transition-transform duration-300 ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown"
          />
        </p>

        {/* CATEGORY FILTER */}
        <div className={`border border-gray-500 pl-5 py-3 mt-3 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 font-semibold text-sm'>CATEGORIES</p>
          {["Men", "Women", "Kids"].map(cat => (
            <div key={cat} className="flex items-center gap-2 text-gray-700 sm:text-sm">
              <input type='checkbox' value={cat} onChange={(e)=> toggleCategory(e)} />
              <p>{cat}</p>
            </div>
          ))}
        </div>

        {/* TYPE FILTER */}
        <div className={`border border-gray-500 pl-5 py-3 mt-6 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 font-semibold text-sm'>TYPE</p>
          {["Topwear", "Bottomwear", "Winterwear"].map(type => (
            <div key={type} className="flex items-center gap-2 text-gray-700 sm:text-sm">
              <input type='checkbox' value={type} onChange={(e)=>toggleSubCategory(e)}/>
              <p>{type}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Right Content */}
      <div className="flex-1 pt-2 relative flex flex-col  gap-6 ">
        {/* Header */}
        <div className=" flex items-center justify-between text-base sm:text-2xl sticky ">
          <div className="h-full flex items-center justify-center ">
            <Title text1={"ALL"} text2={"COLLECTIONS"}  />
          </div>

          {/* Sort Dropdown */}
          <div className="cursor-pointer relative inline-block w-auto ">
            <select
            onChange={(e)=>setSortType(e.target.value)}
              className="cursor-pointer bg-transparent appearance-none border-2 border-gray-300 text-sm py-2 pl-3 pr-8 outline-none rounded"
              defaultValue={"relavant"}
            >
              <option value="relavant">Sort By: Relavant</option>
              <option value="low-high">Sort By: Low to High</option>
              <option value="high-low">Sort By: High to Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:h-150 h-100 overflow-y-scroll">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((itm) => (
            <Link to={`/product/${itm._id}`} key={itm._id} className=" flex flex-col items-start justify-start w-[14rem] h-[21rem] gap-2 ">
              <div className="relative w-full h-[16rem] overflow-hidden">
                <motion.img
                  whileHover={{ scale: 1.12 }}
                  src={itm.image[0].url}
                  alt={itm.name}
                  className='absolute inset-0 w-full h-full object-cover cursor-pointer'
                />
              </div>
              <p className='text-sm text-gray-500'>{itm.name}</p>
              <p className='font-semibold'>{currency}{itm.price}</p>
            </Link>
          ))}
        </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Collection
