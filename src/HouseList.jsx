import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/HouseList.css";

const HouseList = ({ properties }) => {
  console.log("Properties:", properties);
  const navigate = useNavigate();

  const handleViewDetails = (property) => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  // Function to clean base64 image data
  const cleanBase64Image = (base64String) => {
    return base64String?.replace(/^data:image\/[a-z]+;base64,/, ""); 
  };

  return (
    <div className="home-list-wrapper">
      <h2 className="home-list-title">Featured Properties</h2>

      {properties.length === 0 ? (
        <p className="no-results">No properties found. Try different filters.</p>
      ) : (
        <div className="home-grid">
          {properties.map((property) => {
            // Ensure the image is in correct base64 format
            const cleanedImage = property.image?.startsWith("data:image")
              ? property.image
              : `data:image/jpeg;base64,${cleanBase64Image(property.image)}`;

            return (
              <div key={property.id} className="home-card">
                <img 
                  src={cleanedImage || "default-image.jpg"} 
                  alt="Property" 
                  className="home-image" 
                />
                <div className="home-details">
                  <h3 className="home-name">{property.transactionType || "No Name"}</h3>

                  {/* Location */}
                  <p className="home-location">
                    <i className="fa fa-map-marker"></i> 
                    {property.location?.district}, {property.location?.state} - {property.location?.pincode}
                  </p>

                  <p className="home-type"><strong>Type:</strong> {property.propertyType || "N/A"}</p>
                  <p className="home-price"><strong>Price:</strong> ₹{property.price || "0"}</p>

                  {/* View Details Button */}
                  <button className="view-details" onClick={() => handleViewDetails(property)}>
                    View Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HouseList;
