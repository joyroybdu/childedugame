import React, { useState } from "react";
import chemistryData from "./chemistryData.json";

export default function MoleculeGame() {
  const atomsList = chemistryData.atoms;
  const moleculeDatabase = chemistryData.molecules;
  
  const [workspace, setWorkspace] = useState([]);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  function handleDrop(e) {
    const symbol = e.dataTransfer.getData("atom");
    setWorkspace((prev) => [...prev, symbol]);
  }

  function handleDragStart(e, symbol) {
    e.dataTransfer.setData("atom", symbol);
  }

  // Mobile tap handler
  function handleTouchAtom(symbol) {
    setWorkspace((prev) => [...prev, symbol]);
  }

  function checkMolecule() {
    const counts = workspace.reduce((acc, atom) => {
      acc[atom] = (acc[atom] || 0) + 1;
      return acc;
    }, {});

    let formula = Object.entries(counts)
      .map(([atom, count]) => atom + (count > 1 ? count : ""))
      .join("");

    if (moleculeDatabase[formula]) {
      setMessage(`✅ You made ${moleculeDatabase[formula]} (${formula})!`);
      setScore((prev) => prev + 10);
    } else {
      setMessage(`❌ Not a valid molecule: ${formula}`);
    }
    setWorkspace([]);
  }

  function clearWorkspace() {
    setWorkspace([]);
    setMessage("Workspace cleared!");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl text-gray-900">
        
        {/* Atoms List */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex flex-nowrap sm:flex-wrap justify-start gap-4">
            {atomsList.map((atom) => (
              <div
                key={atom.symbol}
                className={`w-14 h-14 ${atom.color} rounded-full flex-shrink-0 flex items-center justify-center text-white text-lg font-bold cursor-grab shadow-lg`}
                draggable
                onDragStart={(e) => handleDragStart(e, atom.symbol)} // Desktop drag
                onClick={() => handleTouchAtom(atom.symbol)} // Mobile tap
                title={atom.name}
              >
                {atom.symbol}
              </div>
            ))}
          </div>
        </div>

        {/* Workspace */}
        <div
          className="min-h-[150px] border-2 border-dashed border-gray-400 rounded-lg flex items-center justify-center bg-gray-50 relative p-6"
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {workspace.length === 0 ? (
            <p className="text-gray-500">Drag atoms here or tap on mobile</p>
          ) : (
            <div className="flex items-center gap-8 relative">
              {workspace.map((atom, index) => {
                const atomColor =
                  atomsList.find((a) => a.symbol === atom)?.color ||
                  "bg-gray-500";
                return (
                  <div
                    key={index}
                    className="relative flex flex-col items-center"
                  >
                    <span
                      className={`w-14 h-14 ${atomColor} rounded-full flex items-center justify-center text-white font-bold shadow-md`}
                    >
                      {atom}
                    </span>
                    {index < workspace.length - 1 && (
                      <div className="absolute top-1/2 left-full w-8 h-1 bg-gray-500 animate-pulse"></div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-3">
          <button
            onClick={checkMolecule}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Check Molecule
          </button>
          <button
            onClick={clearWorkspace}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg shadow-md transition"
          >
            Clear Workspace
          </button>
        </div>

        {/* Info */}
        <div className="mt-4">
          <p className="font-semibold text-lg text-gray-800 dark:text-gray-100">
            Score: {score}
          </p>
          <p className="mt-3 text-md text-indigo-600 dark:text-indigo-400 font-medium italic max-w-md leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
