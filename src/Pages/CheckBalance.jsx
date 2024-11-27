import React, { useState } from "react";
import "./CheckBalance.css"; // Import the CSS file

const CheckBalance = () => {
  const [balance, setBalance] = useState("");
  const [error, setError] = useState("");

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(localStorage.getItem('token'));

        if (!token) {
            setError("You are not logged in. Please log in again.");
            return;
        }

      const response = await fetch("http://localhost:8081/checkBalance", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setBalance(data.TotalBalance);
        console.log("Current Balance:", data.TotalBalance);
      } else if (response.status === 500) {
        alert("User does not exist!");
        setError("User does not exist!");
      } else if (response.status === 501) {
        alert("Failed to check balance");
        setError("Failed to check balance");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while fetching the balance.");
      setError("An error occurred while fetching the balance.");
    }
  };

  return (
    <div className="check-balance-container">
      <h2>Check Your Balance</h2>
      <div className="button-container">
        <button id="checkBtn" onClick={fetchBalance} className="check-balance-button">
          Check Balance
        </button>
      </div>
      <div className="balance-display">
        <label htmlFor="check" className="balance-label">
          Current Balance:
        </label>
        <input
          type="text"
          id="check"
          value={balance}
          readOnly
          className="balance-input"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default CheckBalance;
