import React, { useEffect, useState } from 'react';
import Hero1 from '../../assets/hero/Hero1.jpg';






const images = [Hero1];

const typingTexts = ['Play & Learn', 'Learn with AI', 'Boost Your Learning'];

const TopHero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

;

  // Typing effect is here (improved) 
  useEffect(() => {
    const currentText = typingTexts[textIndex];
    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setTypedText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setTypedText('');
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % typingTexts.length);
      }, 2000);
      return () => clearTimeout(resetTimeout);
    }
  }, [charIndex, textIndex]);
// Smooth scroll to sections(improved)
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className="relative w-full min-h-screen bg-no-repeat bg-cover bg-center transition-all duration-1000"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
  
      <div className="absolute inset-0 bg-black/60 flex flex-col justify-center items-center px-4 text-white text-center">
     
        <h1 className="text-3xl md:text-5xl font-bold mb-12 animate-pulse">
          {typedText}
          <span className="border-r-2 border-white ml-1 animate-ping">&nbsp;</span>
        </h1>

        {/* Cards */}
<div className="flex flex-col md:flex-row gap-6">

  <div
    onClick={() => scrollToSection('hero-section')}
    className="cursor-pointer w-90h-40 bg-transparent hover:scale-105 hover:bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-4 transition-all duration-500 animate-fadeInUp"
  >
    <h3 className="text-lg font-semibold text-white">Play and Learn</h3>
  </div>

 
  <div
    onClick={() => scrollToSection('learn-with-ai')}
    className="cursor-pointer w-90h-40 bg-transparent hover:scale-105 hover:bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl shadow-lg flex flex-col items-center justify-center text-center p-4 transition-all duration-500 animate-fadeInUp"
  >
    <h3 className="text-lg font-semibold text-white">Learn with AI</h3>
  </div>
</div>

      </div>
    </div>
  );
};

export default TopHero;
