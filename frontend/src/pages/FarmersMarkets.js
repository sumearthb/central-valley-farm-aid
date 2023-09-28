import React from "react";
import FMCard from "../components/FMCard/FMCard";
import { Link } from "react-router-dom";
import fairfax from "../card-pics/markets-pics/fairfaxcommunity.png";
import springs from "../card-pics/markets-pics/springscommunity.png";
import novato from "../card-pics/markets-pics/downtownnovato.png";
import { Container, Col } from "react-bootstrap";

const FMData = [
  { title: "Fairfax Community Farmers' Market", image: fairfax, location: "Location: 142 Bolinas Road, Fairfax, California 94930, USA", hours: "Hours: Wednesday: 04:00 PM - 08:00 PM", seasons: "Seasons: May to October", vendors: "# of vendors: 35" },
  { title: "The Springs Community Farmers' Market", image: springs, location: "Location: Parking lot at Boyes Blvd & Hwy 12, Boyes Hot Springs , California 95476", hours: "Hours: N/A", seasons: "Seasons: September to November", vendors: "# of vendors: 20" },
  { title: "Downtown Novato Community Farmers' Market", image: novato, location: "Location: 7th Street behind the CVS between Grant Ave & Novato Blvd , Novato , California 94947", hours: "Hours: Tuesday: 04:00 PM - 08:00 PM", seasons: "Seasons: May to September", vendors: "# of vendors: 45" }
];

const FMGrid = () => {

  return (
    <Container className="d-flex justify-content-center flex-column">
      <Container className="container text-center mt-5 mb-4">
        <h1>Farmers' Markets</h1>
      </Container>

      <Container className="px-4">
        <Container className="row gx-3">
          {FMData.map((farmersmarket, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4}>
              <Link
              key={index}
              to={`/farmersmarket/${farmersmarket.title}`} // Specify the URL for the farmers market
              style={{ textDecoration: "none" }}
              >
                <FMCard
                  title={farmersmarket.title}
                  image={farmersmarket.image}
                  location={farmersmarket.location}
                  site={farmersmarket.site}
                  hours={farmersmarket.hours}
                  seasons={farmersmarket.seasons}
                  vendors={farmersmarket.vendors}
                />
              </Link>
            </Col>
          ))}
        </Container>
      </Container>
    </Container>
  );
};

<div className="farmersmarkets">
      <h1 className="title" style={{ marginTop: "30px" }}>
        Farmers Markets
      </h1>
      {/* Title of page */}
      <div className="centered-container">
        {/* Centered container for cards */}
        <div className="fm-cards-container">
          {/* Applies the container class in CSS file */}
          {/* Render three FMCard components */}
          {FMData.map((farmersmarket, index) => (
            <Link
              key={index}
              to={`/farmersmarket/${encodeURIComponent(farmersmarket.title)}`} // Specify the URL for the farmers market
              style={{ textDecoration: "none" }}
            >
              <FMCard
                title={farmersmarket.title}
                image={farmersmarket.image}
                location={farmersmarket.location}
                site={farmersmarket.site}
                hours={farmersmarket.hours}
                seasons={farmersmarket.seasons}
                vendors={farmersmarket.vendors}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>

export default FMGrid;