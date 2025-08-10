import React from "react";

const Score = ({ score, total }) => {
  const message =
    score === total
      ? "🎉 Perfect Score!"
      : score >= total / 2
      ? "👍 Well Done!"
      : "📝 Keep Practicing!";

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">Your Score</h2>
      <p className="text-lg mb-1">
        {score} out of {total}
      </p>
      <p className="text-green-600 font-medium">{message}</p>
    </div>
  );
};

export default Score;
