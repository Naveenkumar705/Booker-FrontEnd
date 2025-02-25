import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Hero.css"; // Ensure styles are correctly applied

const Hero = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    listingType: "", // Sell, Rent, or Lease
    propertyType: "",
    location: "",
    priceRange: "",
  });

  const [allProperties, setAllProperties] = useState([]); // Store all data from backend

  // Fetch all properties from backend when component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost:9093/api/properties");
        setAllProperties(response.data || []); // Store all properties, fallback to empty array
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();

    // If no filters are applied, show only visible properties
    if (!filters.location && !filters.propertyType && !filters.listingType && !filters.priceRange) {
      onSearch(allProperties.filter(property => !property.hide)); // Exclude hidden properties
      return;
    }

    // Filter properties safely
    const filteredResults = allProperties.filter((property) => {
      if (property.hide) return false; // Exclude hidden properties ✅

      const transactionType = property?.transactionType ? property.transactionType.toLowerCase() : "";
      const propertyType = property?.propertyType ? property.propertyType.toLowerCase() : "";
      const locationString = property?.location
        ? `${property.location.state || ""}, ${property.location.district || ""}, ${property.location.pincode || ""}`
        : "";
      const price = property?.price ? parseInt(property.price) : 0; // Ensure price is a number

      // Check filters
      const isMatchingListingType =
        !filters.listingType || transactionType === filters.listingType.toLowerCase();

      const isMatchingPropertyType =
        !filters.propertyType || propertyType.includes(filters.propertyType.toLowerCase());

      const isMatchingLocation =
        !filters.location || locationString.toLowerCase().includes(filters.location.toLowerCase());

      const isMatchingPrice =
        !filters.priceRange || (price && price <= parseInt(filters.priceRange));

      return isMatchingListingType && isMatchingPropertyType && isMatchingLocation && isMatchingPrice;
    });

    onSearch(filteredResults); // Pass filtered data to parent component
  };

  return (
    <div className="hero-wrapper">
      <section className="hero">
        <div className="container">
          <h1>Search Your Next Home</h1>
          <p>Find new & featured properties located in your local city.</p>

          <form className="hero-form" onSubmit={handleSearch}>
            {/* Listing Type Selection (Sell, Rent, Lease) */}
            <div className="box">
              <span>Listing Type</span>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="listingType"
                    value="sale"
                    checked={filters.listingType === "sale"}
                    onChange={handleChange}
                  />
                  Sell
                </label>
                <label>
                  <input
                    type="radio"
                    name="listingType"
                    value="rent"
                    checked={filters.listingType === "rent"}
                    onChange={handleChange}
                  />
                  Rent
                </label>
                <label>
                  <input
                    type="radio"
                    name="listingType"
                    value="lease"
                    checked={filters.listingType === "lease"}
                    onChange={handleChange}
                  />
                  Lease
                </label>
              </div>
            </div>

            {/* Property Type Selection */}
            <div className="box">
              <span>Property Type</span>
              <select name="propertyType" value={filters.propertyType} onChange={handleChange}>
                <option value="">All</option>
                <option value="apartment">Apartment</option>
                <option value="home">Home</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="box">
              <span>City/State/Pincode</span>
              <input
                type="text"
                name="location"
                placeholder="Enter City, State, or Pincode"
                value={filters.location}
                onChange={handleChange}
              />
            </div>

            {/* Price Range Input */}
            <div className="box">
              <span>Max Price (₹)</span>
              <input
                type="number"
                name="priceRange"
                placeholder="Max Price"
                value={filters.priceRange}
                onChange={handleChange}
              />
            </div>

            {/* Search Button */}
            <button type="submit" className="btn1">
              <i className="fa fa-search"></i> Search
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Hero;

