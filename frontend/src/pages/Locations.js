import React from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import { Link } from "react-router-dom";

const Locations = () => {
  // Hard coded data
  const locationsData = [
    { title: "Location 1", image: "/placeholder.png", description: "Description 1" },
    { title: "Location 2", image: "/placeholder.png", description: "Description 2" },
    { title: "Location 3", image: "/placeholder.png", description: "Description 3" },
  ];

  return (
    <div className="locations">
      <h1 className="title" style={{ marginTop: "30px" }}>
        Locations
      </h1>
      {/* Title of page */}
      <div className="centered-container">
        {/* Centered container for cards */}
        <div className="location-cards-container">
          {/* Applies the container class in CSS file */}
          {/* Render three LocationCard components */}
          {locationsData.map((location, index) => (
            <Link
              key={index}
              to={`/location/${location.title}`} // Specify the URL for the location
              style={{ textDecoration: "none" }}
            >
              <LocationCard
                title={location.title}
                image={location.image}
                description={location.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
