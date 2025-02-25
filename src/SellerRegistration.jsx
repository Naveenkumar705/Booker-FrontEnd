// import React, { useState } from "react";
// import axios from "axios";
// import "./css/SellerRegistration.css"; // Updated CSS file
// import Navbar from "./Navbar";

// const SellerRegistration = () => {
//   const [formData, setFormData] = useState({
//     userType: "",
//     propertyType: "",
//     transactionType: "",
//     homeDetails: "",
//     location: { state: "", district: "", pincode: "" },
//     price: "",
//     mobileNumber: "",
//     notes: "",
//     images: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleLocationChange = (e) => {
//     setFormData({
//       ...formData,
//       location: { ...formData.location, [e.target.name]: e.target.value },
//     });
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0]; // Get the first selected file
  
//     if (file) {
//       if (file.size > 2 * 1024 * 1024) {
//         alert("Image size should be less than 2MB");
//         return;
//       }
  
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         setFormData({ ...formData, images: reader.result }); // ✅ Store as string, not array
//       };
//     }
//   };
  
  
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const storedUser = JSON.parse(localStorage.getItem("user"));
  
//     const finalData = {
//       ...formData,
//       email: storedUser.email,
//       hide: false,
//       image: formData.images || "",  // ✅ Ensure correct image format
//     };
  
//     try {
//       const response = await axios.post("http://localhost:9093/api/properties", finalData);
//       console.log("Success:", response.data);
//       alert("Property Registered Successfully!");
  
//       setFormData({
//         userType: "",
//         hide: false,
//         propertyType: "",
//         transactionType: "",
//         homeDetails: "",
//         location: { state: "", district: "", pincode: "" },
//         price: "",
//         mobileNumber: "",
//         notes: "",
//         images: "",
//       });
  
//       document.getElementById("seller-fileInput").value = "";
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };
  
  

//   return (
//     <><Navbar/>
//     <div className="seller-container">
//       <h2 className="seller-title">Seller Registration</h2>
//       <form onSubmit={handleSubmit} className="seller-form">
//         <select name="userType" value={formData.userType} onChange={handleChange} className="seller-select">
//           <option value="">Select User Type</option>
//           <option value="Owner">Owner</option>
//           <option value="Agent">Agent</option>
//           <option value="Builder">Builder</option>
//         </select>

//         <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="seller-select">
//           <option value="">Select Transaction Type</option>
//           <option value="Sale">Sale</option>
//           <option value="Rent">Rent</option>
//           <option value="Lease">Lease</option>
//         </select>

//         <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="seller-select">
//           <option value="">Select Property Type</option>
//           <option value="Apartment">Apartment</option>
//           <option value="Home">Home</option>
//         </select>

//         <select name="homeDetails" value={formData.homeDetails} onChange={handleChange} className="seller-select">
//           <option value="">Select BHK Type</option>
//           <option value="1BHK">1BHK</option>
//           <option value="2BHK">2BHK</option>
//           <option value="3BHK">3BHK</option>
//         </select>

//         <div className="seller-grid-container">
//           <input type="text" name="state" placeholder="State" value={formData.location.state} onChange={handleLocationChange} className="seller-input" />
//           <input type="text" name="district" placeholder="District" value={formData.location.district} onChange={handleLocationChange} className="seller-input" />
//           <input type="text" name="pincode" placeholder="Pincode" value={formData.location.pincode} onChange={handleLocationChange} className="seller-input" />
//         </div>

//         <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="seller-input" />

//         <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className="seller-input" required />

//         <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange} className="seller-textarea"></textarea>

//         <input type="file" id="seller-fileInput" multiple onChange={handleImageUpload} className="seller-file-input" />

//         <button type="submit" className="seller-button">Submit</button>
//       </form>
//     </div>
//     {/* Image Preview */}
// {formData.images.length > 0 && (
//   <div className="image-preview">
//     <img src={formData.images[0]} alt="Uploaded" className="preview-img" />
//   </div>
// )}
// </>
//   );
// };

// export default SellerRegistration;



import React, { useState } from "react";
import axios from "axios";
import "./css/SellerRegistration.css";
import Navbar from "./Navbar";

const SellerRegistration = () => {
  const [formData, setFormData] = useState({
    userType: "",
    propertyType: "",
    transactionType: "",
    homeDetails: "",
    location: { state: "", district: "", pincode: "" },
    price: "",
    mobileNumber: "",
    notes: "",
    images: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationChange = (e) => {
    setFormData({
      ...formData,
      location: { ...formData.location, [e.target.name]: e.target.value },
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
        setFormData({ ...formData, images: reader.result });
      };
    }
  };

  const validateForm = () => {
    const { userType, propertyType, transactionType, homeDetails, price, mobileNumber, location } = formData;

    if (!userType || !propertyType || !transactionType || !homeDetails) {
      alert("All dropdown fields must be selected.");
      return false;
    }

    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      alert("Enter a valid 10-digit mobile number.");
      return false;
    }

    if (!/^[0-9]{6}$/.test(location.pincode)) {
      alert("Enter a valid 6-digit pincode.");
      return false;
    }

    if (price <= 0 || isNaN(price)) {
      alert("Enter a valid price.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const finalData = {
      ...formData,
      email: storedUser.email,
      hide: false,
      image: formData.images || "",
    };

    try {
      const response = await axios.post("http://localhost:9093/api/properties", finalData);
      console.log("Success:", response.data);
      alert("Property Registered Successfully!");

      setFormData({
        userType: "",
        propertyType: "",
        transactionType: "",
        homeDetails: "",
        location: { state: "", district: "", pincode: "" },
        price: "",
        mobileNumber: "",
        notes: "",
        images: "",
      });

      document.getElementById("seller-fileInput").value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="seller-container">
        <h2 className="seller-title">Seller Registration</h2>
        <form onSubmit={handleSubmit} className="seller-form">
          <select name="userType" value={formData.userType} onChange={handleChange} className="seller-select" required>
            <option value="">Select User Type</option>
            <option value="Owner">Owner</option>
            <option value="Agent">Agent</option>
            <option value="Builder">Builder</option>
          </select>

          <select name="transactionType" value={formData.transactionType} onChange={handleChange} className="seller-select" required>
            <option value="">Select Transaction Type</option>
            <option value="Sale">Sale</option>
            <option value="Rent">Rent</option>
            <option value="Lease">Lease</option>
          </select>

          <select name="propertyType" value={formData.propertyType} onChange={handleChange} className="seller-select" required>
            <option value="">Select Property Type</option>
            <option value="Apartment">Apartment</option>
            <option value="Home">Home</option>
          </select>

          <select name="homeDetails" value={formData.homeDetails} onChange={handleChange} className="seller-select" required>
            <option value="">Select BHK Type</option>
            <option value="1BHK">1BHK</option>
            <option value="2BHK">2BHK</option>
            <option value="3BHK">3BHK</option>
          </select>

          <div className="seller-grid-container">
            <input type="text" name="state" placeholder="State" value={formData.location.state} onChange={handleLocationChange} className="seller-input" required />
            <input type="text" name="district" placeholder="District" value={formData.location.district} onChange={handleLocationChange} className="seller-input" required />
            <input type="text" name="pincode" placeholder="Pincode" value={formData.location.pincode} onChange={handleLocationChange} className="seller-input" required />
          </div>

          <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="seller-input" required />

          <input type="tel" name="mobileNumber" placeholder="Mobile Number" value={formData.mobileNumber} onChange={handleChange} className="seller-input" required />

          <textarea name="notes" placeholder="Additional Notes" value={formData.notes} onChange={handleChange} className="seller-textarea"></textarea>

          <input type="file" id="seller-fileInput" onChange={handleImageUpload} className="seller-file-input" />

          <button type="submit" className="seller-button">Submit</button>
        </form>

        {formData.images && (
          <div className="image-preview">
            <img src={formData.images} alt="Uploaded" className="preview-img" />
          </div>
        )}
      </div>
    </>
  );
};

export default SellerRegistration;
