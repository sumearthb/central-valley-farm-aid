import React from "react";
import "./NPCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NPCard = ({ nonprofit }) => {
  return (
    // specifies CSS class used
    <Card className="np-card">
      <Card.Img className="np-card-image" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${nonprofit.photo_references.photos[0]}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}/>
      <Card.Body className="np-card-body">
        <Card.Title className="np-card-name">
          {nonprofit.charityName}
        </Card.Title>
        <Card.Text className="np-card-category">
          Category: {nonprofit.category}
        </Card.Text>
        <Card.Text className="np-card-city">
          City: {nonprofit.city}
        </Card.Text>
        <Card.Text className="np-card-zip">
          Zip Code: {nonprofit.zipCode}
        </Card.Text>
        <Card.Text className="np-card-ein">
          Employee Identification Number: {nonprofit.ein}
        </Card.Text>
        <Link
          to={nonprofit.url}
          style={{ textDecoration: "none" }}>
          {nonprofit.url}
        </Link>
        <Link
          to={`/nonprofits/${nonprofit.charityName}`}
          style={{ textDecoration: "none" }}>
          <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default NPCard;