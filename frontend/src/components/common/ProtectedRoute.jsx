import { useAuth } from '@/contexts/AuthContext';
import React from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, roles = [] }) => {

  const { user, initialLoading } = useAuth();

  if (initialLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if (!user) {
  //   return <Navigate to={`/login?redirect=${location.pathname}`} replace />;
  // }
  
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
}

export default ProtectedRoute