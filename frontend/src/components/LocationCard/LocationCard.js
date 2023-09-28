import React from "react";
import "./LocationCard.css";
import Card from 'react-bootstrap/Card';


// may have to import proptypes later?

const LocationCard = ({ title, image, crops, population, unemployment, labor_force }) => {
    return (
      // specifies CSS class used
      <Card className="location-card">
        <img src={image} alt={title} className="location-card-image" />
        <div className="location-card-details">
          <h2 className="location-card-title">{title}</h2>
          <p className="location-card-crop">{crops}</p>
          <p className="location-card-population">{population}</p>
          <p className="location-card-unemployment">{unemployment}</p>
          <p className="location-card-labor_force">{labor_force}</p>
          {/* Add more details if needed */}
        </div>
      </Card>
    );
  };
  
  export default LocationCard;