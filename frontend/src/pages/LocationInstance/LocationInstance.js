import "../../styles/LocationInstance.css"
import React from "react";
import { useState, useEffect } from "react";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import "../../components/LocationCard/LocationCard.css";
import { useParams } from "react-router-dom";
import { fetchSpecLocation, fetchSpecMarket, fetchSpecNonProfit } from "../../utils/ApiUtils";
import NPCard from "../../components/NPCard/NPCard";
import FMCard from "../../components/FMCard/FMCard";

function LocationInstance() {
  const { id } = useParams();

  const [ locationData, setLocationData] = useState({});
  const [ nonProfits, setNonProfits] = useState([]);
  const [ markets, setMarkets] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchSpecLocation(id);
      setLocationData(res.data[0]);

      let nps = [];
      for (let i = 0; i < Math.min(res.data[0].closest_charities.closest_charities.length, 6); ++i) {
        const np = await fetchSpecNonProfit(res.data[0].closest_charities.closest_charities[i]);
        nps.push(np.data[0]);
      }
      setNonProfits(nps);

      let mkts = [];
      for (let i = 0; i < Math.min(res.data[0].closest_farmers_markets.closest_farmers_markets.length, 6); ++i) {
        const mkt = await fetchSpecMarket(res.data[0].closest_farmers_markets.closest_farmers_markets[i]);
        mkts.push(mkt.data[0]);
      }
      setMarkets(mkts);

      setLoading(false);
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <Container className="location-instance">
      {!loading &&
      (<React.Fragment>
        <Container className="location-carousel">
          <Carousel>
            <Carousel.Item>
              <img className="carousel-img" alt="" src={locationData.map.replace("100px","1000px")} />
            </Carousel.Item>
            {locationData.photo_references.photos.map((photo) => (
              <Carousel.Item>
                <img className="carousel-img" alt="" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photo}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}></img>
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
          <Container className="main" >
            <Container className="location-attributes">
              <Stack gap={3}>
                <div className="p-2">
                  <h3>County Seat: </h3>
                  {locationData.county_seat}
                </div>
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
          </Container>
          <Row>
            <h2>Nearby Nonprofits</h2>
          </Row>
          <Row className="row gx-3">
          {(nonProfits.map((np, index) => (
            <Col key={index} xs={12} sm={8} md={5} lg={4} className="d-flex justify-content-center">
              <NPCard
                nonprofit={np}
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

export default LocationInstance;
