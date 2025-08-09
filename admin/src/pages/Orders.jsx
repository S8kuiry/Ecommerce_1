import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "../components/Loader";

const Orders = ({ token }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false)

  const getOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setOrders((response.data.orders || []).reverse());
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
    setLoading(false)
  };


  const updateStatus = async (event, orderId) => {

    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success(response.data.message)

    } catch (error) {
      console.log(error.message);
      toast.error(error.message);


    }

  }

  useEffect(() => {
    getOrders();

  // Poll every 5 seconds instead of 1 to reduce server load
  const interval = setInterval(() => {
    getOrders();
  }, 10000);

  // Cleanup on unmount
  return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-3 px-10 pb-20">
      <p className="text-left text-gray-500">Order Page</p>
      <div className="w-[100%] mt-4 flex flex-col items-center justify-start gap-3">
        {!loading?orders.map((itm) => (

          <div
            key={itm._id}
            className="  w-full w-auto sm:min-w-[100%] border border-gray-300 sm:min-h-45 h-auto flex flex-col  sm:flex-row items-start justify-around p-4 gap-2 sm:pt-5 "
          >
            <img src={assets.parcel_icon} className="w-14" alt="parcel" />
            <div className="h-[100%] flex flex-col items-start justify-start gap-2 text-sm max-w-xs">
              <p>
                <span className="text-gray-600 font-semibold">Items</span>:{" "}
                {itm.items?.map((product, index) => (
                  <span key={product._id}>
                    {product.name}
                    {index < itm.items.length - 1 ? ", " : ""}
                  </span>
                ))}
              </p>
              <p ><span className="text-gray-600 font-semibold">Name</span> : {itm.address.firstName} {itm.address.lastName}</p>
              <p>{itm.address.city}</p>
              <p>{itm.address.street},{itm.address.zipcode},{itm.address.state}</p>

            </div>

            <div className="h-[100%] flex flex-col items-start justify-start gap-2 text-sm">
              <p>
                Items:{itm.items.length}

              </p>
              <p>Method: {itm.paymentMethod}</p>
              <p>Payment: {itm.payment ? "Paid" : "Pending"}</p>
              <p>Date: Date: {new Date(itm.date).toLocaleDateString('en-GB')}</p>
            </div>

            <p className="font-bold">${itm.amount}</p>

            <div className="cursor-pointer relative inline-block sm:w-32 w-30 my-2 h-[100%] flex flex-col items-start">
              <select
                onChange={(event) => updateStatus(event, itm._id)}
                value={itm.status}
                className="text-gray-900 w-[100%] py-2 cursor-pointer bg-transparent appearance-none border-2 border-gray-300 text-sm pl-3 pr-8 outline-none rounded"
                defaultValue="Packing"
              >
                <option value="Packing">Packing</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>



        )):(
          <Loader/>
        )}
      </div>
    </div>
  );
};

export default Orders;
