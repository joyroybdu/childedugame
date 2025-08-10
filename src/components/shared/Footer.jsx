import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#323741] text-white py-8 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        
       
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-4">GameHouse</h2>
          <p className="text-gray-300">
            Learn with fun through engaging subject-wise educational games. 
            Physics, Chemistry, Math, English – all in one place!
          </p>
        </div>
        
       
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-yellow-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-yellow-400">About</Link></li>
            <li><Link to="/blog" className="hover:text-yellow-400">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-yellow-400">Contact</Link></li>
          </ul>
        </div>

        
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-300 text-lg">
            <a href="#" aria-label="Facebook" className="hover:text-yellow-400"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter" className="hover:text-yellow-400"><FaTwitter /></a>
            <a href="#" aria-label="Instagram" className="hover:text-yellow-400"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-yellow-400"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

    
      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} GameHouse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
