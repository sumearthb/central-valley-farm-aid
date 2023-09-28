import React from "react";
import "./NPCard.css";
import Card from 'react-bootstrap/Card';

// may have to import proptypes later?

const NPCard = ({ title, image, county, NTEE_code, phone, employees }) => {
    return (
      // specifies CSS class used
      <Card className="np-card mb-4" style={{position: "relative" }}>
        <Card.Body style={{position: "relative"}}>
          <img src={image} alt={title} className="np-card-image mx-auto" />
          <div className="np-card-details">
            <h2 className="np-card-title" style={{ marginBottom: "10px" }}>{title}</h2>
            <p className="np-card-county">{county}</p>
            <p className="np-card-NTEE_code">{NTEE_code}</p>  
            <p className="np-card-phone">{phone}</p>
            <p className="np-card-employees">{employees}</p>
          </div>
        </Card.Body>
      </Card>
    );
  };
  
  export default NPCard;