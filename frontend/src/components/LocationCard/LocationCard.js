import React from "react";
import "./LocationCard.css";

// may have to import proptypes later?

const LocationCard = ({ title, image, description }) => {
    return (
      // specifies CSS class used
      <div className="location-card">
        <img src={image} alt={title} className="location-card-image" />
        <div className="location-card-details">
          <h2 className="location-card-title">{title}</h2>
          <p className="location-card-description">{description}</p>
          {/* Add more details if needed */}
        </div>
      </div>
    );
  };
  
  export default LocationCard;