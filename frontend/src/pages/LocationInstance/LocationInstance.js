import "../../styles/LocationInstance.css"
import React from "react";
import { useState, useEffect } from "react";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import "../../components/LocationCard/LocationCard.css";
import { useParams } from "react-router-dom";
import { fetchSpecLocation } from "../../utils/ApiUtils";

function LocationInstance() {
  const { id } = useParams();

  const [ locationData, setLocationData] = useState({});
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchSpecLocation(id);
      console.log(res.data[0]);
      setLocationData(res.data[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container className="location-instance">
      {!loading &&
      (<React.Fragment>
        <Container className="location-carousel">
          <Carousel>
            <Carousel.Item>
              <img className="carousel-img" src={locationData.map.replace("100px","1000px")} />
            </Carousel.Item>
            {locationData.photo_references.photos.map((photo) => (
              <Carousel.Item>
                <img className="carousel-img" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photo}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}></img>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
        <Container className="location-body">
          <Row>
            <h1 className="location-header">
              {locationData.name + " County"}
            </h1>
          </Row>
          <Row>
            <Col>
              <Container className="location-attributes">
                <Stack gap={3}>
                  <div className="p-2">
                    <h3>Established: </h3>
                    {locationData.est}
                  </div>
                  <div className="p-2">
                    <h3>Population: </h3>
                    {locationData.population}
                  </div>
                  <div className="p-2">
                    <h3>Area: </h3>
                    {locationData.area} sq mi
                  </div>
                  <div className="p-2">
                    <h3>Crops: </h3>
                    <Stack gap={1}>
                      {locationData.crops.crops.map(crop => (
                        <div>{crop}</div>
                      ))}
                    </Stack>
                  </div>
                </Stack>
              </Container>
            </Col>
            <Col>
              <Container className="location-map">
                <iframe
                title="map"
                className="map"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                width="100%"
                height="600"
                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&q=${locationData.name} County`}
                ></iframe>
              </Container>
            </Col>
          </Row>
          <Row>
            <h2>Nearby Nonprofits</h2>
          </Row>
          <Row>
            <h2>Nearby Farmers' Markets</h2>
          </Row>
        </Container>
      </React.Fragment>)}
    </Container>
  );
}

export default LocationInstance;
