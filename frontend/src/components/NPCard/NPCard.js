import React from "react";
import "./NPCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { fetchNonProfits, fetchNonProfitsLength} from "../../utils/ApiUtils";

const NPCard = ({ charityName, category, city, phone, url, img}) => {
  return (
    // specifies CSS class used
    <Card className="np-card">
      <Card.Img className="np-card-image" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${img}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}/>
      <Card.Body className="np-card-body">
        <Card.Title className="np-card-name">
          {charityName}
        </Card.Title>
        <Card.Text className="np-card-category">
          Category: {category}
        </Card.Text>
        <Card.Text className="np-card-city">
          City: {city}
        </Card.Text>
        <Card.Text className="np-card-ein">
          Phone Number: {phone}
        </Card.Text>
        <Link
          to={url}
          style={{ textDecoration: "none" }}
        >
          Website
        </Link>
        <Link
          to={`/nonprofits/${charityName}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default NPCard;