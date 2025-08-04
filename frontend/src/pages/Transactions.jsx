import TransactionList from '@/components/transactions/TransactionList';
import { useAuth } from '@/contexts/AuthContext';
import { getTransactions } from '@/services/transactions';
import React, { useEffect, useState } from 'react'

const Transactions = () => {
   const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, perPage: 10, total: 0 });
  const [filters, setFilters] = useState({ type: '', category: '', search: '' });

  useEffect(() => {
    const fetchData = async () => {
      const params = { ...filters, page: pagination.page, perPage: pagination.perPage };
      const data = await getTransactions(params);
      setTransactions(data.data);
      setPagination({
        page: data.pagination.page,
        perPage: data.pagination.perPage,
        total: data.pagination.total,
        totalPages: data.pagination.totalPages
      });
    };
    fetchData();
  }, [filters, pagination.page, pagination.perPage, user]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div className="mt-6">
        <div className="flex space-x-4 mb-4">
          <select 
            value={filters.type} 
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">All Types</option>
            <option value="INCOME">Income</option>
            <option value="EXPENSE">Expense</option>
          </select>
        
        </div>
        <TransactionList transactions={transactions}  />
        {/* Pagination controls */}
      </div>
    </div>
  )
}

export default Transactions