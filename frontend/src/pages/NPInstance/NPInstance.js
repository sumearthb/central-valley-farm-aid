import React from "react";
import { useParams, Link } from "react-router-dom";
import "../../components/NPCard/NPCard";
import { useState, useEffect } from "react"; 
import { fetchSpecNonProfit } from "../../utils/ApiUtils";
import { Container } from "react-bootstrap";

function NPInstance() {
  const { id } = useParams();
  const [NPData, setNPData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetchSpecNonProfit(id);
      setNPData(res.data[0]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="nonprofit-instance">
      {!loading &&
      (<React.Fragment>
        <h1 className="nonprofit-header">
        {NPData.charityName}
        </h1>
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${NPData.photo_references[0]}&key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs`} className="location-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
        <Container className="d-flex my-5">
          <iframe
          title="map"
          className="map"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          width="100%"
          height="600"
          src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBMJJbFxLfnX8DpE_BGF2dF8t5aWSQJOOs&q=${NPData.charityName}`}
          ></iframe>
        </Container>
        {/* <Container>
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
              <h3>Crops: </h3>
              <Stack gap={1}>
                {locationData.crops.crops.map(crop => (
                  <div className="p-2">{crop}</div>
                ))}
              </Stack>
            </div>
          </Stack>
        </Container> */}
        {/* <h2>Nearby Nonprofits</h2>
        <h2>Nearby Farmers' Markets</h2> */}
      </React.Fragment>)}
    </div>
  );
}

export default NPInstance;
