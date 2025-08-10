import React, { useState, useEffect } from 'react';
import { Loader, X } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
const [loading,setLoading] = useState(false)

const Table = ({ token }) => {

  const [productList, setProductList] = useState([]);

  const fetchItems = async () => {
    try {
      
      const response = await axios.get(`${backendUrl}/api/product/list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.products || [];

      setProductList(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch product list');
    }
  };

  useEffect(() => {
    fetchItems(); // initial fetch

    // Optional: refetch every 10s with cleanup
    const interval = setInterval(fetchItems, 10000);
    return () => clearInterval(interval);
  }, []);

 const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this product?');
  if (!confirmDelete) return; // User cancelled, do nothing

  try {
    const response = await axios.delete(`${backendUrl}/api/product/remove`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: { id },
    });

    if (response.data.success) {
      toast.success('Product Deleted Successfully');
      fetchItems();
    } else {
      toast.error(response.data.message || 'Failed to delete');
    }
  } catch (error) {
    toast.error('Error deleting product');
    console.error(error);
  }
};



  return (
    <div className="w-[95%] px-3 py-4 absolute top-0">
      {/* Desktop table */}
      <div className="hidden md:block overflow-auto border border-gray-200 shadow-sm rounded">
        <table className="min-w-full table-fixed">
          <thead className="bg-gray-100 sticky top-0 z-10">
            <tr>
              <th className="text-left px-4 py-2 w-24">Image</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Category</th>
              <th className="text-left px-4 py-2">Price</th>
              <th className="text-left px-4 py-2 w-20">Action</th>
            </tr>
          </thead>
          <tbody>
            {productList?.length > 0 ? (
              productList.map((item) => (
                <tr
                  key={item._id}
                  className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-4 py-3">
                    <img
                      src={item.image?.[0]?.url || 'https://via.placeholder.com/60'}
                      alt={item.name}
                      className="w-10 h-10 object-cover"
                    />
                  </td>
                  <td className="px-4 py-3">{item.name}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">₹{item.price}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="cursor-pointer pl-3 text-black hover:text-red-500 transition"
                    >
                      <X size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 py-5">
                  No items to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-4 mt-4 w-full">
        {productList?.length === 0 ? (
          <div className="text-center text-gray-400 py-5">No items to display.</div>
        ) : (
          productList.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-sm shadow-sm p-4 flex items-start gap-4"
            >
              <img
                src={item.image?.[0]?.url || 'https://via.placeholder.com/60'}
                alt={item.name}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-base">{item.name}</h3>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="text-black hover:text-red-500 transition"
              >
                <X size={18} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Table;
