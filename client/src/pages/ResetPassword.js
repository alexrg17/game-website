import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/ResetPassword.scss"; // Updated to use ResetPassword.scss

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isValidToken, setIsValidToken] = useState(false);
  const [isTokenChecking, setIsTokenChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/auth/verify-reset-token/${token}`
        );
        console.log("Token verification response:", data);
        setIsValidToken(true);
      } catch (err) {
        setError("Invalid or expired reset link. Please request a new one.");
        setIsValidToken(false);
      } finally {
        setIsTokenChecking(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    if (password.length < 8) {
      setError("Password should be at least 8 characters long.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/reset-password`,
        {
          token,
          password,
        }
      );
      console.log("Password reset response:", data);

      setSuccess(
        "Password successfully reset! You can now login with your new password."
      );

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while checking token
  if (isTokenChecking) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h1>Verifying Reset Link</h1>
          <p>Please wait while we verify your reset link...</p>
        </div>
      </div>
    );
  }

  // Show error if token is invalid
  if (!isValidToken) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h1>Invalid Reset Link</h1>
          <div className="auth-error">{error}</div>
          <div className="auth-links">
            <button
              className="submit-button"
              onClick={() => navigate("/forgot-password")}
            >
              Request a new reset link
            </button>
            <p>
              <span className="auth-link" onClick={() => navigate("/login")}>
                Return to Login
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Show reset password form if token is valid
  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1>Set New Password</h1>
        {error && <div className="auth-error">{error}</div>}
        {success && <div className="auth-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            <span className="auth-link" onClick={() => navigate("/login")}>
              Back to Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
