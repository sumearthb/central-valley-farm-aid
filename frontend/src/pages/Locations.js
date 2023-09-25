import React from "react";
import LocationCard from "../components/LocationCard/LocationCard";

const Locations = () => {
  // Hard coded data
  const locationsData = [
    { title: "Location 1", image: "/placeholder.png", description: "Description 1" },
    { title: "Location 2", image: "/placeholder.png", description: "Description 2" },
    { title: "Location 3", image: "/placeholder.png", description: "Description 3" },
  ];

  return (
    <div className="locations">
      <h1 className="title" style={{ marginTop: "30px" }}>Locations</h1> {/*Title of page*/}
      <div className="centered-container"> {/* Centered container for cards*/}
        <div className="location-cards-container"> {/* Applies the container class in CSS file */}
          {/* Render three LocationCard components */}
          {locationsData.map((location, index) => (
            <LocationCard
              key={index}
              title={location.title}
              image={location.image}
              description={location.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;