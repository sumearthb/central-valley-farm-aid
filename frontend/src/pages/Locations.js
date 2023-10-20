import React, { useState, useEffect } from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import { Col, Container } from "react-bootstrap";
import PageSelector from "../components/PageSelector";
import { getAllLocations, getCountyImg } from "../utils/ApiUtils";

const LocationsGrid = () => {

  const [locations, setLocations] = useState([]);
  const [locationInPage, setLocationsInPage] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

  const fetchData = async () => {
    const fetchedLocations = await getAllLocations();
    setLocations(fetchedLocations.data);
    setNumPages(fetchedLocations.data.length);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>Locations</h1>
      </Container>

      <Container>
        <h3 style={{ marginBottom: "30px"}}>{`Displaying ${9} out of ${locations.length} results`}</h3>
      </Container>
      <div className="pageselector">
        <PageSelector
        numPages={21}
        curPage={curPage}
        setCurPage={setCurPage}/>
        </div>

      <Container className="px-4">
        <Container className="row gx-3">
          {( locations.map((location, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <LocationCard
                title={location.location}
                crops={location.crops.crops}
              />
            </Col>
          )))}
        </Container>
      </Container>
    </Container>
  );
};

export default LocationsGrid;
