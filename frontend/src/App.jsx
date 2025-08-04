
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute'
import Users from './pages/Admin/Users'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Transactions from './pages/Transactions'
import Layout from './components/layouts/Layout';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function App() {

  const {user} = useAuth();

  return (
  
     <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" replace /> : <Register />}  />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute ><Users /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
   
  )
}

export default App
