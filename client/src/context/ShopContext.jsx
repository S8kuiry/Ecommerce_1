import { create } from "framer-motion/client";
import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import toast from "react-hot-toast";
import axios from 'axios'



export const ShopContext = createContext();


export const ShopContextProvider = ({ children }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;



    const [products, setProducts] = useState([])
    const [token, setToken] = useState(localStorage.getItem('userToken') || "");
    const currency = '$';
    const delivery_fee = 10
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Please select a size")
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;

        }
        setCartItems(cartData);
        if (token) {
            try {
                const response = await axios.post(backendUrl + '/api/cart/add', { itemId, size }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                if(response.data.success){
                    toast.success("Added to Cart")
                }else{
                    toast.error(response.data.message)
                }

            } catch (error) {
                console.log(error)
                toast.error(error)

            }
        }
    }

    const getCartCount = () => {
        let totoalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totoalCount += 1
                    }

                } catch (error) {

                }
            }

        }
        return totoalCount;
    }

    const getCartAmount = async => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }

                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const updateQuatity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData)
        if(token){
            try {
                await axios.post(
    backendUrl + '/api/cart/update',
    { itemId, size, quantity },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
);

                
            } catch (error) {
                console.log(error)
                toast.error(error)
                
            }
        }


    }


    /*-----------------  get user data ----------------- */
    const getUserCart = async (token)=>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{
                 headers: {
                        Authorization: `Bearer ${token}`,
                    },

            })
            if(response.data.success){
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
            
        }
    }

    /*----------------- fetching product details --------------- */
    const fetchItems = async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            })
           
            if (response.data.success) {
                setProducts(response.data.products)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)

        }
    }

    useEffect(() => {
        fetchItems()
    }, []
    )

    useEffect(()=>{
        if(token || localStorage.getItem('userToken')){
            getUserCart(token)
        }
    },[token])
    const value = {
        axios, token, setToken, products,
        currency, delivery_fee,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart, getCartCount,
        updateQuatity, getCartAmount,
        backendUrl


    }
    return (
        <ShopContext.Provider value={value} >
            {children}
        </ShopContext.Provider>
    )
}

