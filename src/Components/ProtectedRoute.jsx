import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check if token exists
  console.log("token",token);
  
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;