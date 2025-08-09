import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';

const Searchbar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);

  return (
    <div className="w-full transition-all duration-3000 flex items-center justify-center bg-white px-4 pb-4 mt-4">
      <div className="w-[75%] flex items-center justify-center border border-gray-300 rounded-full px-2 py-1">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for products..."
          className="w-[90%] h-full rounded px-4 py-2 text-gray-700 focus:outline-none"
        />
        <div className="h-full w-[10%] flex items-center justify-center">
          <img
            onClick={() => setShowSearch(!showSearch)}
            src={assets.search_icon}
            className="w-[1.4rem] cursor-pointer"
            alt="Search"
          />
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
