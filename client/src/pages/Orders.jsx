import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Orders = () => {
  const { currency, backendUrl, token } = useContext(ShopContext);
  const [demoPdts, setDemoPdts] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/order/useorders`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        // Flatten all order items into one array for rendering
        const allItems = response.data.orders.flatMap(order =>
          order.items.map(item => ({
            ...item,
            price: order.amount, // assuming amount is total price
            status: order.status,
            date: order.date,
            payment: order.payment,
            paymentMethod: order.paymentMethod
          }))
        );

        // Only update state if the data has actually changed
        if (JSON.stringify(allItems) !== JSON.stringify(demoPdts)) {
          setDemoPdts(allItems);
        }
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // Fetch immediately on mount
    getOrders();

    // Then set up interval for refreshing
    const interval = setInterval(() => {
      getOrders();
    }, 10000); // every 10 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, [backendUrl, token, demoPdts]); // dependency so new token/backendUrl still works

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="pt-14 pb-20 px-2 sm:px-6 md:px-10"
    >
      <div className="text-2xl sm:text-3xl pb-5">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>

      <div className="min-h-[40vh] h-auto w-full">
        <div className="w-full flex flex-col gap-4">
          {demoPdts.map((itm, index) => (
            <div
              key={index}
              className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between border-t py-4 gap-4 sm:gap-0"
            >
              {/* Product Section */}
              <div className="w-full sm:w-[40%] flex items-center gap-3">
                <img
                  src={itm.image?.[0]?.url || '/placeholder.jpg'}
                  className="w-16 sm:w-20"
                  alt="product"
                />

                <div className="flex flex-col justify-between gap-2">
                  <p className="text-sm sm:text-base font-semibold">
                    {itm.name}
                  </p>
                  <div className="flex items-center gap-3 text-sm">
                    <p className="font-semibold">
                      {currency}
                      {itm.price}
                    </p>
                    {itm.sizes?.[0] && (
                      <div className="min-w-[1.5rem] h-[1.5rem] px-2 flex items-center justify-center border border-gray-300 bg-gray-300/40 text-sm">
                        {itm.sizes[0]}
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-xs">
                    Date:{' '}
                    <span className="font-normal text-gray-400">
                      {itm.date || 'Unknown'}
                    </span>
                  </p>
                  <p className="text-xs">
                    <span className="font-semibold">Payment</span> :{' '}
                    <span className="font-normal text-gray-400">
                      {itm.paymentMethod}
                    </span>
                  </p>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex items-center gap-2 sm:w-[35%]">
                <span className="w-3 h-3 rounded-full bg-green-400"></span>
                <p className="text-xs sm:text-sm">{itm.status}</p>
              </div>

              {/* Button Section */}
              <div className="w-full sm:w-auto flex justify-start sm:justify-end">
                <button className="text-xs sm:text-sm px-4 py-2 border">
                  TRACK ORDER
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <hr className="w-full mt-4" />
    </motion.div>
  );
};

export default Orders;
