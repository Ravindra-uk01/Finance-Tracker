import React from 'react'

const SummaryCards = ({ income=0, expense=0, balance=0 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 summary-cards">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-500">Total Income</h3>
        <p className="text-3xl font-bold text-green-600">₹{income.toFixed(2)}</p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-500">Total Expense</h3>
        <p className="text-3xl font-bold text-red-600">₹{expense.toFixed(2)}</p>
      </div>
      
      <div className={`bg-white p-6 rounded-lg shadow ${
        balance >= 0 ? 'text-green-600' : 'text-red-600'
      }`}>
        <h3 className="text-lg font-medium text-gray-500">Balance</h3>
        <p className="text-3xl font-bold">₹{balance.toFixed(2)}</p>
      </div>
    </div>
  )
}

export default SummaryCards