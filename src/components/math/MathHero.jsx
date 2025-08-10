import React from 'react';
import { useNavigate } from 'react-router-dom';
import math1 from '../../assets/math/math1.jpg';
import math2 from '../../assets/math/math2.jpg';
import Footer from '../shared/Footer';

const cards = [
  {
    id: 1,
    title: "Quick Math Quiz: Boost Your Speed & Accuracy",
    gameName: "math-quiz",
    image: math1,
  },
  {
    id: 2,
    title: "Equation Solver",
    gameName: "equation-solver",
    image: math2,
  },
  {
    id: 3,
    title: "Chart Game",
    gameName: "chart-game",
    image: math2,
  },
];

const MathHero = () => {
  const navigate = useNavigate();

  const handleCardClick = (gameName) => {
    navigate(`/${gameName}`);
  };

  return (
    <>
    <main className="p-4 sm:p-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((element) => (
          <div
            key={element.id}
            onClick={() => handleCardClick(element.gameName)}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(element.gameName)}
            role="button"
            tabIndex={0}
            className="group rounded-2xl overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:outline hover:outline-2 hover:outline-blue-400 transition-all duration-300 cursor-pointer"
          >
            {/* Top Image Section */}
            <div className="h-52 overflow-hidden">
              <img
                src={element.image}
                alt={element.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom Content Section */}
            <div className="p-4 flex flex-col justify-between gap-2 bg-gray-50 h-40">
              <p className="text-sm text-gray-600 capitalize">{element.gameName.replace(/-/g, ' ')}</p>
              <h3 className="text-lg font-semibold text-gray-800">{element.title}</h3>
              <button className="mt-auto px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition">
                ▶ Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
    <Footer/>
    </>
  );
};

export default MathHero;
