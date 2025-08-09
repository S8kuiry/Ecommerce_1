import React, { useState } from 'react';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';
import Loader  from '../components/Loader.jsx';

const sizes = ['S', 'M', 'L', 'X', 'XL', 'XXL'];

const Add = ({ token }) => {
  const [loading,setLoading] = useState(false)
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [category, setCategory] = useState('Men');
  const [subcategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestSeller] = useState(false);
  const [selectedSizes, setSizes] = useState([]);
  const [price, setPrice] = useState('200');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const onSubHandler = async (e) => {
    e.preventDefault();

    if (!name || !description || !image1) {
      toast.error("Please fill all required fields and upload at least 1 image.");
      return;
    }

    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('subcategory', subcategory);
      formData.append('bestseller', JSON.stringify(bestseller));
      formData.append('price', price);
      formData.append('sizes', JSON.stringify(selectedSizes));

      if (image1) formData.append('image1', image1);
      if (image2) formData.append('image2', image2);
      if (image3) formData.append('image3', image3);
      if (image4) formData.append('image4', image4);

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        
        // Reset form
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
        setCategory('Men');
        setSubCategory('Topwear');
        setBestSeller(false);
        setSizes([]);
        setPrice('200');
        setName('');
        setDescription('');
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product.');
    }
    setLoading(false)
  };

  return (
    loading?<Loader/>:
    <form
      className="w-full h-full flex flex-col items-start justify-start gap-5 sm:pl-10 pl-3 overflow-y-scroll pb-30"
      onSubmit={onSubHandler}
    >
      <p className="font-semibold">Upload Image</p>
      <div className="w-full flex items-center justify-start gap-3">
        {[image1, image2, image3, image4].map((img, index) => (
          <label key={index} className="cursor-pointer w-fit">
            <img
              src={!img ? assets.upload_area : URL.createObjectURL(img)}
              className="w-26"
              alt={`upload-${index}`}
            />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const setter = [setImage1, setImage2, setImage3, setImage4][index];
                setter(e.target.files[0]);
              }}
            />
          </label>
        ))}
      </div>

      <label className="sm:w-1/2 w-full my-2">
        <p>Product Name</p>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 outline-none border border-gray-300 rounded-sm h-11"
        />
      </label>

      <label className="sm:w-1/2 w-full my-2">
        <p>Product Description</p>
        <textarea
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 outline-none border border-gray-300 rounded-sm"
          rows={4}
        />
      </label>

      <div className="w-full flex flex-wrap items-center justify-start gap-8">
        <div>
          <p>Product Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-gray-400 w-full py-2 border-2 border-gray-300 text-sm pl-3 pr-8 outline-none rounded"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p>Sub Category</p>
          <select
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="text-gray-400 w-full py-2 border-2 border-gray-300 text-sm pl-3 pr-8 outline-none rounded"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p>Product Price</p>
          <input
            type="number"
            min={1}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-gray-400 border w-full rounded border-2 border-gray-300 px-2 py-1 outline-none"
          />
        </div>
      </div>

      <div>
        <p>Product Sizes</p>
        <div className="w-full flex items-center justify-start gap-3 my-2">
          {sizes.map((itm, idx) => (
            <div
              key={idx}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(itm) ? prev.filter((item) => item !== itm) : [...prev, itm]
                )
              }
              className={`cursor-pointer w-auto min-w-[3rem] h-[3rem] flex items-center justify-center bg-gray-300/70 ${
                selectedSizes.includes(itm) ? 'bg-pink-300 text-white' : ''
              }`}
            >
              <p className="text-sm">{itm}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-start gap-2">
        <input
          type="checkbox"
          checked={bestseller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <p>Add to bestseller</p>
      </div>

      <motion.button
        whileTap={{ scale: 0.96 }}
        type="submit"
        className="text-white bg-gray-900 py-2 px-10 rounded-sm"
      >
        ADD
      </motion.button>
    </form>
  );
};

export default Add;
