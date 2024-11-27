import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]); // State to store transaction data
  const [error, setError] = useState(""); // State for errors
  const [loading, setLoading] = useState(true); // State for loading

  // Fetch balance data when component mounts
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError("You are not logged in. Please log in again.");
          return;
        }

        // Fetch user data from the API
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

        // Update state with the transactions
        setTransactions(data.Transactions);
        setLoading(false); // Set loading to false after data is fetched

      } catch (error) {
        console.error('Error:', error);
        setError("An error occurred while fetching user data.");
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchBalance();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  // If loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display the error message
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
