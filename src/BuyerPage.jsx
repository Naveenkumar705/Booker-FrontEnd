import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/BuyerPage.css"; // Import styles
import Navbar from "./Navbar";

const BuyerPage = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9093/api/properties") 
      .then((response) => setProperties(response.data))
      .catch((error) => console.error("Error fetching properties:", error));
  }, []);

  return (
    <><Navbar/>
    <div className="buyer-container">
    <h2 className="buyer-title">Available Properties</h2>
    <div className="buyer-property-list">
      {properties.length > 0 ? (
        properties.map((property) => (
          <div key={property.id} className="buyer-property-card">
            {property.images.length > 0 && (
              <img src={property.images} alt="Property" className="buyer-property-image" />
            )}
            <div className="buyer-property-details">
              <h3>{property.propertyType} - {property.homeDetails}</h3>
              <p><strong>Transaction:</strong> {property.transactionType}</p>
              <p><strong>Price:</strong> ₹{property.price}</p>
              <p><strong>Location:</strong> {property.location.state}, {property.location.district}, {property.location.pincode}</p>
              <p><strong>Mobile:</strong> {property.mobileNumber}</p>
              {property.notes && <p><strong>Notes:</strong> {property.notes}</p>}
            </div>
          </div>
        ))
      ) : (
        <p>No properties available.</p>
      )}
    </div>
  </div></>
  
  );
};

export default BuyerPage;
