import React, { useState, useEffect } from 'react';
import './AddBalance.css';

const AddBalance = () => {
    const [totalBalance, setTotalBalance] = useState(null); // Start as null to indicate loading state
    const [inputBalance, setInputBalance] = useState(''); // Input amount
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error messages

    // Fetch or update balance
    const handleBalance = async (amount = 0) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            setError("You are not logged in. Please log in again.");
            return;
        }

        setLoading(true); 
        setError(''); 

        try {
           
            const response = await fetch('http://localhost:8081/addBalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
                body: JSON.stringify({ balance: amount }), // If `amount` is 0, fetch current balance
            });

            const data = await response.json();

            if (response.ok) {
                setTotalBalance(data.TotalBalance); // Update balance
                if (amount > 0) {
                    alert(data.message || "Balance added successfully!");
                    setInputBalance(''); // Clear input only when adding balance
                }
            } else {
                setError(data.message || "Failed to fetch or update balance.");
            }
        } catch (error) {
            console.error('Error handling balance:', error);
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

  
    useEffect(() => {
        handleBalance(0); // Pass `0` to fetch current balance
    }, []);

    // Handle balance addition
    const handleAddBalance = (e) => {
        e.preventDefault();

        const amountToAdd = parseFloat(inputBalance);
        if (isNaN(amountToAdd) || amountToAdd <= 0) {
            setError("Invalid amount. Please enter a number greater than 0.");
            return;
        }

        handleBalance(amountToAdd); 
    };

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
                    Current Amount: {totalBalance !== null ? `$${totalBalance}` : 'Loading...'}
                </h3>
            </div>
        </div>
    );
};

export default AddBalance;
