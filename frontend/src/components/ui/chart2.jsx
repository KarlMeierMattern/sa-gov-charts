"use client";

import {
  Line,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export function LineChart({ className }) {
  // Sample data - replace with your actual data
  const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 200 },
    { name: "Apr", value: 278 },
    { name: "May", value: 189 },
    { name: "Jun", value: 239 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <Line data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </Line>
    </ResponsiveContainer>
  );
}

export function BarChart({ className }) {
  // Sample data - replace with your actual data
  const data = [
    { name: "A", value: 400 },
    { name: "B", value: 300 },
    { name: "C", value: 200 },
    { name: "D", value: 278 },
    { name: "E", value: 189 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%" className={className}>
      <Bar data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </Bar>
    </ResponsiveContainer>
  );
}
