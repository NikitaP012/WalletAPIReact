import React, { useState, useEffect } from "react";
import "./TransferMoney.css"; // Import CSS file

const TransferMoney = () => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    amount: "",
    reason: "",
  });
  const [totalBalance, setTotalBalance] = useState(0); // Current balance
  const [error, setError] = useState(""); // Error state
  const [success, setSuccess] = useState(""); // Success message state
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the current balance when the component mounts
  const fetchCurrentBalance = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError("You are not logged in. Please log in again.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch("http://localhost:8081/checkBalance", {
        method: "GET",
        headers: {
          Authorization: `${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setTotalBalance(data.TotalBalance); // Set the current balance
        setError('');
      } else {
        setError(data.message || "Failed to fetch current balance.");
        setTotalBalance(0); // In case of error, set balance to 0
      }
    } catch (error) {
      console.error("Error fetching current balance:", error);
      setError("An error occurred while fetching the balance. Please try again.");
      setTotalBalance(0);
    } finally {
      setLoading(false);
    }
  };

  // Call the fetchCurrentBalance function when the component mounts
  useEffect(() => {
    fetchCurrentBalance();
  }, []);

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
      alert("Invalid amount. Please enter a positive number.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You are not logged in. Please log in again.");
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
        setTotalBalance(data.TotalBalance); // Update balance with the response
        setSuccess("Transaction Successful");
        setFormData({ mobileNumber: "", amount: "", reason: "" }); // Reset form fields
      } else {
        setError(data.message || "Transaction failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An unexpected error occurred.");
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
            type="number"
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

      {/* Display current balance */}
      <p className="current-balance">
        <strong>Current Balance:</strong> 
        {loading ? "Loading..." : `$${totalBalance}`}
      </p>

      {/* Display success or error message */}
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default TransferMoney;
