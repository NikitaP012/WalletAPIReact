import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Login.css';

const Login = () => {


    const navigate = useNavigate();
    const [error, setError] = useState('');
  
    const [input, setInput] = useState({
      email: '',
      password: ''
    })
  
    //  to store the login data into the localstorage
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
  
      // API call to login endpoint
      axios.post('http://localhost:8081/login', input, {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((response) => {
  console.log(response);
  
          if (response.status === 200) {
            console.log("response.data.token",response.data.token);
            
            localStorage.setItem('authToken', response.data.token);
            alert(response.data.message);
            navigate('/');
          }
          else if(response.status === 400){
              alert(response.data.message)
          }
        else if(response.status === 401){
          alert(response.data.message)
        }
        })
        
  
        .catch((error) => {
  
            if (error.response) {
                // Server responded with a status code out of the 2xx range
                setError(error.response.data.message || 'Login failed. Please try again.');
            } else if (error.request) {
                // No response from the server
                setError('No response from the server. Please try again later.');
            } else {
                // Other errors
                setError('An error occurred. Please try again.');
            }
        });
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
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login