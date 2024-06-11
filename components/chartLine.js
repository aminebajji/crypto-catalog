import React from "react";
import { LineChart, Line, YAxis } from "recharts";

const ChartLine = ({ data }) => {
  const minValue = Math.min(...data);
  const maxValue = Math.max(...data);

  const padding = (maxValue - minValue) * 0.1;

  const domain = [minValue - padding, maxValue + padding];

  return (
    <LineChart
      width={140}
      height={40}
      data={data.map((value, index) => ({ name: index, value: value }))}
    >
      <Line
        type="monotone"
        dataKey="value"
        stroke="#FF0000"
        strokeWidth={2}
        dot={false}
      />
      <YAxis type="number" domain={domain} hide={true} />
    </LineChart>
  );
};

export default ChartLine;
