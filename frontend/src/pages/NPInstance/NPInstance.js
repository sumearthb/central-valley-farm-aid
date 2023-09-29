import React from "react";
import { useParams } from "react-router-dom";
import californiafresh from "../../card-pics/np-pics/californiafresh.png";
import cfe from "../../card-pics/np-pics/cfe.jpg";
import pfl from "../../card-pics/np-pics/pfl.png";
import "../../components/NPCard/NPCard";
import californiafresh2 from "../../card-pics/np-pics/npinstance-pics/CFFMAinstance.png";
import cfe2 from "../../card-pics/np-pics/npinstance-pics/CFEinstance.jpeg";
import pfl2 from "../../card-pics/np-pics/npinstance-pics/PLFFinstance.png";
import fresno from "../../card-pics/locations-pics/fresno.png";
import LocationCard from "../../components/LocationCard/LocationCard";
import FMCard from "../../components/FMCard/FMCard";
import fairfax from "../../card-pics/fm-pics/fairfaxcommunity.png";

const NPData = [
  { title: "California Fresh Farmers' Markets Association", image: californiafresh, description: "California Fresh Farmers Market Association is a food or agriculture professional society in Fresno, CA whose mission is: Establish and create farmers markets in the community.", county: "County: Fresno", year: "Est: 2019", NTEE_code: "NTEE Code: K03", phone: "Phone: (559) 417-7970", employees: "Num. Employees: 16", image2: californiafresh2},
  { title: "California Food Expo", image: cfe, description: "California Food Expo is a food bank or pantry in Fresno, CA whose mission is: To promote the San Joaquin Valley food industry. To promote the san joaquin valley Food industry.", county: "County: Fresno", year: "Est: 2015", NTEE_code: "NTEE Code: K31", phone: "Phone: (559) 227-9999", employees: "Num. Employees: 0", image2:cfe2 },
  { title: "People Land and Food Foundation", image: pfl, description: "Economic and social growth and development of rural communities, small farms and farming cooperatives. Carbon farming, soil and forest health, water and other resource conservation initiatives. Sustainable, regenerative, and organic agriculture, horticulture, gardening, and permaculture. Organic garden and water conservatiion. Carbon farming and soil health initiatives. Organic garden and water conservation. Carbon farming and soil health iniatives.", county: "County: Fresno", year: "Est: 1975", NTEE_code: "NTEE Code: K20", phone: "Phone: (559) 855-3710", employees: "Num. Employees: 1", image2:pfl2 },
];

function NPInstance() {
  const { id } = useParams();

  // Replace the following with actual location data retrieval logic
  const instanceData = NPData.find((nonprofit) => nonprofit.title === id);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "15px", marginTop: "10px" }}>{instanceData.title}</h1>
      <img src={instanceData.image} alt={instanceData.title} className="np-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
      <p className="text-wrap break-all" style={{width: "41rem", margin: "0 auto", textAlign: "center", marginBottom: "8px", marginTop: "8px" }}>{instanceData.description}</p>
      <p>{instanceData.county}</p>
      <p>{instanceData.year}</p>
      <p>{instanceData.NTEE_code}</p>
      <p>{instanceData.phone}</p>
      <p>{instanceData.employees}</p>
      <img src={instanceData.image2} alt={instanceData.title} className="np-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative", marginBottom: "20px" }}/>
      <h2>Nearby County</h2>
        <LocationCard 
          title={"Fresno"}
          image={fresno}
          crops={"Crops: Corn, Cotton"}
          population={"Population: 1.014 million"}
          unemployment={"Unemployment Rate: 7.10%"}
          labor_force={"Labor Force: 458,361"}/>
        <h2>Nearby Farmer's Market</h2>
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

export default NPInstance;
