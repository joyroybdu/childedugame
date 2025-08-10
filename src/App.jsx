import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './components/pages/Home';
import Math from './components/math/Math';
import Physics from './components/physics/Physics';
import Chemistry from './components/chemistry/Chemistry';
import English from './components/english/English';
import General from './components/General/General';
// import MathQuiz from './components/math/mathquiz/mathQuiz';
import Equation from './components/math/equation/Equation';
import SynonymGame from './components/english/synonym/SynonymGame';
import SpellingScramble from './components/english/wordscrambled/SpellingScramble';
import Dictonary from './components/english/dictonary/Dictonary';
import ChartGame from './components/math/chartgame/ChartGame';
import NewtonLow from './components/physics/NewtonLaw/NewtonLow';
import MoleculeGame from './components/chemistry/MoliCuleGame/MoliculeGame';
import PictureOfTheDay from './components/General/PictureOfTheDay';


const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/math" element={<Math />}> </Route>
{/*           <Route path="math-quiz" element={<MathQuiz />} /> */}
              <Route path="chart-game" element={<ChartGame/>} />
          <Route path="equation-solver" element={<Equation />} />
      <Route path="synonym-game" element={<SynonymGame />} />


<Route path="spelling-scramble" element={<SpellingScramble/>} />

<Route path="dictonary" element={<Dictonary/>} />
     
        <Route path="/physics" element={<Physics />} />
         <Route path="/newton-low" element={<NewtonLow/>} />
         <Route path="/molicule-game" element={<MoleculeGame/>}/>

        <Route path="/chemistry" element={<Chemistry />} />
        <Route path="/english" element={<English />} />
        <Route path="/general" element={<General />} />
        
    <Route path="/PictureOfTheDay" element={<PictureOfTheDay/>} />
      </Routes>
  
  );
};

export default App;
