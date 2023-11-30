import React from "react";
import "./NPCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import defaultImage from "../../card-pics/default_image.png";

const NPCard = ({ nonprofit, search }) => {
  return (
    <Card className="np-card">
      <Card.Img
        className="np-card-image"
        src={ nonprofit.photo_references.photos.length > 0
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${nonprofit.photo_references.photos[0]}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`
            : defaultImage 
        }
      />
      <Card.Body className="np-card-body">
        <Card.Title className="np-card-name">
          <Highlighter textToHighlight={nonprofit.charityName} searchWords={search.split(" ")}/>
        </Card.Title>
        <Card.Text className="np-card-category">
          Category: <Highlighter textToHighlight={nonprofit.category} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="np-card-city">
          City: <Highlighter textToHighlight={nonprofit.city} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="np-card-zip">
          Zip Code: <Highlighter textToHighlight={nonprofit.zipCode} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="np-card-ein">
          Employee Identification Number: <Highlighter textToHighlight={nonprofit.ein} searchWords={search.split(" ")}/>
        </Card.Text>
        <Link
          to={nonprofit.url}
          style={{ textDecoration: "none" }}>
          <Highlighter textToHighlight={nonprofit.url} searchWords={search.split(" ")}/>
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