import React from "react";
import "./LocationCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LocationCard = ({ location }) => {
  return (
    <Card className="location-card">
      <Card.Img className="location-card-image" src={location.map.replace("100px", "400px")}/>
      <Card.Body className="location-card-body">
        <Card.Title className="location-card-title">
          {location.name + " County"}
        </Card.Title>
        <Card.Text className="location-card-countyseat">
          County Seat: {location.county_seat}
        </Card.Text>
        <Card.Text className="location-card-crop">
          # of Crops: {location.crops.crops.length}
        </Card.Text>
        <Card.Text className="location-card-population">
          Population: {location.population}
        </Card.Text>
        <Card.Text className="location-card-established">
          Established: {location.est}
        </Card.Text>
        <Card.Text className="location-card-area">
          Area: {location.area} sq mi
        </Card.Text>
        <Link
          to={`/locations/${location.name}`}
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