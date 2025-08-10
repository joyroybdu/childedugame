import React, { useState, useEffect } from 'react';

const generateEquation = () => {
  const operations = ['+', '-'];
  const op = operations[Math.floor(Math.random() * operations.length)];

  let a = Math.floor(Math.random() * 10) + 1;
  let b = Math.floor(Math.random() * 10) + 1;
  let equationStr;
  let answer;

  if (op === '+') {
    const result = a + b;
    const hide = Math.floor(Math.random() * 3);
    if (hide === 0) {
      equationStr = `? + ${b} = ${result}`;
      answer = a;
    } else if (hide === 1) {
      equationStr = `${a} + ? = ${result}`;
      answer = b;
    } else {
      equationStr = `${a} + ${b} = ?`;
      answer = result;
    }
  } else {
    if (a < b) [a, b] = [b, a];
    const result = a - b;
    const hide = Math.floor(Math.random() * 3);
    if (hide === 0) {
      equationStr = `? - ${b} = ${result}`;
      answer = a;
    } else if (hide === 1) {
      equationStr = `${a} - ? = ${result}`;
      answer = b;
    } else {
      equationStr = `${a} - ${b} = ?`;
      answer = result;
    }
  }

  return { equationStr, answer };
};

const Equation = () => {
  const [equation, setEquation] = useState({ equationStr: '', answer: 0 });
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setEquation(generateEquation());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const userAns = Number(userInput);
    if (userAns === equation.answer) {
      setFeedback('✅ Correct!');
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`❌ Wrong! Correct answer: ${equation.answer}`);
    }
    setTotal((prev) => prev + 1);
    setUserInput('');
    setTimeout(() => {
      setFeedback('');
      setEquation(generateEquation());
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Equation Solver Challenge</h1>

        <div className="text-3xl font-mono mb-6">{equation.equationStr}</div>

        <form onSubmit={handleSubmit} className="mb-4 flex justify-center items-center">
          <input
            type="number"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="border border-gray-300 rounded px-4 py-2 w-32 text-center text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="?"
            required
          />
          <button
            type="submit"
            className="ml-4 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Check
          </button>
        </form>

        {feedback && <p className="text-lg font-semibold mb-4">{feedback}</p>}

        <div className="text-gray-600">
          Score: <span className="font-semibold">{score}</span> / <span>{total}</span>
        </div>
      </div>
    </div>
  );
};

export default Equation;
