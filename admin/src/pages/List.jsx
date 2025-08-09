import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Table from '../components/Table';
import { motion } from 'framer-motion';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const List = ({ token }) => {
  
  return (
    <div className=" flex items-start justify-center ">
      <div className="relative min-h-screen bg-white text-gray-800 w-full flex items-center justify-center">
        <Table token={token} />
      </div>
    </div>
  );
};

export default List;
