import React from "react";
import { useState, useEffect } from "react";
import { Container, Stack } from "react-bootstrap";
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
        // console.log(res.data[0].crops.crops)
        setLocationData(res.data[0]);
        setLoading(false);
      };

      fetchData();
    }, []);

  return (
    <div className="location-instance">
      {!loading &&
      (<React.Fragment>
        <h1 className="location-header">
        {locationData.name + " County"}
        </h1>
        <img src={locationData.map} className="location-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
        <Container className="d-flex my-5">
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
        <Container>
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
        </Container>
        {/* <h2>Nearby Nonprofits</h2>
        <h2>Nearby Farmers' Markets</h2> */}
      </React.Fragment>)}
    </div>
  );
}

export default LocationInstance;
