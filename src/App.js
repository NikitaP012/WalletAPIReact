import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Register from './Components/Register';
import Dahboard from './Components/Dahboard';
import ProtectedRoute from './Components/ProtectedRoute'
import AddBalance from './Pages/AddBalance';
import WithdrawBalance from './Pages/WithdrawBalance';
import CheckBalance from './Pages/CheckBalance';
import TransferMoney from './Pages/TransferMoney';
import TransactionHistory from './Pages/TransactionHistory';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <ProtectedRoute>

            <Dahboard />
          </ProtectedRoute>
          }>
            <Route path="/add-balance" element={<AddBalance />}/>
            <Route path="/withdraw-balance" element={<WithdrawBalance />}/>
            <Route path="/transfer-money" element={<TransferMoney />}/>
            <Route path="/check-balance" element={<CheckBalance/>} />
            <Route path="/transaction-history" element={<TransactionHistory />}/>

            </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
