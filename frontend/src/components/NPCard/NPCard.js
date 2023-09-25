import React from "react";
import "./NPCard.css";

// may have to import proptypes later?

const NPCard = ({ title, image, description }) => {
    return (
      // specifies CSS class used
      <div className="np-card">
        <img src={image} alt={title} className="np-card-image" />
        <div className="np-card-details">
          <h2 className="np-card-title">{title}</h2>
          <p className="np-card-description">{description}</p>
          {/* Add more details if needed */}
        </div>
      </div>
    );
  };
  
  export default NPCard;