import React from "react";
import "./FMCard.css";

// may have to import proptypes later?

const FMCard = ({ title, image, location, site, hours, seasons, vendors }) => {
    return (
      // specifies CSS class used
      <div className="fm-card mb-4" style={{position: "relative" }}>
        <img src={image} alt={title} className="fm-card-image mx-auto" />
        <div className="fm-card-details">
          <h2 className="fm-card-title" style={{ marginBottom: "10px" }}>{title}</h2>
          <p className="fm-card-location">{location}</p>
          <p className="fm-card-site">{site}</p>
          <p className="fm-card-hours">{hours}</p>
          <p className="fm-card-seasons">{seasons}</p>
          <p className="fm-card-vendors">{vendors}</p>
        </div>
      </div>
    );
  };
  
  export default FMCard;