import React from "react";
import { useParams } from "react-router-dom";
import fresno from "../../card-pics/locations-pics/fresno.png";
import kern from "../../card-pics/locations-pics/kern.png";
import kings from "../../card-pics/locations-pics/kings.png";
import "../../components/LocationCard/LocationCard.css";

const locationsData = [
  { title: "Fresno", image: fresno, crops: "Crops: Corn, Cotton", prod: "Agricultural Production: $8.0 Billion", population: "Population: 1.014 million", unemployment: "Unemployment Rate: 7.10%", labor_force: "Labor Force: 458,361"},
  { title: "Kern", image: kern, crops: "Crops: Corn, Cotton, Wheat", prod: "Agricultural Production: $8.0 Billion", population: "Population: 917,673", unemployment: "Unemployment Rate: 8.1%", labor_force: "Labor Force: 397,355" },
  { title: "Kings", image: kings, crops: "Crops: Corn, Cotton, Wheat", prod: "Agricultural Production: $1.6 Billion", population: "Population: 153,443", unemployment: "Unemployment Rate: 7.9%", labor_force: "Labor Force: 57,503" }
];

function LocationInstance() {
  const { id } = useParams();

  // Replace the following with actual location data retrieval logic
  const locationData = locationsData.find((location) => location.title === id);

  if (!locationData) {
    return <div>Location not found.</div>;
  }

  return (
    <div>
      <h1>{locationData.title}</h1>
      <img src={locationData.image} className="location-card-image mx-auto" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
      <p>Population: {locationData.population}</p>
      <p>{locationData.crops}</p>
      <p>{locationData.prod}</p>
      <p>{locationData.labor_force}</p>
      <p>{locationData.unemployment}</p>
      <p></p>
      {/* Display other location details here */}
    </div>
  );
}

export default LocationInstance;
