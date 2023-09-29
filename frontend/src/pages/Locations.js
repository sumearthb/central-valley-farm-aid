import React from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import fresno from "../card-pics/locations-pics/fresno.png";
import kern from "../card-pics/locations-pics/kern.png";
import kings from "../card-pics/locations-pics/kings.png";
import { Col, Container } from "react-bootstrap";

const LocationsGrid = () => {
  // Hard coded data
  const locationsData = [
    { title: "Fresno", image: fresno, crops: "Crops: Corn, Cotton", population: "Population: 1.014 million", unemployment: "Unemployment Rate: 7.10%", labor_force: "Labor Force: 458,361"},
    { title: "Kern", image: kern, crops: "Crops: Corn, Cotton, Wheat", population: "Population: 917,673", unemployment: "Unemployment Rate: 8.1%", labor_force: "Labor Force: 397,355" },
    { title: "Kings", image: kings, crops: "Crops: Corn, Cotton, Wheat", population: "Population: 153,443", unemployment: "Unemployment Rate: 7.9%", labor_force: "Labor Force: 57,503" }
  ];

  return (
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>Locations</h1>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px"}}>Displaying 3 out of 3 results</h3>
      </Container>

      <Container className="px-4">
        <Container className="row gx-3">
          {( locationsData.map((location, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <LocationCard
                title={location.title}
                image={location.image}
                crops={location.crops}
                population={location.population}
                unemployment={location.unemployment}
                labor_force={location.labor_force}
              />
            </Col>
          )))}
        </Container>
      </Container>
    </Container>
  );
};

export default LocationsGrid;
