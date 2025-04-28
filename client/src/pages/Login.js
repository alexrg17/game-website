import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Import AuthContext
import { jwtDecode } from "jwt-decode"; // Correct import for jwt-decode
import "../styles/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext); // Get auth state and setters

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // If already authenticated, redirect to homepage
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");

    try {
      // Send POST request with rememberMe included
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          email,
          password,
          rememberMe, // Include the rememberMe state
        }
      );

      setSuccess(response.data.message || "Login successful!");

      // Store token based on rememberMe setting
      if (rememberMe) {
        localStorage.setItem("token", response.data.token);
        sessionStorage.removeItem("token");
      } else {
        sessionStorage.setItem("token", response.data.token);
        localStorage.removeItem("token");
      }

      // Continue with your existing code...
      let decoded;
      try {
        decoded = jwtDecode(response.data.token);
        setUser({
          email: decoded.email,
          userId: decoded.userId,
          username: decoded.username,
        });
        setIsAuthenticated(true);
      } catch (decodeError) {
        setError("Invalid token");
        return;
      }

      // Redirect after successful login
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Server error");
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Navigate to the register page
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Starilum Login</h1>
        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success">{success}</div>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <button
              type="button"
              className="forgot-password"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <button
          type="button"
          className="register-button"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
