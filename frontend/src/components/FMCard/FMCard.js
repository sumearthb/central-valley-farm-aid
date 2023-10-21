import React from "react";
import "./FMCard.css";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FMCard = ({ market_name, address, indoor, special_prod, fnap, img}) => {
  return (
    // specifies CSS class used
    <Card className="fm-card">
      <Card.Img className="fm-card-image" src={img}/>
      <Card.Body className="fm-card-body">
        <Card.Title className="fm-card-title">
          {market_name}
        </Card.Title>
        <Card.Text className="fm-card-address">
          Address: {address}
        </Card.Text>
        <Card.Text className="fm-card-population">
          Indoor Status: {indoor}
        </Card.Text>
        <Card.Text className="fm-card-established">
          Crop Production: {special_prod}
        </Card.Text>
        <Card.Text className="fm-card-established">
          FNAP Status: {fnap}
        </Card.Text>
        <Link
          to={`/farmersmarkets/${market_name}`}
          style={{ textDecoration: "none" }}
        >
          <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};
  
export default FMCard;