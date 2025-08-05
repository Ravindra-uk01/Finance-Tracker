import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import { useAuth } from "@/contexts/AuthContext";
import { getTransactions } from "@/services/transactions";
import React, { useEffect, useState } from "react";

const Transactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    search: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        ...filters,
        page: pagination.page,
        perPage: pagination.perPage,
      };
      const data = await getTransactions(params);
      setTransactions(data?.data);
      setPagination({
        page: data?.pagination?.page,
        perPage: data?.pagination?.perPage,
        total: data?.pagination?.total,
        totalPages: data?.pagination?.totalPages,
      });
    };
    fetchData();
  }, [filters, pagination.page, pagination.perPage, user]);

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  // For adding a new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };

    setTransactions([...transactions, newTransaction]);
    setShowForm(false);
  };

  // Update an existing transaction
  const updateTransaction = (updatedTransaction) => {
    setTransactions(
      transactions.map((t) =>
        t.id === updatedTransaction.id ? updatedTransaction : t
      )
    );
    setEditingTransaction(null);
    setShowForm(false);
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Start editing a transaction
  const startEditing = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  // Cancel form
  const cancelForm = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  console.log("Transactions: ", transactions);
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
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            + Add Transaction
          </button>
        </div>
        <TransactionList
          transactions={transactions.transactions}
          onEdit={startEditing}
          onDelete={deleteTransaction}
        />
        {/* Pagination controls */}
        {/* <Pagination/> */}
      </div>
      {showForm && (
        <TransactionForm
          onAdd={addTransaction}
          onUpdate={updateTransaction}
          onCancel={cancelForm}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  );
};

export default Transactions;
