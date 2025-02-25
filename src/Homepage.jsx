import React, { useState } from "react";
import Hero from "./Hero";
import HouseList from "./HouseList";
import Navbar from "./Navbar"

const HomePage = () => {
  const [filteredProperties, setFilteredProperties] = useState([]); // Store filtered data

  return (
    <>
       <Navbar/>
      <Hero onSearch={setFilteredProperties} /> {/* Pass function to update filtered data */}
      <HouseList properties={filteredProperties} /> {/* Show only filtered properties */}
    </>
  );
};

export default HomePage;
