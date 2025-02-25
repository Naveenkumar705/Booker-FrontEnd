import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

const HouseRegistration = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState(""); // User's email

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image); // Convert image to Base64

    reader.onloadend = async () => {
      const houseData = {
        name,
        address,
        image: reader.result, // Store Base64 string
        email, // Store user's email
      };

      try {
        const response = await axios.post("http://localhost:5000/houses", houseData);
        if (response.status === 201 || response.status === 200) {
          alert("House registered successfully!");
          sendEmail(email, name, address); // Send confirmation email
        } else {
          alert("Failed to register house.");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    };
  };

  // Function to send email using EmailJS
  const sendEmail = (userEmail, houseName, houseAddress) => {
    const serviceId = "service_v0nkvd7"; // Your EmailJS Service ID
    const templateId = "template_87dggkl"; // Your EmailJS Template ID
    const userId = "41d6u_bh8AIt5_C_0"; // Your EmailJS Public Key

    const templateParams = {
      from_email: "your-email@example.com", // Your email (set in EmailJS)
      to_email: userEmail, // User's email
      to_name: userEmail.split("@")[0], // Extract name from email
      house_name: houseName,
      house_address: houseAddress,
    };

    emailjs.send(serviceId, templateId, templateParams, userId)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
        alert("Confirmation email sent to " + userEmail);
      })
      .catch((err) => {
        console.error("Error sending email:", err);
      });
  };

  return (
    <div>
      <h2>Register a House</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="House Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="User's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Register House</button>
      </form>
    </div>
  );
};

export default HouseRegistration;
