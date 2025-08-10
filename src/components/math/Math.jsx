import React from 'react'
import Navbar from '../shared/Navbar';
import MathHero from './MathHero';
import { Outlet } from 'react-router-dom';


const Math = () => {
  return (
    <>
     <Navbar/>
    <MathHero/>
    </>
   
  )
}

export default Math