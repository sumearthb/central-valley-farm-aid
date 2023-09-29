import React from "react";
import FMCard from "../components/FMCard/FMCard";
import fairfax from "../card-pics/fm-pics/fairfaxcommunity.png";
import springs from "../card-pics/fm-pics/springscommunity.png";
import novato from "../card-pics/fm-pics/downtownnovato.png";
import { Container, Col, Row } from "react-bootstrap";

const FMGrid = () => {
  const FMData = [
    { title: "Fairfax Community Farmers' Market", image: fairfax, location: "Location: 142 Bolinas Road, Fairfax, California 94930, USA", hours: "Hours: Wednesday: 04:00 PM - 08:00 PM", seasons: "Seasons: May to October", vendors: "# of vendors: 35" },
    { title: "The Springs Community Farmers' Market", image: springs, location: "Location: Parking lot at Boyes Blvd & Hwy 12, Boyes Hot Springs , California 95476", hours: "Hours: N/A", seasons: "Seasons: September to November", vendors: "# of vendors: 20" },
    { title: "Downtown Novato Community Farmers' Market", image: novato, location: "Location: 7th Street behind the CVS between Grant Ave & Novato Blvd , Novato , California 94947", hours: "Hours: Tuesday: 04:00 PM - 08:00 PM", seasons: "Seasons: May to September", vendors: "# of vendors: 45" },
  ];

  return (
    <>
    <Container className="d-flex justify-content-center flex-column">
      <Container className="container text-center mt-5 mb-4">
        <h1>Farmers' Markets</h1>
        <h3 style={{ marginBottom: "30px" }}>Displaying 3 out of 3 results</h3>
      </Container>

      <Container className="px-4" style={{ maxWidth: "100%" }}>
        <Row className="gx-3 justify-content-center">
          {( FMData.map((farmersmarket, index) => (
            <Col key={index} xs={8} sm={8} md={6} lg={4} className="d-flex justify-content-center">
              <FMCard
                  title={farmersmarket.title}
                  image={farmersmarket.image}
                  location={farmersmarket.location}
                  site={farmersmarket.site}
                  hours={farmersmarket.hours}
                  seasons={farmersmarket.seasons}
                  vendors={farmersmarket.vendors}
              />
            </Col>
          )))}
        </Row>
      </Container>
    </Container>
    </>
  );
};

export default FMGrid;