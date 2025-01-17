"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
  {
    name: "Jan",
    gdp: 2.5,
    unemployment: 7.2,
  },
  {
    name: "Feb",
    gdp: 2.6,
    unemployment: 7.1,
  },
  {
    name: "Mar",
    gdp: 2.7,
    unemployment: 7.0,
  },
  {
    name: "Apr",
    gdp: 2.8,
    unemployment: 6.9,
  },
  {
    name: "May",
    gdp: 2.9,
    unemployment: 6.8,
  },
  {
    name: "Jun",
    gdp: 3.0,
    unemployment: 6.7,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Bar
          dataKey="gdp"
          fill="rgba(34, 197, 94, 0.6)"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="unemployment"
          fill="rgba(239, 68, 68, 0.6)"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
