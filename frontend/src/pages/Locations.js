import React, { useState, useEffect } from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import { Col, Container } from "react-bootstrap";
import PageSelector from "../components/PageSelector";
import { fetchLocations, fetchLocationsLength } from "../utils/ApiUtils";

const LocationsGrid = () => {

  const [locations, setLocations] = useState([]);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [totalLocations, setTotalLocations] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initPages = async () => {
      setLoading(true);
      const numLocations = await fetchLocationsLength();
      setTotalLocations(numLocations);
      setNumPages(Math.ceil(numLocations / 20));
      setLoading(false);
    };
    initPages();
  }, []);

  useEffect(() => {
    const loadLocations = async () => {
      setLoading(true);
      const fetchedLocations = await fetchLocations(curPage);
      setLocations(fetchedLocations.data);
      setLoading(false);
    };
    loadLocations();
    
  }, [curPage]);

  return (
    <Container className="d-flex justify-content-center flex-column" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <Container className="container text-center mt-5 mb-4">
        <h1>Locations</h1>
      </Container>

      <Container className="d-flex my-5">
                <iframe
                  title="map"
                  className="map"
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  width="100%"
                  height="600"
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&q=Fresno County`}
                ></iframe>
              </Container>


      <Container>
        <h3 style={{ marginBottom: "30px"}}>{`Displaying ${locations.length} out of ${totalLocations} results`}</h3>
      </Container>
      {!loading && <div className="pageselector">
        <PageSelector
        numPages={numPages}
        curPage={curPage}
        setCurPage={setCurPage}/>
        </div> }

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
