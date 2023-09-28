import React from "react";
import { useParams } from "react-router-dom";
import fresno from "../../card-pics/locations-pics/fresno.png";
import kern from "../../card-pics/locations-pics/kern.png";
import kings from "../../card-pics/locations-pics/kings.png";
import fresno2 from "../../card-pics/locations-pics/locationinstance-pics/fresnocounty2.jpg";
import kern2 from "../../card-pics/locations-pics/locationinstance-pics/kerncounty2.jpg";
import kings2 from "../../card-pics/locations-pics/locationinstance-pics/kingscounty2.jpg";
import "../../components/LocationCard/LocationCard.css";

const locationsData = [
  { title: "Fresno", image: fresno, crops: "Crops: Corn, Cotton", prod: "Agricultural Production: $8.0 Billion", population: "Population: 1.014 million", unemployment: "Unemployment Rate: 7.10%", labor_force: "Labor Force: 458,361", image2: fresno2 },
  { title: "Kern", image: kern, crops: "Crops: Corn, Cotton, Wheat", prod: "Agricultural Production: $8.0 Billion", population: "Population: 917,673", unemployment: "Unemployment Rate: 8.1%", labor_force: "Labor Force: 397,355", image2: kern2 },
  { title: "Kings", image: kings, crops: "Crops: Corn, Cotton, Wheat", prod: "Agricultural Production: $1.6 Billion", population: "Population: 153,443", unemployment: "Unemployment Rate: 7.9%", labor_force: "Labor Force: 57,503", image2: kings2 }
];

function LocationInstance() {
  const { id } = useParams();

  // Replace the following with actual location data retrieval logic
  const instanceData = locationsData.find((location) => location.title === id);

  return (
    <div>
      <h1 style={{ marginBottom: "15px", marginTop: "10px" }}>{instanceData.title}</h1>
      <img src={instanceData.image} className="location-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
      <p style={{ marginBottom: "10px", marginTop: "8px" }}>{instanceData.population}</p>
      <p>{instanceData.crops}</p>
      <p>{instanceData.prod}</p>
      <p>{instanceData.labor_force}</p>
      <p>{instanceData.unemployment}</p>
      <img src={instanceData.image2} className="location-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative", marginBottom: "20px"}}/>
    </div>
  );
}

export default LocationInstance;
