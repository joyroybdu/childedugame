import React, { useState } from "react";
import GraphQuestion from "./GraphQuestion";
import Score from "./Score";
import data from "./chartData.json";
import ChartDisplay from "./ChartDisplay";

const ChartGame = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const next = current + 1;
    if (next < data.length) setCurrent(next);
    else setShowScore(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6 md:p-10">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-6">
          📊 Data & Graph Challenge
        </h1>

        {showScore ? (
          <Score score={score} total={data.length} />
        ) : (
          <>
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              <div className="flex-1 flex justify-center">
                <ChartDisplay chart={data[current]} />
              </div>
              <div className="flex-1">
                <GraphQuestion chart={data[current]} onAnswer={handleAnswer} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChartGame;
