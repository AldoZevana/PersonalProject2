import React from 'react';
import { assets } from '../assets/assets';

const Home = () => {
  return (
    <div className="text-center">
      <img src={assets.header_img} alt="Header" className="w-full h-64 object-cover" />
      <h1 className="text-4xl font-bold mt-8">Welcome to Our Food Delivery Service</h1>
    </div>
  );
};

export default Home;
