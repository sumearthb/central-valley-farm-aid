import React from "react";
import { useParams } from "react-router-dom";
import fresno from "../../card-pics/locations-pics/fresno.png";
import kern from "../../card-pics/locations-pics/kern.png";
import kings from "../../card-pics/locations-pics/kings.png";
import fresno2 from "../../card-pics/locations-pics/locationinstance-pics/fresnocounty2.jpg";
import kern2 from "../../card-pics/locations-pics/locationinstance-pics/kerncounty2.jpg";
import kings2 from "../../card-pics/locations-pics/locationinstance-pics/kingscounty2.jpg";
import "../../components/LocationCard/LocationCard.css";
import NPCard from "../../components/NPCard/NPCard";
import californiafresh from "../../card-pics/np-pics/californiafresh.png";
import FMCard from "../../components/FMCard/FMCard";
import fairfax from "../../card-pics/fm-pics/fairfaxcommunity.png";

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "15px", marginTop: "10px" }}>{instanceData.title}</h1>
      <img src={instanceData.image} alt={instanceData.title} className="location-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
      <p style={{ marginBottom: "10px", marginTop: "8px" }}>{instanceData.population}</p>
      <p>{instanceData.crops}</p>
      <p>{instanceData.prod}</p>
      <p>{instanceData.labor_force}</p>
      <p>{instanceData.unemployment}</p>
      <img src={instanceData.image2} alt={instanceData.title} className="location-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative", marginBottom: "20px"}}/>
      <h2>Nearby Nonprofits</h2>
        <NPCard 
          title={"California Fresh Farmers' Markets Association"}
          image={californiafresh}
          county= "County: Fresno"
          NTEE_code="NTEE Code: K03"
          phone= "Phone: (559) 417-7970"
          employees= "Num. Employees: 16"
          year= "Est: 2015"/>
          <h2>Nearby Farmers' Markets</h2>
          <FMCard
          title={"Fairfax Community Farmers' Market"}
          image={fairfax}
          location={"Location: 142 Bolinas Road, Fairfax, California 94930, USA"}
          hours={"Hours: Wednesday: 04:00 PM - 08:00 PM: 1.014 million"}
          seasons={"Seasons: May to October"}
          vendors={"# of vendors: 35"}/>  
    </div>
  );
}

export default LocationInstance;
