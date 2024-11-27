import React, { useState, useEffect } from 'react';
import './AddBalance.css';

const AddBalance = () => {
    const [totalBalance, setTotalBalance] = useState(null); // Start as null to indicate loading state
    const [inputBalance, setInputBalance] = useState(''); // Input amount
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error messages
    const [success, setSuccess] = useState(""); // State for success message

    // Function to fetch current balance
    const fetchCurrentBalance = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in. Please log in again.");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous errors

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
                setTotalBalance(null);
            }
        } catch (error) {
            console.error("Error fetching current balance:", error);
            setError("An error occurred while fetching the balance. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Function to handle adding balance
    const handleAddBalance = async (e) => {
        e.preventDefault();

        const amountToAdd = parseFloat(inputBalance);
        if (isNaN(amountToAdd) || amountToAdd <= 0) {
            setError("Please enter a valid amount.");
            setSuccess("");
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in. Please log in again.");
            return;
        }

        setLoading(true);
        setError(""); // Clear previous errors
        setSuccess(""); // Clear previous success message

        try {
            const response = await fetch('http://localhost:8081/addbalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ balance: amountToAdd }), // Add balance amount
            });

            const data = await response.json();

            if (response.status === 200) {
                setTotalBalance(data.TotalBalance); // Update balance
                setSuccess(data.message || "Balance added successfully!"); // Display success message
                setInputBalance(''); // Clear input field
                setTimeout(() => setSuccess(""), 2000);
            } else {
                setError(data?.message || "Failed to add balance.");
            }
        } catch (error) {
            console.error('Error adding balance:', error);
            setError("An error occurred while adding balance. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    useEffect(() => {
        fetchCurrentBalance(); // Fetch current balance when the component loads
    }, []);

    return (
        <div className="add-balance">
            <h2>Add Balance</h2>

            <form onSubmit={handleAddBalance}>
                <label>
                    Enter Amount:
                    <input
                        type="number"
                        value={inputBalance}
                        onChange={(e) => setInputBalance(e.target.value)}
                        placeholder="Enter amount"
                        required
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Add Balance"}
                </button>
            </form>

            <div className="current-balance">
                <h3>
                    Current Balance: {totalBalance !== null ? `$${totalBalance}` : 'Loading...'}
                </h3>
                {success && <p className="success-message">{success}</p>}
                {error && <p className="error-message">{error}</p>}
            </div>
        </div>
    );
};

export default AddBalance;
