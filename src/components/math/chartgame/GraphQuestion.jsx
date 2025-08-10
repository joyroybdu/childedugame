import React, { useState } from "react";

const GraphQuestion = ({ chart, onAnswer }) => {
  const [selected, setSelected] = useState(null);

  const handleSubmit = () => {
    if (selected !== null) {
      const isCorrect = selected === chart.answer;
      onAnswer(isCorrect);
      setSelected(null);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-md font-medium mb-3">{chart.question}</h3>
      <ul className="space-y-2 mb-4">
        {chart.options.map((option, i) => (
          <li key={i}>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="option"
                value={option}
                checked={selected === option}
                onChange={() => setSelected(option)}
                className="accent-blue-500"
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default GraphQuestion;
