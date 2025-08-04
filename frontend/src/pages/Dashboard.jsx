import AnalyticsBarChart from '@/components/analytics/charts/AnalyticsBarChart';
import AnalyticsLinechat from '@/components/analytics/charts/AnalyticsLinechat';
import AnalyticsPieChart from '@/components/analytics/charts/AnalyticsPieChart';
import SummaryCards from '@/components/analytics/SummaryCards';
import { useAuth } from '@/contexts/AuthContext';
import { getAnalytics } from '@/services/analytics';
import React, { useEffect, useState } from 'react'

const Dashboard = () => {

   const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('monthly');

  useEffect(() => {
    const fetchData = async () => {
      const {data} = await getAnalytics(timeRange);
      setAnalytics(data.analytics);
    };
    fetchData();
  }, [timeRange, user]);

  if (!analytics) return <div>Loading...</div>;

  console.log('Analytics: ', analytics);
  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-4">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="border rounded p-2"
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <SummaryCards
          income={analytics?.totalIncome} 
          expense={analytics?.totalExpense} 
          balance={analytics?.balance} 
        />
        <div className="bg-white p-4 rounded-lg shadow mt-6">
          <h2 className="text-xl font-semibold mb-4">Monthly Income vs Expenses</h2>
          <AnalyticsLinechat data={analytics.monthlyData} />
        </div>
      </div>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow">
           <h2 className="text-xl font-semibold mb-4">Expense Distribution</h2>
          <AnalyticsPieChart data={analytics.categoryData} />
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
           <h2 className="text-xl font-semibold mb-4">Category Spending</h2>
          <AnalyticsBarChart data={analytics.categoryData} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard