import TransactionForm from "@/components/transactions/TransactionForm";
import TransactionList from "@/components/transactions/TransactionList";
import { Alert } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import useDebounce from "@/hooks/useDebounce";
import {
  createTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from "@/services/transactions";
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
    startDate: '',
    endDate: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [search, setSearch] = useState("");

  const categories = {
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
  expense: ['Rent', 'Groceries', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Other']
};

const allCategories = [...new Set([...categories.income, ...categories.expense])];

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        ...filters,
        page: pagination.page,
        perPage: pagination.perPage,
      };
      const { data } = await getTransactions(params);
      setTransactions(data?.transactions);
      setPagination({
        page: data?.pagination?.page,
        perPage: data?.pagination?.perPage,
        total: data?.pagination?.total,
        totalPages: data?.pagination?.totalPages,
      });
    };
    fetchData();
  }, [filters, pagination.page, pagination.perPage, user]);


  const debouncedSearch = useDebounce(search, 500);
  useEffect(()=>{
    if (debouncedSearch) {
      setFilters((prev) => ({ ...prev, search: debouncedSearch }));
    } else {
      setFilters((prev) => ({ ...prev, search: "" }));
    }
  }, [debouncedSearch])

  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  // For adding a new transaction
  const addTransaction = async (transaction) => {
    try {
      const newTransaction = {
        ...transaction,
      };
      const response = await createTransaction(newTransaction);

      if (response?.status === 201) {
        Alert("Transaction added successfully", { variant: "success" });
        newTransaction.id = response?.data?.transaction?.id;
        setTransactions([...transactions, newTransaction]);
        setShowForm(false);
      } else {
        console.log("Error adding transaction: ", response);
        Alert("Error adding transaction: " + response?.data?.message, {
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Error creating transaction: ", error);
      Alert("Error creating transaction: " + error.message, {
        variant: "destructive",
      });
    }
  };

  // Update an existing transaction
  const updateTransactionById = async (updatedTransaction) => {
    try {
      const response = await updateTransaction(
        updatedTransaction.id,
        updatedTransaction
      );

      if (response?.status === 200) {
        Alert("Transaction updated successfully", { variant: "success" });
        const updatedTransactionList = transactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t
        );
        setTransactions(updatedTransactionList);
        setEditingTransaction(null);
        setShowForm(false);
      } else {
        console.log("Error updating transaction: ", response);
        Alert("Error updating transaction: " + response?.data?.message, {
          variant: "destructive",
        });
        return;
      }
    } catch (error) {
      console.error("Error updating transaction: ", error);
      Alert("Error updating transaction: " + error.message, {
        variant: "destructive",
      });
    }
  };

  // Delete a transaction
  const deleteTransactionById = async(id) => {
    try {
      
      const response = await deleteTransaction(id);

      if (response?.status === 200) {
        Alert("Transaction deleted successfully", { variant: "success" });
        setTransactions(transactions.filter((t) => t.id !== id));

      } else {
        console.log("Error deleting transaction: ", response);
        Alert("Error deleting transaction: " + response?.data?.message, {
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting transaction: ", error);
      Alert("Error deleting transaction: " + error.message, {
        variant: "destructive",
      });
      return;
    }
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

  // console.log("Transactions: ", transactions);
  // console.log("Pagination: ", pagination);
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
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">All Category</option>
            {allCategories.length> 0 && allCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input type="search" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder="Search... " />
         
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowForm(true)}
          >
            + Add Transaction
          </button>
        </div>
        <TransactionList
          transactions={transactions}
          onEdit={startEditing}
          onDelete={deleteTransactionById}
        />
        {/* Pagination controls */}
        {/* <Pagination/> */}
      </div>
      {showForm && (
        <TransactionForm
          onAdd={addTransaction}
          onUpdate={updateTransactionById}
          onCancel={cancelForm}
          editingTransaction={editingTransaction}
        />
      )}
    </div>
  );
};

export default Transactions;
