import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/PropertyDetails.css";
import Navbar from "./Navbar";

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;

  if (!property) {
    return <h2 className="error-message">No property details found</h2>;
  }

  const handleContact = () => {
    alert(`Contact Number: ${property.mobileNumber || "Not available"}`);
  };

  // Ensure image is properly formatted
  const imageSrc = property.image
    ? property.image.startsWith("data:image") 
      ? property.image // Already in correct format
      : `data:image/jpeg;base64,${property.image}` // Convert to proper Base64 format
    : "default-image.jpg"; // Fallback if no image

  return (
    <>
      <Navbar />
      <div className="property-details-container">
        <div className="property-content">

          {/* Left Column - Image */}
          <div className="property-images">
            <img 
              src={imageSrc} 
              alt="Property" 
              className="property-image"
              onError={(e) => (e.target.src = "default-image.jpg")} // Fallback
            />
          </div>

          {/* Right Column - Details */}
          <div className="property-info">
            <h2>{property.homeDetails || "No Home Details"}</h2>
            <p className="property-location">
              📍 {property.location?.district}, {property.location?.state} - {property.location?.pincode}
            </p>

            <div className="property-details-grid">
              <p><strong>Property Type:</strong> {property.propertyType || "N/A"}</p>
              <p><strong>Transaction Type:</strong> {property.transactionType || "N/A"}</p>
              <p><strong>Price:</strong> ₹{property.price || "0"}</p>
              <p><strong>Listed By:</strong> {property.userType || "N/A"}</p>
              <p><strong>Additional Notes:</strong> {property.notes || "No additional notes"}</p>
            </div>

            {/* Buttons */}
            <div className="buttons">
              <button className="contact-button" onClick={handleContact}>📞 Contact</button>
              <button className="back-button" onClick={() => navigate(-1)}>🔙 Back</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default PropertyDetails;
