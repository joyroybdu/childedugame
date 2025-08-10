import React from 'react';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';
import HeroSection from '../shared/Hero';
import TopHero from '../shared/TopHero';

const Home = () => {
  return (
    <>
      <Navbar />

   
      <div className="w-full h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 my-4" />

      <TopHero />

      
      <div className="relative flex items-center justify-center my-6">
        <div className="w-full h-[1px] bg-gray-300" />
        <span className="absolute bg-white px-4 text-gray-500 text-lg font-medium tracking-wide">
          ↓ Explore More ↓
        </span>
      </div>

     
      <div className="w-full h-1 bg-gradient-to-r from-purple-500 via-white to-cyan-500 rounded-full my-8 shadow-lg"></div>

      <HeroSection />

    
      <div className="my-6 w-full">
        <div className="h-[1px] bg-gray-300 mb-1" />
        <div className="h-[1px] bg-gray-300 w-3/4 mx-auto" />
      </div>

      <Footer />
    </>
  );
};

export default Home;
