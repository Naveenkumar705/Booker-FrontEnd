import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Profile.css";
import Navbar from "./Navbar";

const Profile = () => {
  const [sellerProperties, setSellerProperties] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    console.log("User data from localStorage:", user);

    if (!user || !user.email) return;

    const fetchSellerProperties = async () => {
      try {
        const response = await axios.get("http://localhost:9093/api/properties");
        console.log("Fetched Properties:", response.data); // Debug API response

        const filteredProperties = response.data.filter(
          (property) => property.email === user.email
        );

        setSellerProperties(filteredProperties);
      } catch (error) {
        console.error("Error fetching seller properties:", error);
      }
    };

    fetchSellerProperties();
  }, [user.email]);

  // Delete Property
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this property?")) return;

    try {
      await axios.delete(`http://localhost:9093/api/properties/${id}`);
      setSellerProperties((prev) => prev.filter((property) => property.id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  // Edit Property
  const handleEdit = (id) => {
    navigate(`/edit-property/${id}`);
  };

  const handleToggleHide = async (id, isHidden) => {
    try {
      const newHideStatus = !isHidden;
      await axios.patch(`http://localhost:9093/api/properties/${id}`, { hide: newHideStatus });
  
      setSellerProperties((prev) =>
        prev.map((property) =>
          property.id === id ? { ...property, hide: newHideStatus } : property
        )
      );
    } catch (error) {
      console.error("Error updating hide status:", error);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="profile-wrapper">
        <h2>Seller Profile</h2>
        <p><strong>Name:</strong> {user?.name || "N/A"}</p>
        <p><strong>Email:</strong> {user?.email || "N/A"}</p>

        <h3>Your Listed Houses</h3>
        {sellerProperties.length === 0 ? (
          <p>No houses listed yet.</p>
        ) : (
          <div className="home-grid">
            {sellerProperties.map((property) => (
              <div key={property.id} className="home-card">
                <img src={property.image} alt={property.name} className="home-image" />

                <div className="home-details">
                  <h3 className="home-name">{property.transactionType}</h3>

                  <p className="home-location">
                    <i className="fa fa-map-marker"></i>
                    {property.location
                      ? `${property.location.state || "N/A"}, ${property.location.district || "N/A"}, ${property.location.pincode || "N/A"}`
                      : "Location not available"}
                  </p>

                  <p className="home-type"><strong>Type:</strong> {property.propertyType}</p>
                  <p className="home-price"><strong>Price:</strong> ₹{property.price}</p>
                  <p className={`home-status ${property.hide ? "hidden" : "visible"}`}>
                    <strong>Status:</strong> {property.hide ? "Hidden" : "Visible"}
                  </p>

                  <div className="property-actions">
                    <button className="edit-btn" onClick={() => handleEdit(property.id)}>✏️ Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(property.id)}>🗑️ Delete</button>
                    <button className="hide-btn" onClick={() => handleToggleHide(property.id, property.hide)}>
                      {property.hide ? "🔓 Unhide" : "🔒 Hide"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;

