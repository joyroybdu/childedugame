import React, { useEffect, useRef, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Simulator = () => {
  const [force, setForce] = useState(50);
  const [mass, setMass] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [loop, setLoop] = useState(false);
  const [data, setData] = useState([]);
  const [position, setPosition] = useState(0); 

  const requestRef = useRef();
  const previousTimeRef = useRef();
  const velocityRef = useRef(0);
  const positionRef = useRef(0);
  const timeRef = useRef(0);

  const acceleration = force / mass;

  const animate = (time) => {
    if (previousTimeRef.current !== undefined) {
      const deltaTime = (time - previousTimeRef.current) / 1000;

      velocityRef.current += acceleration * deltaTime;
      positionRef.current += velocityRef.current * deltaTime * 100;
      timeRef.current += deltaTime;

      setPosition(positionRef.current); 
      setData((prev) => [
        ...prev,
        {
          time: parseFloat(timeRef.current.toFixed(2)),
          velocity: parseFloat(velocityRef.current.toFixed(2)),
          acceleration: parseFloat(acceleration.toFixed(2)),
        },
      ]);

      if (positionRef.current > 600) {
        if (loop) {
          resetState();
          setIsRunning(true);
          requestRef.current = requestAnimationFrame(animate);
          return;
        } else {
          stopSimulation();
          return;
        }
      }
    }

    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  const startSimulation = () => {
    resetState();
    setIsRunning(true);
    requestRef.current = requestAnimationFrame(animate);
  };

  const stopSimulation = () => {
    cancelAnimationFrame(requestRef.current);
    setIsRunning(false);
  };

  const resetState = () => {
    cancelAnimationFrame(requestRef.current);
    velocityRef.current = 0;
    positionRef.current = 0;
    timeRef.current = 0;
    previousTimeRef.current = undefined;
    setPosition(0);
    setData([]);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        🧪 Force & Motion Simulator (F=ma)
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Force: {force} N</label>
          <input
            type="range"
            min="0"
            max="200"
            value={force}
            onChange={(e) => setForce(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Mass: {mass} kg</label>
          <input
            type="range"
            min="1"
            max="50"
            value={mass}
            onChange={(e) => setMass(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
        </div>

        <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
          <button
            onClick={startSimulation}
            disabled={isRunning}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Start
          </button>
          <button
            onClick={stopSimulation}
            disabled={!isRunning}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Stop
          </button>
          <button
            onClick={resetState}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Reset
          </button>
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={loop}
              onChange={(e) => setLoop(e.target.checked)}
            />
            <span>Loop Mode</span>
          </label>
        </div>

        {/* Animated Object */}
        <div className="mt-8 relative h-24 bg-gray-100 rounded overflow-hidden border">
          <div
            className="w-12 h-12 bg-blue-500 rounded-full absolute top-1/2 transform -translate-y-1/2"
            style={{
              left: `${Math.min(position, 600)}px`,
              transition: isRunning ? "none" : "left 0.3s",
            }}
          ></div>
        </div>

        <p className="text-center mt-2 text-sm text-gray-600">
          Acceleration = {acceleration.toFixed(2)} m/s²
        </p>

        {/* Chart */}
        <div className="h-64 mt-8">
          <h3 className="text-center font-semibold mb-2">📊 Live Velocity & Acceleration</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                label={{
                  value: "Time (s)",
                  position: "insideBottomRight",
                  offset: -5,
                }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="velocity"
                stroke="#007bff"
                name="Velocity (m/s)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="acceleration"
                stroke="#28a745"
                name="Acceleration (m/s²)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
