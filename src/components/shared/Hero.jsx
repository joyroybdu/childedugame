import React from 'react';
import { useNavigate } from 'react-router-dom';
import englishImage from '../../assets/cards/english.jpg';
import physicsImage from '../../assets/cards/physics.jpg';
import chemistryImage from '../../assets/cards/chemistry.jpg';
import mathImage from '../../assets/cards/math.jpg';
import generalImage from '../../assets/cards/general.jpg';

const cards = [
  {
    id: 1,
    title: "Learn English with Games",
    category: "English",
    image: englishImage,
  },
  {
    id: 2,
    title: "Math Challenges: Solve Problems to Unlock New Levels",
    category: "Math",
    image: mathImage,
  },
  {
    id: 3,
    title: "Physics Adventure: Learn Physics by Playing",
    category: "Physics",
    image: physicsImage,
  },
  {
    id: 4,
    title: "Play and Learn Chemistry",
    category: "Chemistry",
    image: chemistryImage,
  },
  {
    id: 5,
    title: "More You play, More You Learn",
    category: "General",
    image: generalImage,
  },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const handleCardClick = (category) => {
    const path = category.toLowerCase();
    navigate(`/${path}`);
  };

  return (
    <section id="hero-section" className="min-h-screen bg-white">
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((element) => (
            <div
              key={element.id}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(element.category)}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(element.category)}
              className="
                flex flex-col
                rounded-3xl
                overflow-hidden
                border border-transparent
                shadow-md
                cursor-pointer
                transition
                duration-300
                hover:border-blue-500
                hover:shadow-xl
                bg-white
              "
            >
              {/* Image on top */}
              <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src={element.image}
                  alt={element.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Text and Button below */}
              <div className="p-6 text-center flex flex-col gap-3">
                <p className="text-sm text-blue-600 font-semibold">{element.category}</p>
                <h3 className="text-lg font-bold text-gray-900">{element.title}</h3>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(element.category);
                  }}
                  className="
                    mt-2 px-5 py-2 rounded-full
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    text-white font-semibold text-sm
                    shadow-md
                    transition-all duration-300
                    hover:from-blue-700 hover:to-indigo-700 hover:scale-105
                  "
                >
                  ▶ Play Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
