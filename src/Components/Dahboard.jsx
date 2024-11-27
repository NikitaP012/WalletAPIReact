import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';  // Correct default import
import "./Dashboard.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBank } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate(); // To navigate after logout
  
  // Toggle the sidebar open/close
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Retrieve the token and decode it
  useEffect(() => {
   const token = localStorage.getItem('token');
   if (!token) {
    // If there's no token, redirect to login page
    navigate("/login");
    return; // Exit early
  }
    if (token) {
      try {
        const decodedToken = jwtDecode(token);  // Decode the token
        
        // Log the decoded token to check its structure
        console.log("Decoded Token:", decodedToken);

        // Access the 'name' field from the decoded token and set it to the state
        setUserName(decodedToken.name);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      console.error("Token not found in localStorage.");
    }
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    // Navigate to the login page after logging out
    navigate("/login");
    setUserName("");
  };

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-left">
          <button
            className="hamburger-menu"
            onClick={toggleSidebar}
            aria-label="Toggle Sidebar"
          >
            ☰
          </button>

          <div className="sidebar">
            <FontAwesomeIcon icon={faBank} style={{ fontSize: '50px', color: 'black' }} />
            <span style={{ fontSize: '25px', marginLeft: '10px' }}>Wallet API</span>
          </div>
        </div>

        {/* User Info Section */}
        <div className="user-info">
         
          <span className="user-name">{userName || 'Loading...'}</span> {/* Display user's name or 'Loading...' */}
          <div className="profile-logo">
            {/* Display the first letter of the user's name as the logo */}
            <span>{userName ? userName.charAt(0) : 'U'}</span>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* Sidebar Section */}
      <aside className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <nav>
          <ul>
            <li>
              <NavLink to="add-balance" onClick={() => setIsSidebarOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'white',
                  background: isActive ? '#7600dc' : '#343a40',
                })}>
                Add Balance
              </NavLink>
            </li>
            <li>
              <NavLink to="withdraw-balance" onClick={() => setIsSidebarOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'white',
                  background: isActive ? '#7600dc' : '#343a40',
                })}>
                Withdraw Balance
              </NavLink>
            </li>
            <li>
              <NavLink to="transfer-money" onClick={() => setIsSidebarOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'white',
                  background: isActive ? '#7600dc' : '#343a40',
                })}>
                Transfer Money
              </NavLink>
            </li>
            <li>
              <NavLink to="transaction-history" onClick={() => setIsSidebarOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'white',
                  background: isActive ? '#7600dc' : '#343a40',
                })}>
                Transaction History
              </NavLink>
            </li>
            <li>
              <NavLink to="check-balance" onClick={() => setIsSidebarOpen(false)}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : 'white',
                  background: isActive ? '#7600dc' : '#343a40',
                })}>
                Check Balance
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Section */}
      <main className={`dashboard-content ${isSidebarOpen ? "sidebar-open" : ""}`}>
        <Outlet />
      </main>

    </div>
  );
}

export default Dashboard;
