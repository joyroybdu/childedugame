import React from 'react';
import { useNavigate } from 'react-router-dom';
import english1 from '../../assets/english/english1.jpg';

const cards = [
  {
    id: 1,
    title: "Try Your Word Skills",
    gameName: "synonym-game",
    image: english1,
  },
  {
    id: 2,
    title: "Try Your Word Skills",
    gameName: "spelling-scramble",
    image: english1,
  },
  {
    id: 3,
    title: "Try Your Word Skills",
    gameName: "dictonary",
    image: english1,
  },
];

const EnglishHero = () => {
  const navigate = useNavigate();

  const handleCardClick = (gameName) => {
    navigate(`/${gameName}`);
  };

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((element) => (
          <div
            key={element.id}
            onClick={() => handleCardClick(element.gameName)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleCardClick(element.gameName)}
            className="rounded-3xl overflow-hidden border-2 border-gray-300 hover:border-blue-500 transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer bg-gradient-to-br from-white to-slate-100 hover:from-blue-50 hover:to-blue-100 group p-5 text-center"
          >
            {/* Small Rounded Image */}
            <div className="flex justify-center mb-4">
              <img
                src={element.image}
                alt={element.title}
                className="h-24 w-24 object-cover rounded-full border-2 border-blue-400 shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div>
              <p className="text-sm text-gray-500 capitalize mb-1">
                {element.gameName.replace(/-/g, ' ')}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {element.title}
              </h3>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(element.gameName);
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium text-sm hover:from-blue-700 hover:to-indigo-700 transition"
              >
                ▶ Play Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default EnglishHero;
