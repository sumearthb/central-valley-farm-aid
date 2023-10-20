import React from "react";
import "./LocationCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// may have to import proptypes later?

const LocationCard = ({ title, crops }) => {
    return (
      // specifies CSS class used
      <Card className="location-card">
        <Card.Img src={`https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&center=${title} County, CA&zoom=8&size=300x400`} alt={title} className="location-card-image" />
        <Card.Body className="location-card-body">
          <Card.Title className="location-card-title">
            {title}
          </Card.Title>
          <Card.Text className="location-card-crop">
            # of Crops: {crops.length}
          </Card.Text>
          <Link
            to={`/location/${title}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
          </Link>
          {/* Add more details if needed */}
        </Card.Body>
      </Card>
    );
  };
  
  export default LocationCard;