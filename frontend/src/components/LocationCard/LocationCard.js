import React from "react";
import "./LocationCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchLocations, fetchLocationsLength} from "../../utils/ApiUtils";


const LocationCard = ({ name, crops, population, est, img}) => {
    return (
      // specifies CSS class used
      <Card className="location-card">
        {/* <Card.Img src={`https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&center=${title} County, CA&zoom=8&size=300x400`} alt={title} className="location-card-image" /> */}
        <Card.Img className="location-card-image" src={img.replace("100px", "400px")}/>
        <Card.Body className="location-card-body">
          <Card.Title className="location-card-title">
            {name + " County"}
          </Card.Title>
          <Card.Text className="location-card-crop">
            # of Crops: {crops.length}
          </Card.Text>
          <Card.Text className="location-card-population">
            Population: {population}
          </Card.Text>
          <Card.Text className="location-card-established">
            Established: {est}
          </Card.Text>
          <Link
            to={`/locations/${name}`}
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