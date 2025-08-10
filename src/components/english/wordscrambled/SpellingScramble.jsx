import React, { useEffect, useState } from 'react';
import wordData from './word.json';

const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const SpellingScramble = () => {
  const [words, setWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(null);
  const [scrambled, setScrambled] = useState([]);
  const [draggedLetterIndex, setDraggedLetterIndex] = useState(null);
  const [score, setScore] = useState(() =>
    parseInt(localStorage.getItem('score')) || 0
  );
  const [hintUsed, setHintUsed] = useState(() =>
    parseInt(localStorage.getItem('hintUsed')) || 0
  );
  const [showHint, setShowHint] = useState(false);
  const [usedHintForWord, setUsedHintForWord] = useState(false);


  useEffect(() => {
    setWords(wordData);
  }, []);


  useEffect(() => {
    if (words.length === 0) return;

    let savedIndex = parseInt(localStorage.getItem('wordIndex'));
    if (isNaN(savedIndex) || savedIndex >= words.length || savedIndex < 0) {
      savedIndex = Math.floor(Math.random() * words.length);
      localStorage.setItem('wordIndex', savedIndex);
    }
    setCurrentWordIndex(savedIndex);
  }, [words]);


  useEffect(() => {
    if (currentWordIndex === null || words.length === 0) return;

    const currentWord = words[currentWordIndex].word;
    setScrambled(shuffleArray(currentWord.split('')));
    setShowHint(false);
    setUsedHintForWord(false);
  }, [currentWordIndex, words]);

  const handleDragStart = (index) => {
    setDraggedLetterIndex(index);
  };

  const handleDrop = (index) => {
    if (draggedLetterIndex === null) return;
    const newScrambled = [...scrambled];
    [newScrambled[draggedLetterIndex], newScrambled[index]] = [newScrambled[index], newScrambled[draggedLetterIndex]];
    setScrambled(newScrambled);
    setDraggedLetterIndex(null);
  };

  const handleCheck = () => {
    if (currentWordIndex === null) return;

    const currentWord = words[currentWordIndex].word;
    if (scrambled.join('') === currentWord) {
      const newScore = score + 1;
      setScore(newScore);
      localStorage.setItem('score', newScore);

      nextWord();
    } else {
      alert('❌ Try Again!');
    }
  };

  const nextWord = () => {
    if (currentWordIndex + 1 < words.length) {
      const nextIndex = currentWordIndex + 1;
      setCurrentWordIndex(nextIndex);
      localStorage.setItem('wordIndex', nextIndex);
    } else {
      alert('🎉 All words completed!');
      const randomIndex = Math.floor(Math.random() * words.length);
      setCurrentWordIndex(randomIndex);
      localStorage.setItem('wordIndex', randomIndex);
    }
  };

  const handleShowHint = () => {
    if (usedHintForWord) {
      alert('❗ Only one hint allowed per word!');
      return;
    }

    if (hintUsed < 5) {
      const updatedHint = hintUsed + 1;
      setShowHint(true);
      setUsedHintForWord(true);
      setHintUsed(updatedHint);
      localStorage.setItem('hintUsed', updatedHint);
    } else {
      alert('❗ You have used all 5 hints!');
    }
  };

  const handleSaveAndExit = () => {
    localStorage.setItem('score', score);
    localStorage.setItem('wordIndex', currentWordIndex);
    localStorage.setItem('hintUsed', hintUsed);
    alert('Progress saved! You can resume later.');
  };

  const handleRestart = () => {
    if (window.confirm('Are you sure you want to restart the game?')) {
      localStorage.removeItem('score');
      localStorage.removeItem('hintUsed');
      localStorage.removeItem('wordIndex');

      setScore(0);
      setHintUsed(0);

      if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length);
        setCurrentWordIndex(randomIndex);
        localStorage.setItem('wordIndex', randomIndex);
      } else {
        setCurrentWordIndex(null);
      }

      setShowHint(false);
      setUsedHintForWord(false);
    }
  };

  const hintLeft = Math.max(0, 5 - hintUsed);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className="p-4 max-w-xl mx-auto text-center bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">🧠 Spelling Scramble</h2>

        <div className="mb-4 text-lg">
          <p>Rearrange the letters to form the correct word:</p>
          <div className="flex justify-center gap-2 mt-3">
            {scrambled.map((letter, index) => (
              <div
                key={index}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(index)}
                className="w-12 h-12 border-2 border-blue-400 rounded-lg flex items-center justify-center text-xl bg-white shadow cursor-move select-none"
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        {showHint && (
          <div className="bg-yellow-100 text-yellow-900 p-2 rounded shadow mt-2">
            💡 Hint: {words[currentWordIndex]?.hint}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
          <button
            onClick={handleCheck}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={currentWordIndex === null}
          >
            Check
          </button>
         
          <button
            onClick={handleShowHint}
            className={`px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 ${
              hintUsed >= 5 || usedHintForWord ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={hintUsed >= 5 || usedHintForWord || currentWordIndex === null}
          >
            Show Hint ({'🧠'.repeat(hintLeft)})
          </button>
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Restart 🔄
          </button>
           <button
            onClick={handleSaveAndExit}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
            disabled={currentWordIndex === null}
          >
            Save & Exit
          </button>
        </div>

        <p className="mt-6 text-gray-700">Current Score: {score}</p>
      </div>
    </div>
  );
};

export default SpellingScramble;
