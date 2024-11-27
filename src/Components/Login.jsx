import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css';

const Login = () => {


  const navigate = useNavigate();


  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState("");

  //  to store the login data into the localstorage

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8081/login',
        input,
        {
          headers: { 'Content-Type': 'application/json' }
        });
        
        let token = response.data.token;        
      if (response.status === 200) {
        localStorage.setItem('token', token);        
        navigate('/');
      } else {
        setError(response.data.message || "Registration failed");
      }
    }
    catch (error) {      
      if (error.response.status === 400) {
        setError(error.response.data.message || "password didnt match.");
        // alert("password not matched")
      } else if (error.response.status === 401) {
        setError(error.response.data.message || "user not exist with this email address");
      }
    }
  }




  return (
    <div className="login-container">
      <div className="form-container">
        <h2 className="title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Email"
            required
            className="input-field"
          />
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            placeholder="Password"
            required
            className="input-field"
          />
          <button type="submit" className="submit-button">Login</button>
          <p className="note">
            Don't have an account? <Link to="/register" className="register-link">Register here</Link>.
          </p><br />
          {error && <p className="error-message">{error}</p>}


        </form>
      </div>
    </div>
  )
}

export default Login