import React from "react";
import "./NPCard.css";
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// may have to import proptypes later?

const NPCard = ({ title, image, county, year, NTEE_code, phone, employees }) => {
    return (
      // specifies CSS class used
      <Card className="location-card d-flex flex-column">
          <img src={image} alt={title} className="np-card-image" />
          <div className="np-card-details">
            <h2 className="np-card-title" style={{ marginBottom: "10px" }}>{title}</h2>
            <p className="np-card-county">{county}</p>
            <h3 className="np-card-year">{year}</h3>
            <p className="np-card-NTEE_code">{NTEE_code}</p>  
            <p className="np-card-phone">{phone}</p>
            <p className="np-card-employees">{employees}</p>
            <Link
            to={`/nonprofits/${title}`}
            style={{ textDecoration: "none" }}
          >
            <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="align-self-end border-white">More info</Button>
          </Link>
          {/* Add more details if needed */}
          </div>
      </Card>
    );
  };
  
  export default NPCard;