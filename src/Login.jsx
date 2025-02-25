import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:9093/api/users");
      const user = response.data.find(
        (user) =>
          (user.email === formData.emailOrPhone || user.mobile === formData.emailOrPhone) &&
          user.password === formData.password
      );

      if (user) {
        // Remove password before storing in localStorage
        const { password, ...userDataWithoutPassword } = user;
        localStorage.setItem("user", JSON.stringify(userDataWithoutPassword));

        // Redirect based on role
        if (user.role === "Buyer") {
          navigate("/buyer");
        } else if (user.role === "Seller") {
          navigate("/seller");
        } else if (user.role === "Agent") {
          navigate("/homepage");
        }
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setLoginFailed(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="emailOrPhone"
            placeholder="Email or Mobile No"
            value={formData.emailOrPhone}
            onChange={handleChange}
            required
            className="login-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
          {loginFailed && <p className="login-error-message">Invalid credentials</p>}
          <button type="submit" className="login-submit-button">Login</button>
        </form>

        {/* Signup link */}
        <p className="signup-text">
          Don't have an account? <button className="signup-button" onClick={() => navigate("/signup")}>Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
