import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/ForgotPassword.scss"; // Use the dedicated stylesheet

const ForgotPassword = () => {
  const location = useLocation(); // Import useLocation from react-router-dom at the top
  const navigate = useNavigate(); // Initialize navigate using useNavigate

  // Extract email from URL parameters
  const urlParams = new URLSearchParams(location.search);
  const emailFromURL = urlParams.get("email") || "";

  const [email, setEmail] = useState(emailFromURL);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  // Email validation regex pattern
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateEmail = () => {
    if (!email) {
      setError("Please enter your email address.");
      return false;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous messages
    setError("");
    setSuccess("");

    // Validate email format
    if (!validateEmail()) {
      return;
    }

    setIsSubmitting(true);
    setIsChecking(true);

    try {
      // First check if the email exists in the database
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/check-email`,
        { email }
      );

      setIsChecking(false);

      // If email exists, send the reset link
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
        { email }
      );

      setSuccess(
        response.data.message || "Password reset link sent to your email!"
      );

      // Clear form
      setEmail("");
    } catch (err) {
      if (err.response?.status === 404) {
        setError(
          "No account found with this email address. Please check your spelling or register for a new account."
        );
      } else {
        setError(
          err.response?.data?.message || "Failed to process your request"
        );
      }
    } finally {
      setIsSubmitting(false);
      setIsChecking(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Reset Your Password</h1>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <p className="auth-info">
          Enter your email address below. We'll send you a link to reset your
          password.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isChecking
              ? "Checking..."
              : isSubmitting
              ? "Sending..."
              : "Send Reset Link"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Remember your password?{" "}
            <span className="auth-link" onClick={() => navigate("/login")}>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
