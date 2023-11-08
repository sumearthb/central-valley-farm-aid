import React from "react";
import "./FMCard.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FMCard = ({ market }) => {
  return (
    <Card className="fm-card">
      <Card.Img className="fm-card-image" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${market.photo_references[0]}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}/>
      <Card.Body className="fm-card-body">
        <Card.Title className="fm-card-title">
          {market.listing_name}
        </Card.Title>
        <Card.Text className="fm-card-rating">
          Rating: {market.rating}
        </Card.Text>
        <Card.Text className="fm-card-indoor">
          Indoor Status: {market.location_indoor}
        </Card.Text>
        <Card.Text className="fm-card-production">
          Crop Production: {market.specialproductionmethods}
        </Card.Text>
        <Card.Text className="fm-card-fnap">
          FNAP Status: {market.fnap.replace("0", "None")}
        </Card.Text>
        <Card.Text className="fm-card-wheelchair">
          Wheelchair Accessible: {market.wheelchair_accessible}
        </Card.Text>
        <Link
          to={`/farmersmarkets/${market.name}`}
          style={{ textDecoration: "none" }}>
          <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
  
export default FMCard;