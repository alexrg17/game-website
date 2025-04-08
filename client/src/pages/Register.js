import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import "../styles/Register.scss";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login } = useContext(AuthContext); // Get auth state and login function

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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);

    try {
      console.log("Submitting registration:", formData);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        formData
      );
      console.log("Registration successful:", response.data);

      // Check if the response contains a token
      if (response.data.token) {
        // Use the login function from AuthContext to set the authentication state
        login(response.data.token);

        setSuccess("Registration successful! Redirecting to homepage...");

        // Redirect to homepage immediately after setting auth state
        navigate("/");
      } else {
        // If no token is returned yet, show success message and redirect to login
        setSuccess(
          response.data.message ||
            "User registered successfully! Please log in."
        );

        // Redirect to login page after a short delay
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("Registration error:", err.response || err);
      setError(err.response?.data?.message || "Server error");
    } finally {
      setIsSubmitting(false);
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
          <button
            type="submit"
            className="register-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
