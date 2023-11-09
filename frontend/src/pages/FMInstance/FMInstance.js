import "../../styles/FMInstance.css"
import React from "react";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchSpecLocation, fetchSpecMarket, fetchSpecNonProfit } from "../../utils/ApiUtils";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";
import NPCard from "../../components/NPCard/NPCard";
import LocationCard from "../../components/LocationCard/LocationCard";

function FMInstance() {
  const { id } = useParams();

  const [ FMData, setFMData] = useState({});
  const [ nonProfits, setNonProfits] = useState([]);
  const [ locations, setLocations] = useState([]);
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchSpecMarket(id);
      setFMData(res.data[0]);

      let nps = [];
      for (let i = 0; i < Math.min(res.data[0].closest_charities.nearby_charities.length, 6); ++i) {
        const np = await fetchSpecNonProfit(res.data[0].closest_charities.nearby_charities[i]);
        nps.push(np.data[0]);
      }
      setNonProfits(nps);

      let loc = [];
      for (let i = 0; i < Math.min(res.data[0].closest_locations.nearby_locations.length, 6); ++i) {
        const location = await fetchSpecLocation(res.data[0].closest_locations.nearby_locations[i]);
        loc.push(location.data[0]);
      }
      setLocations(loc);

      setLoading(false);
    };

    fetchData();
  }, []);
  
  return (
    <Container className="fm-instance">
    {!loading &&
    (<React.Fragment>
      <Container className="fm-carousel">
        <Carousel>
          {FMData.photo_references.map((photo) => (
            <Carousel.Item>
              <img className="carousel-img" src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=1000&photo_reference=${photo}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`}></img>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
      <Container className="fm-body">
        <Row>
          <h1 className="fm-header">
            {FMData.listing_name}
          </h1>
        </Row>
        <Row>
          <Col>
            <Container className="fm-attributes">
              <Stack gap={3}>
                {FMData.listing_desc !== "0" && 
                <div className="p-2">
                  <h3>Description: </h3>
                  {FMData.listing_desc}
                </div>}
                {FMData.orgnization !== "0" && 
                <div className="p-2">
                  <h3>Organization: </h3>
                  {FMData.orgnization}
                </div>}
                <div className="p-2">
                  <h3>Address: </h3>
                  <Stack gap={2}>
                    <div>
                      {FMData.location_address}
                    </div>
                    <div>
                      {FMData.location_desc}
                    </div>
                    <div>
                      {FMData.location_site}
                    </div>
                    {FMData.location_site_otherdesc !== "0" && 
                    <div>
                      {FMData.location_site_otherdesc}
                    </div>}
                  </Stack>
                </div>
                {FMData.website && 
                <div className="p-2">
                  <h3>Website: </h3>
                  <a href={FMData.website}>
                    {FMData.website}
                  </a>
                </div>}
                {FMData.phone && 
                <div className="p-2">
                  <h3>Phone: </h3>
                  {FMData.phone}
                </div>}
                <div className="p-2">
                  <h3>Rating: </h3>
                  {FMData.rating}
                </div>
                {FMData.specialproductionmethods && 
                <div className="p-2">
                  <h3>Special Production Methods: </h3>
                    {FMData.specialproductionmethods}
                </div>}
                <div className="p-2">
                  <h3>Wheelchair Accessible: </h3>
                  {FMData.wheelchair_accessible}
                </div>
                <div className="p-2">
                  <h3>FNAP: </h3>
                  <Stack gap={1}>
                    {FMData.fnap.split(";").map(fnap => (
                      <div>{fnap}</div>
                    ))}
                  </Stack>
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
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&q=${encodeURIComponent(FMData.listing_name)}`}
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
          <h2>Nearby Non Profits</h2>
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
      </Container>
    </React.Fragment>)}
  </Container>
  );
}

export default FMInstance;