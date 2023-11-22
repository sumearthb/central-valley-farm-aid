import React from "react";
import "./FMCard.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Highlighter from "react-highlight-words";

const FMCard = ({ market, search }) => {
  return (
    <Card className="fm-card">
      <Card.Img className="fm-card-image" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${market.photo_references[0]}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}/>
      <Card.Body className="fm-card-body">
        <Card.Title className="fm-card-title">
          <Highlighter textToHighlight={market.listing_name} searchWords={search.split(" ")}/>
        </Card.Title>
        <Card.Text className="fm-card-rating">
          Rating: <Highlighter textToHighlight={market.rating.toString()} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="fm-card-indoor">
          Indoor Status: <Highlighter textToHighlight={market.location_indoor} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="fm-card-production">
          Crop Production: <Highlighter textToHighlight={market.specialproductionmethods} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="fm-card-fnap">
          FNAP Status: <Highlighter textToHighlight={market.fnap.replace("0", "None")} searchWords={search.split(" ")}/>
        </Card.Text>
        <Card.Text className="fm-card-wheelchair">
          Wheelchair Accessible: <Highlighter textToHighlight={market.wheelchair_accessible} searchWords={search.split(" ")}/>
        </Card.Text>
        <Link
          to={`/farmersmarkets/${market.listing_name}`}
          style={{ textDecoration: "none" }}>
          <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
  
export default FMCard;