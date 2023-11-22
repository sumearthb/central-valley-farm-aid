import React from "react";
import "./LocationCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";

const LocationCard = ({ location, search }) => {
  return (
    <Card className="location-card">
      <Card.Img className="location-card-image" src={location.map.replace("100px", "400px")}/>
      <Card.Body className="location-card-body">
        <Card.Title className="location-card-title">
        <Highlighter textToHighlight={location.name + " County"} searchWords={search.split(" ")}/>
        </Card.Title>
        <Card.Text className="location-card-countyseat">
          County Seat: <Highlighter textToHighlight={location.county_seat} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="location-card-crop">
          # of Crops: <Highlighter textToHighlight={location.crops.crops.length.toString()} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="location-card-population">
          Population: <Highlighter textToHighlight={location.population.toString()} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="location-card-established">
          Established: <Highlighter textToHighlight={location.est.toString()} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="location-card-area">
          Area: <Highlighter textToHighlight={location.area + " sq mi"} searchWords={search.split(" ")}/>
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