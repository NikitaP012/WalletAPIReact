import React, { useState, useEffect } from 'react';
import './AddBalance.css';

// const WithdrawBalance = () => {
//     const [totalBalance, setTotalBalance] = useState(null); // Start as null to indicate loading state
//     const [inputBalance, setInputBalance] = useState(''); // Input amount
//     const [loading, setLoading] = useState(false); // Loading state
//     const [error, setError] = useState(''); // Error messages
    

//     // Fetch or update balance
//     const handleBalance = async (amount = 0) => {
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             setError("You are not logged in. Please log in again.");
//             return;
//         }

//         setLoading(true); 
//         setError(''); 

//         try {
//             // POST to the same API, sending `amount: 0` to fetch current balance
//             const response = await fetch('http://localhost:8081/withdrawBalance', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `${token}`,
//                 },
//                 body: JSON.stringify({ balance: amount }),
//             });

//             const data = await response.json();

//             if (response.ok) {
//                 setTotalBalance(data.TotalBalance); // Update balance
//                 if (amount > 0) {
//                     alert(data.message);
//                     setInputBalance(''); // Clear input only when adding balance
//                 }
//             } else {
//                 setError(data.message || "Failed to fetch or update balance.");
//             }
//         } catch (error) {
//             console.error('Error handling balance:', error);
//             setError("An error occurred. Please try again.");
//         } finally {
//             setLoading(false); // Stop loading
//         }
//     };

//     // Fetch the current balance on component mount
//     useEffect(() => {
//         handleBalance(0); // Pass `0` to fetch current balance
//     }, []);

//     // Handle balance addition
//     const handleAddBalance = (e) => {
//         e.preventDefault();

//         const amountToAdd = parseFloat(inputBalance);
//         if (isNaN(amountToAdd) || amountToAdd <= 0) {
//             setError("Please enter valid amount.");
//             return;
//         }

//         handleBalance(amountToAdd); // Pass the input amount to update balance
//     };

//     return (
//         <div className="add-balance">
//             <h2>Withdraw Balance</h2>
//             {/* {error && <p className="error">{error}</p>}  */}

//             <form onSubmit={handleAddBalance}>
//                 <label>
//                     Enter Amount:
//                     <input
//                         type="number"
//                         value={inputBalance}
//                         onChange={(e) => setInputBalance(e.target.value)}
//                         placeholder="Enter amount"
//                         required
//                     />
//                 </label>
//                 <button type="submit" disabled={loading}>
//                     {loading ? "Processing..." : "Withdraw Balance"}
//                 </button>
//             </form>

//             <div className="current-balance">
//                 <h3>
//                     Current Amount: {totalBalance !== null ? `${totalBalance}` : 'Loading...'}
//                     <br />
//                     {error && <p className="error-message">{error}</p>}
//                 </h3>
//             </div>
//         </div>
//     );
// };

// export default WithdrawBalance;





const WithdrawBalance = () => {
    const [totalBalance, setTotalBalance] = useState(null); // Start as null to indicate loading state
    const [inputBalance, setInputBalance] = useState(''); // Input amount
    const [loading, setLoading] = useState(false); // Loading state
    const [error, setError] = useState(''); // Error messages
    const [success, setSuccess] = useState(''); // Success messages

    // Fetch current balance using checkBalance API
    const fetchCurrentBalance = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in. Please log in again.");
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
                setTotalBalance(null);
            }
        } catch (error) {
            console.error("Error fetching current balance:", error);
            setError("An error occurred while fetching the balance. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Handle balance withdrawal
    const handleWithdrawBalance = async (e) => {
        e.preventDefault();

        const amountToWithdraw = parseFloat(inputBalance);
        if (isNaN(amountToWithdraw) || amountToWithdraw <= 0) {
            setError("Please enter a valid amount.");
            setSuccess('');
            return;
        }

        const token = localStorage.getItem('token');
        if (!token) {
            setError("You are not logged in. Please log in again.");
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('http://localhost:8081/withdrawBalance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${token}`,
                },
                body: JSON.stringify({ balance: -amountToWithdraw }), // Send negative value for withdrawal
            });

            const data = await response.json();

            if (response.ok) {
                setTotalBalance(data.TotalBalance); // Update balance
                setSuccess(data.message || "Balance withdrawn successfully!");
                setInputBalance(''); // Clear input field
                setTimeout(() => setSuccess(''), 3000); // Clear success message after 3 seconds
            } else {
                setError(data.message || "Failed to process your request.");
                setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
            }
        } catch (error) {
            console.error('Error handling withdrawal:', error);
            setError("An error occurred. Please try again.");
            setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
        } finally {
            setLoading(false);
        }
    };

    // Fetch the current balance on component mount
    useEffect(() => {
        fetchCurrentBalance(); // Call checkBalance API to get current balance
    }, []);

    return (
        <div className="add-balance">
            <h2>Withdraw Balance</h2>

            <form onSubmit={handleWithdrawBalance}>
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
                    {loading ? "Processing..." : "Withdraw Balance"}
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

export default WithdrawBalance;
