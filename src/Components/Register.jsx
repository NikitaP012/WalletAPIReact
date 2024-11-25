// import React from 'react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './Register.css';
const Register = () => {

    const navigate = useNavigate();

    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        mobileno: ""
    })

    const [error, setError] = useState("");

    // To store in the value in localstorage
    console.log("the function work");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8081/signup',
                input,
                {
                    headers: { 'Content-Type': 'application/json' }
                });
            if (response.status === 200) {
                navigate('/login');
            } else {
                setError(response.data.message || "Registration failed");
            }
        } catch (error) {
            if (error.response.status === 400) {
                setError(error.response.data.message || "user already Registered with this email.");
            } else if (error.response.status === 500) {
                setError(error.response.data.message);
            }
        }
    }



    return (
        <div className="register-container">
            <div className="form-container">
                <h2 className="title">Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        placeholder="Full Name"
                        required
                        className="input-field"
                    />
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

                    <input
                        type="text"
                        name="mobileno"
                        value={input.mobileno}
                        onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                        placeholder="Mobile Number"
                        required
                        className="input-field"
                    />
                    <button type="submit" className="submit-button">Register</button>
                    <p className="note">
                        Already have an account? <Link to="/login" className="login-link">Log in here</Link>.
                    </p>
                    {error && <p className="error-message">{error}</p>}

                </form>
            </div>
        </div>
    )
}

export default Register