import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend 
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ff7300'];

const AnalyticsPieChart = ({data}) => {

  const chartData = [...data]
    .sort((a, b) => b.amount - a.amount)
    .map(item => ({
      name: item.category,
      value: item.amount
    }));

  // Calculate total for percentage display
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0];
      const percentage = ((item.payload.value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded">
          <p className="font-medium">{item.name}</p>
          <p>Amount: ₹{item.payload.value.toLocaleString()}</p>
          <p>Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={120}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend 
          layout="vertical" 
          verticalAlign="middle" 
          align="right"
          formatter={(value, entry, index) => (
            <span className="text-gray-600">
              {chartData[index]?.name}
            </span>
          )}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default AnalyticsPieChart