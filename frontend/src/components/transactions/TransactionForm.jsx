import React, { useEffect, useState } from 'react'
import "./transactionForm.css"

const TransactionForm = ({ onAdd, onUpdate, onCancel, editingTransaction }) => {

    const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });
  
  const categories = {
    income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other'],
    expense: ['Rent', 'Groceries', 'Transport', 'Utilities', 'Entertainment', 'Healthcare', 'Education', 'Shopping', 'Other']
  };

  useEffect(() => {
    if (editingTransaction) {
      setFormData(editingTransaction);
    }
  }, [editingTransaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.category || !formData.amount || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }
    
    const transactionData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    if (editingTransaction) {
      onUpdate(transactionData);
    } else {
      onAdd(transactionData);
    }
  };

  return (
    <div className="transaction-form-modal">
      <div className="form-container">
        <div className="form-header">
          <h2>{editingTransaction ? 'Edit Transaction' : 'Add New Transaction'}</h2>
          <button className="close-btn" onClick={onCancel}>×</button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Type</label>
            <div className="type-selector">
              <button
                type="button"
                className={formData.type === 'income' ? 'active' : ''}
                onClick={() => setFormData({...formData, type: 'income'})}
              >
                Income
              </button>
              <button
                type="button"
                className={formData.type === 'expense' ? 'active' : ''}
                onClick={() => setFormData({...formData, type: 'expense'})}
              >
                Expense
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories[formData.type].map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add a note"
            />
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {editingTransaction ? 'Update Transaction' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionForm