import React from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import { Link } from "react-router-dom";
import fresno from "../card-pics/locations-pics/fresno.png";
import kern from "../card-pics/locations-pics/kern.png";
import kings from "../card-pics/locations-pics/kings.png";
import { Button, Col, Container } from "react-bootstrap";

const Locations = () => {
  // Hard coded data
  const locationsData = [
    { title: "Fresno", image: fresno, crops: "Crops: Corn, Cotton", population: "Population: 1.014 million", unemployment: "Unemployment Rate: 7.10%", labor_force: "Labor Force: 458,361"},
    { title: "Kern", image: kern, crops: "Crops: Corn, Cotton, Wheat", population: "Population: 917,673", unemployment: "Unemployment Rate: 8.1%", labor_force: "Labor Force: 397,355" },
    { title: "Kings", image: kings, crops: "Crops: Corn, Cotton, Wheat", population: "Population: 153,443", unemployment: "Unemployment Rate: 7.9%", labor_force: "Labor Force: 57,503" }
  ];

  return (
    <>
    <Container className="d-flex justify-content-center flex-column">
      <Container className="container text-center mt-5 mb-4">
        <h1>Locations</h1>
      </Container>

      <Container className="px-4">
        <Container className="row gx-3">
          {( locationsData.map((location, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4}>
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
    </>
    // <div className="locations">
    //   <h1 className="title" style={{ marginTop: "30px" }}>
    //     Locations
    //   </h1>
    //   {/* Title of page */}
    //   <div className="centered-container px-4">
    //     {/* Centered container for cards */}
    //     <div className="location-cards-container row-gx-3">
    //       {/* Applies the container class in CSS file */}
    //       {/* Render three LocationCard components */}
    //       {locationsData.map((location, index) => (
    //         <Col key={index} xs={12} sm={8} md={5} lg={4}>
    //           <LocationCard
    //             title={location.title}
    //             image={location.image}
    //             crops={location.crops}
    //             population={location.population}
    //             unemployment={location.unemployment}
    //             labor_force={location.labor_force}
    //           />
    //           <Link
    //             key={index}
    //             to={`/location/${location.title}`} // Specify the URL for the location
    //             style={{ textDecoration: "none" }}
    //           > 
    //             <Button variant="primary" style={{ backgroundColor: '#69A765'}} className="border-white"> More info</Button>
    //           </Link>
    //         </Col>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Locations;
