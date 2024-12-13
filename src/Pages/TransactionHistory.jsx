import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); 

  
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("You are not logged in. Please log in again.");
          return;
        }

        
        const response = await fetch('http://localhost:8081/transactionHistory', {
          method: 'GET',
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log("response", response);

        if (!response.ok) {
          if (response.status === 401) {
            setError("Unauthorized access. Please log in.");
          } else {
            setError("Failed to fetch user data.");
          }
          return;
        }

        const data = await response.json();
        console.log(data);

       
        setTransactions(data.Transactions);
        setLoading(false); 

      } catch (error) {
        console.error('Error:', error);
        setLoading(false);
        setError("An error occurred while fetching user data.");
     
      }
    };

    fetchBalance();
  }, []); 


  if (loading) {
    return <div>Loading...</div>;
  }

 
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h2>Transaction History</h2>
      <table>
        <thead>
          <tr>
            <th className="data">ID</th>
            <th className="data">Date</th>
            <th className="data">Sender</th>
            <th className="data">Receiver</th>
            <th className="data">Amount</th>
            <th className="data">Reason</th>
            <th className="data">Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.senderMobile}</td>
              <td>{transaction.receiverMobile}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.reason}</td>
              <td>{transaction.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionHistory;
