import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#00C49F"];

const ChartDisplay = ({ chart }) => {
  if (!chart) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-3 text-center">{chart.title}</h2>
      <div className="flex justify-center">
        {chart.type === "bar" ? (
          <BarChart width={400} height={300} data={chart.data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        ) : (
          <PieChart width={400} height={300}>
            <Pie
              data={chart.data}
              cx={200}
              cy={150}
              outerRadius={100}
              dataKey="value"
              label
            >
              {chart.data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        )}
      </div>
    </div>
  );
};

export default ChartDisplay;
