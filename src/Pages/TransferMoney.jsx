import React, { useState } from "react";
import "./TransferMoney.css"; // Import CSS file

const TransferMoney = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    amount: "",
    reason: "",
  });
  const [currentBalance, setCurrentBalance] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalBalance, setTotalBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { mobileNumber, amount, reason } = formData;

    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Invalid amount. Please enter a positive number.");
      return;
    }
    setLoading(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setErrorMessage("You are not logged in. Please log in again.");
        return;
      }
     
      const response = await fetch("http://localhost:8081/transferBalance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          mobileno: mobileNumber,
          amount: amount,
          reason: reason,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setTotalBalance(data.TotalBalance);
        alert("Transaction Successful");
      } else {
        alert(data.message || "Transaction failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An unexpected error occurred.");
    }finally {
      setLoading(false); // Stop loading
  }
  };

  return (
    <div className="transfer-container">
      <h2>Transfer Balance</h2>
      <form className="transfer-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="number"
            id="mobile"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Transfer</button>
      </form>

      <p className="current-balance">
        <strong>Current Balance:</strong> {totalBalance !== null ? `$${totalBalance}` : `${currentBalance}`}
      </p>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default TransferMoney;
