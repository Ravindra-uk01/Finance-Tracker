import React from "react";
import { LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip, } from "recharts";

export const AnalyticsLinechat = ({data}) => {

   const chartData = data.map(item => ({
    name: item.month,
    Income: item.income,
    Expenses: item.expense
  })); 

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3"  />
        <XAxis dataKey="name" />
        <YAxis 
          tickFormatter={(value) => `₹${value.toLocaleString()}`} 
          width={80}
        />

        <Tooltip 
          formatter={(value) => [`₹${value.toLocaleString()}`, 'Amount']}
        />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="Income" 
          stroke="#82ca9d" 
          strokeWidth={2}
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />

        <Line 
          type="monotone" 
          dataKey="Expenses" 
          stroke="#ff7300" 
          strokeWidth={2}
          dot={{ r: 4 }} 
          activeDot={{ r: 6 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsLinechat;
