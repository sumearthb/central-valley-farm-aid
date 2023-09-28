import React from "react";
import "./LocationCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


// may have to import proptypes later?

const LocationCard = ({ title, image, crops, population, unemployment, labor_force }) => {
    return (
      // specifies CSS class used
      <Card className="location-card d-flex flex-column">
        <img src={image} alt={title} className="location-card-image" />
        <div className="location-card-details">
          <h2 className="location-card-title">{title}</h2>
          <p className="location-card-crop">{crops}</p>
          <p className="location-card-population">{population}</p>
          <p className="location-card-unemployment">{unemployment}</p>
          <p className="location-card-labor_force">{labor_force}</p>
          <Link
            to={`/location/${title}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
          </Link>
          {/* Add more details if needed */}
        </div>
      </Card>
    );
  };
  
  export default LocationCard;