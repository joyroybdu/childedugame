import React, { useEffect, useState } from 'react';


const getRandomQuestion = () => {
  const operations = ['+', '-', '*', '/'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;

  // To avoid fractions in division(improved)
  if (op === '/') {
    a = a * b;
  }

  return {
    question: `${a} ${op} ${b}`,
    answer: eval(`${a} ${op} ${b}`),
  };
};

const MathQuiz = () => {
  const [timeLeft, setTimeLeft] = useState(60);// 60 seconds timer(improved)
  const [input, setInput] = useState('');
  const [score, setScore] = useState({ correct: 0, wrong: 0, total: 0 });
  const [question, setQuestion] = useState(getRandomQuestion());
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const timer =
      timeLeft > 0 &&
      setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

    if (timeLeft === 0) {
      setGameOver(true);
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAnswer = parseFloat(input);

    if (userAnswer === parseFloat(question.answer.toFixed(2))) {
      setScore((prev) => ({ ...prev, correct: prev.correct + 1, total: prev.total + 1 }));
    } else {
      setScore((prev) => ({ ...prev, wrong: prev.wrong + 1, total: prev.total + 1 }));
    }

    setInput('');
    setQuestion(getRandomQuestion());
  };

  return (
    <div className="min-h-screen flex items-center justify-center  text-white">
      <div className="bg-white text-gray-800 rounded-xl shadow-md p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">🧠🤯 Math Quiz</h2>

        {!gameOver ? (
          <>
            <div className="mb-4 text-xl">
              Time Left: <span className="font-bold">{timeLeft}s</span>
            </div>
            <div className="text-3xl font-semibold mb-4">{question.question}</div>

            <form onSubmit={handleSubmit}>
              <input
                type="number"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full border p-2 rounded mb-4 text-lg"
                placeholder="Enter your answer"
                required
              />
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
              >
                Submit
              </button>
            </form>
          </>
        ) : (
          // Game Over Screen(improved)
          <>
        
            <h3 className="text-xl font-bold mb-2">⏱ Time's Up!</h3>
            <p className="mb-2">✅ Correct Answers: {score.correct}</p>
            <p className="mb-2">❌ Wrong Answers: {score.wrong}</p>
            <p className="mb-4">📊 Total Attempted: {score.total}</p>
            <button
              onClick={() => {
                setTimeLeft(60);
                setScore({ correct: 0, wrong: 0, total: 0 });
                setQuestion(getRandomQuestion());
                setInput('');
                setGameOver(false);
              }}
              className="bg-purple-600 text-white py-2 px-6 rounded hover:bg-purple-700"
            >
              Play Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MathQuiz;
