import "../../styles/NPInstance.css";
import React from "react";
import { useParams } from "react-router-dom";
import "../../components/NPCard/NPCard";
import { useState, useEffect } from "react"; 
import { fetchSpecNonProfit } from "../../utils/ApiUtils";
import { Carousel, Col, Container, Row, Stack } from "react-bootstrap";

function NPInstance() {
  const { id } = useParams();

  const [ NPData, setNPData] = useState({});
  const [ loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchSpecNonProfit(id);
      console.log(res.data[0]);
      setNPData(res.data[0]);
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
        <Row>
          <h2>Nearby Farmers' Markets</h2>
        </Row>
      </Container>
    </React.Fragment>)}
  </Container>
  );
}

export default NPInstance;
