import "../../styles/NPInstance.css";
import React from "react";
import { useParams } from "react-router-dom";
import "../../components/NPCard/NPCard";
import { useState, useEffect } from "react"; 
import { fetchSpecLocation, fetchSpecMarket, fetchSpecNonProfit } from "../../utils/ApiUtils";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import LocationCard from "../../components/LocationCard/LocationCard";
import FMCard from "../../components/FMCard/FMCard";

function NPInstance() {
  const { id } = useParams();

  const [ NPData, setNPData] = useState({});
  const [ locations, setLocations] = useState([]);
  const [ markets, setMarkets] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchSpecNonProfit(id);
      setNPData(res.data[0]);

      let loc = [];
      for (let i = 0; i < Math.min(res.data[0].closest_locations.closest_locations.length, 6); ++i) {
        const location = await fetchSpecLocation(res.data[0].closest_locations.closest_locations[i]);
        loc.push(location.data[0]);
      }
      setLocations(loc);

      let mkts = [];
      for (let i = 0; i < Math.min(res.data[0].closest_farmers_markets.closest_farmers_markets.length, 6); ++i) {
        const mkt = await fetchSpecMarket(res.data[0].closest_farmers_markets.closest_farmers_markets[i]);
        mkts.push(mkt.data[0]);
      }
      setMarkets(mkts);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Container className="np-instance">
    {!loading &&
    (<React.Fragment>
      <Container className="np-carousel">
        <Carousel>
          {NPData.photo_references.photos.map((photo) => (
            <Carousel.Item>
              <img className="np-img" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photo}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container className="np-body">
        <Row>
          <h1 className="np-header">
            {NPData.charityName}
          </h1>
        </Row>
        <Row>
          <Col>
            <Container className="np-attributes">
              <Stack gap={3}>
                <div className="p-2">
                  <h3>Category: </h3>
                  {NPData.category}
                </div>
                <div className="p-2">
                  <h3>City: </h3>
                  {NPData.city}
                </div>
                <div className="p-2">
                  <h3>Zip Code: </h3>
                  {NPData.zipCode}
                </div>
                <div className="p-2">
                  <h3>Employer Identification Number: </h3>
                  {NPData.ein}
                </div>
                <div className="p-2">
                  <h3>Website: </h3>
                  <a href={NPData.url}>
                    {NPData.url}
                  </a>
                </div>
                <div className="p-2">
                  <h3>Donate: </h3>
                  <a href={NPData.donationUrl}>
                    {NPData.donationUrl}
                  </a>
                </div>
              </Stack>
            </Container>
          </Col>
          <Col>
            <Container className="fm-map">
              <iframe
              title="map"
              className="map"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="600"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&q=${encodeURIComponent(NPData.charityName)} ${NPData.zipCode}`}
              ></iframe>
            </Container>
          </Col>
        </Row>
        <Row>
          <h2>Location</h2>
        </Row>
        <Row className="row gx-3">
          {(locations.map((location, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <LocationCard
                location={location}
                search={""}
              />
            </Col>
          )))}
        </Row>
        <Row>
          <h2>Nearby Farmers' Markets</h2>
        </Row>
        <Row className="row gx-3">
          {(markets.map((market, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <FMCard
                market={market}
                search={""}
              />
            </Col>
          )))}
          </Row>
      </Container>
    </React.Fragment>)}
  </Container>
  );
}

export default NPInstance;
