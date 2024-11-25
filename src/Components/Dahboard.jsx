import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          <div className="logo">Bank Logo</div>
        </div>
      
        <div className="user-info">
          <span className="user-name">Nikita Phapale</span>
          <div className="profile-logo">Profile Logo</div>
        </div>
      </header>

      {/* Sidebar Section */}
      <aside
        className={`dashboard-sidebar ${isSidebarOpen ? "open" : ""}`}
      >
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
