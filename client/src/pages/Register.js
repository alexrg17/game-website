import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Get auth state

  // If the user is already authenticated, redirect to homepage
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  // Define state for form inputs
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      console.log("Submitting registration:", formData);
      const response = await axios.post(
        "http://localhost:5001/api/auth/register",
        formData
      );
      console.log("Registration successful:", response.data);
      setSuccess(response.data.message || "User registered successfully!");
      // Optionally, reset the form fields
      setFormData({ name: "", username: "", email: "", password: "" });
      // Redirect to the homepage (or login page) after a short delay (e.g., 1.5 seconds)
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      console.error("Registration error:", err.response || err);
      setError(err.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <h1>Create an Account</h1>
        {error && <div className="register-error">{error}</div>}
        {success && <div className="register-success">{success}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
