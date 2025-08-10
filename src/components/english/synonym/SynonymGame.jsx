import React, { useState, useEffect } from 'react';

import word from './words.json';

const SynonymGame = ({ username }) => {
  const [currentWord, setCurrentWord] = useState({});
  const [lastWord, setLastWord] = useState({});
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [extraSynonym, setExtraSynonym] = useState('');
  const [score, setScore] = useState(0);

  const getRandomWord = () => {
    const random = word[Math.floor(Math.random() * word.length)];
    setCurrentWord(random);
    setInput('');
    setExtraSynonym('');
  };

  useEffect(() => {
    getRandomWord();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userAnswer = input.trim().toLowerCase();
    const isCorrect = currentWord.synonyms.some(
      synonym => synonym.toLowerCase() === userAnswer
    );

    setLastWord(currentWord);

    if (isCorrect) {
      const otherSynonyms = currentWord.synonyms.filter(
        synonym => synonym.toLowerCase() !== userAnswer
      );
      const randomOther = otherSynonyms[Math.floor(Math.random() * otherSynonyms.length)];
      setExtraSynonym(randomOther);
      setFeedback('✅ Correct!');
      setScore(score + 1);
    } else {
      setFeedback(`❌ Wrong! Correct answers: ${currentWord.synonyms.join(', ')}`);
      setExtraSynonym('');
    }

    getRandomWord();
  };

  const handleSaveAndExit = async () => {
    try {
      await axios.post('http://localhost:5000/api/scores', {
        username,
        game: 'SynonymGame',
        score,
      });

      alert('Score saved successfully!');
      // Optional: redirect
      window.location.href = '/score';
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Failed to save score!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg bg-white text-center">
      <h1 className="text-2xl font-bold mb-4">Synonym Game</h1>
      <h2 className="text-xl mb-6">
        What is a synonym of: <span className="font-semibold text-blue-600">{currentWord.word}</span>?
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type synonym here"
          className="w-full border px-4 py-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Check
        </button>
      </form>

      <p className="mt-4 font-medium">Score: {score}</p>

      {feedback && (
        <div className="mt-4 text-lg font-semibold">
          <p className={feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}>
            {feedback}
          </p>
          {feedback.includes('Correct') && extraSynonym && (
            <p className="text-blue-500 text-base mt-2">
              Another synonym of <strong>{lastWord.word}</strong>: <em>{extraSynonym}</em>
            </p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Previous word: <strong>{lastWord.word}</strong>
          </p>
        </div>
      )}

      <button
        onClick={handleSaveAndExit}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Save Score & Exit
      </button>
    </div>
  );
};

export default SynonymGame;
