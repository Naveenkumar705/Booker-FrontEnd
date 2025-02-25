import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./css/EditProperty.css";
import Navbar from "./Navbar";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState({
    userType: "",
    propertyType: "",
    transactionType: "",
    homeDetails: "",
    location: { state: "", district: "", pincode: "" },
    price: "",
    mobileNumber: "",
    notes: "",
    image: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:9093/api/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error("Error fetching property:", error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setProperty({
      ...property,
      location: { ...property.location, [e.target.name]: e.target.value },
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProperty({ ...property, image: [reader.result] });
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure image is a string if it's an array
    const updatedProperty = {
        ...property,
        image: Array.isArray(property.image) ? property.image[0].toString() : property.image.toString(),
    };

    console.log("Submitting property update:", updatedProperty);  // Debugging

    try {
        const response = await axios.put(
            `http://localhost:9093/api/properties/${id}`,
            updatedProperty,
            { headers: { "Content-Type": "application/json" } }
        );
        console.log("Update successful:", response.data);
        alert("Property updated successfully!");
        navigate("/profile");
    } catch (error) {
        console.error("Error updating property:", error.response ? error.response.data : error.message);
        alert("Error updating property. Check console for details.");
    }
};




  
  return (
    <>
      <Navbar />
      <div className="edit-property-container">
        <h2>Edit Property</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>User Type</label>
            <select name="userType" value={property.userType} onChange={handleChange} required>
              <option value="">Select User Type</option>
              <option value="Owner">Owner</option>
              <option value="Agent">Agent</option>
              <option value="Builder">Builder</option>
            </select>

            <label>Transaction Type</label>
            <select name="transactionType" value={property.transactionType} onChange={handleChange} required>
              <option value="">Select Transaction Type</option>
              <option value="Sale">Sale</option>
              <option value="Rent">Rent</option>
              <option value="Lease">Lease</option>
            </select>
          </div>

          <div className="form-group">
            <label>Property Type</label>
            <select name="propertyType" value={property.propertyType} onChange={handleChange} required>
              <option value="">Select Property Type</option>
              <option value="Apartment">Apartment</option>
              <option value="Home">Home</option>
            </select>

            <label>Home Details (BHK)</label>
            <select name="homeDetails" value={property.homeDetails} onChange={handleChange} required>
              <option value="">Select BHK Type</option>
              <option value="1BHK">1BHK</option>
              <option value="2BHK">2BHK</option>
              <option value="3BHK">3BHK</option>
            </select>
          </div>

          <label>Location</label>
          <div className="location-group">
            <input type="text" name="state" placeholder="State" value={property.location.state} onChange={handleLocationChange} required />
            <input type="text" name="district" placeholder="District" value={property.location.district} onChange={handleLocationChange} required />
            <input type="text" name="pincode" placeholder="Pincode" value={property.location.pincode} onChange={handleLocationChange} required />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={property.price} onChange={handleChange} required />

            <label>Mobile Number</label>
            <input type="tel" name="mobileNumber" value={property.mobileNumber} onChange={handleChange} required />
          </div>

          <label>Additional Notes</label>
          <textarea name="notes" value={property.notes} onChange={handleChange}></textarea>

          <label>Image Upload</label>
          <input type="file" onChange={handleImageUpload} />
          {property.image.length > 0 && (
            <div className="image-preview">
              {/* <img src={property.images[0]} alt="Uploaded" className="preview-img" /> */}
              <img src={property.image} alt={property.name} className="home-image" />
            </div>
          )}

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </>
  );
};

export default EditProperty;