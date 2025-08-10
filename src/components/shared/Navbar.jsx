import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiLogIn,
  FiHome,
  FiUser,
  FiBookOpen,
  FiAward,
 
  FiInfo,
} from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="bg-[#323741] shadow-md sticky top-0 z-50">
      <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-700">
        {/* Logo and Title */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="flex items-center gap-1 px-4 py-2 border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition"
          >
            <FiLogIn size={20} />
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition"
          >
            Signup
          </Link>
        </div>

        {/* Center Title */}
        <div className="text-center flex-1 lg:mr-15">
          <h1 className="text-4xl font-extrabold text-white font-serif tracking-wider">
            Game<span className="text-yellow-400">House</span>
          </h1>
          <p className="text-sm text-gray-400">Learn With Fun</p>
        </div>

        {/* Hamburger (Mobile) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

     {      /* Desktop Menu */}
      <nav className="hidden md:flex justify-center gap-10 py-3 border-b border-gray-700">
        {[
          { to: '/', icon: <FiHome size={24} />, label: 'Home' },
          { to: '/about', icon: <FiInfo size={24} />, label: 'About' },
          { to: '/blog', icon: <FiBookOpen size={24} />, label: 'Blog' },
            //  { to: '/myscore', icon: <FiAward size={24} />, label: 'My Score' },
          { to: '/profile', icon: <FiUser size={24} />, label: 'Profile' }
       
        ].map(({ to, icon, label }) => (
          <Link
            key={label}
            to={to}
            className="group relative text-white transition duration-300 hover:text-yellow-400 flex flex-col items-center"
          >
            <div className="transition-transform group-hover:scale-110">{icon}</div>
            <span className="absolute mt-10 opacity-0 group-hover:opacity-100 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity duration-300">
              {label}
            </span>
          </Link>
        ))}
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden flex flex-col gap-4 pb-4 px-4 text-white text-sm border-b border-gray-700">
          {[
            { to: '/', icon: <FiHome />, label: 'Home' },
            { to: '/about', icon: <FiInfo />, label: 'About' },
            { to: '/blog', icon: <FiBookOpen />, label: 'Blog' },
            { to: '/profile', icon: <FiUser />, label: 'Profile' },
            { to: '/myscore', icon: <FiAward />, label: 'My Score' },
          
          ].map(({ to, icon, label }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-2 hover:text-yellow-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {icon} {label}
            </Link>
          ))}

          {/* Mobile Login/Signup */}
          <div className="flex gap-3 mt-2 w-full">
            <Link
              to="/login"
              className="flex items-center gap-1 px-4 py-2 border border-yellow-400 text-yellow-400 rounded-md hover:bg-yellow-400 hover:text-black transition w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              <FiLogIn size={20} />
              Login
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 bg-yellow-400 text-black rounded-md hover:bg-yellow-500 transition w-full text-center"
              onClick={() => setIsOpen(false)}
            >
              Signup
            </Link>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
