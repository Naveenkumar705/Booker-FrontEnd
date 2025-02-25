import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Signup.css";
import Signup_Back from "./assets/Signup_Back.jpg";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    location: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scroll

    return () => {
      document.body.style.overflow = "auto"; // Enable scroll on unmount
    };
  }, []);

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:9093/api/users/signup", formData);

      setFormData({
        name: "",
        mobile: "",
        email: "",
        location: "",
        password: "",
        confirmPassword: "",
        role: "",
      });

      setSubmitted(true);
      alert("Signup successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-image-container">
          <img src={Signup_Back} alt="Signup Background" className="signup-image" />
        </div>

        <div className="signup-form-container">
          <h2 className="signup-title">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <input
              type="text"
              name="mobile"
              placeholder="Mobile No"
              value={formData.mobile}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={formData.email}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="signup-input"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-type Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="signup-input"
              required
            />

            <div className="signup-role-buttons">
              {["Buyer", "Seller", "Agent"].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`signup-role-button ${formData.role === role ? "selected" : ""}`}
                  onClick={() => handleRoleChange(role)}
                >
                  {role}
                </button>
              ))}
            </div>

            <button type="submit" className={`signup-submit-button ${submitted ? "submitted" : ""}`}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
