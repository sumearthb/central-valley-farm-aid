import React from "react";
import "./FMCard.css";

// may have to import proptypes later?

const FMCard = ({ title, image, description }) => {
    return (
      // specifies CSS class used
      <div className="fm-card">
        <img src={image} alt={title} className="fm-card-image" />
        <div className="fm-card-details">
          <h2 className="fm-card-title">{title}</h2>
          <p className="fm-card-description">{description}</p>
          {/* Add more details if needed */}
        </div>
      </div>
    );
  };
  
  export default FMCard;