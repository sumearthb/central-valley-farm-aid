import React from "react";
import { useParams } from 'react-router-dom';
import fairfax from "../../card-pics/fm-pics/fairfaxcommunity.png";
import springs from "../../card-pics/fm-pics/springscommunity.png";
import novato from "../../card-pics/fm-pics/downtownnovato.png";
import fairfax2 from "../../card-pics/fm-pics/fminstance-pics/fairfaxinstance.jpg";
import springs2 from "../../card-pics/fm-pics/fminstance-pics/springsinstance.jpg";
import novato2 from "../../card-pics/fm-pics/fminstance-pics/novatosinstance.jpg";
import fresno from "../../card-pics/locations-pics/fresno.png";
import LocationCard from "../../components/LocationCard/LocationCard";
import NPCard from "../../components/NPCard/NPCard";
import californiafresh from "../../card-pics/np-pics/californiafresh.png";
import { useState, useEffect } from "react";
import { fetchSpecMarket } from "../../utils/ApiUtils"; 


const FMData = [
  { title: "Fairfax Community Farmers' Market", image: fairfax, location: "Location: 142 Bolinas Road, Fairfax, California 94930, USA", hours: "Hours: Wednesday: 04:00 PM - 08:00 PM", contact: "Email: agriculturalcommunityevents@gmail.com\nPhone Number: (415) 999-5635", seasons: "Seasons: May to October", vendors: "# of vendors: 35", assistance: "WIC, SNAP, WIC Farmers Market, Senior Farmers' Market Nutrition Program", image2: fairfax2 },
  { title: "The Springs Community Farmers' Market", image: springs, location: "Location: Parking lot at Boyes Blvd & Hwy 12, Boyes Hot Springs , California 95476", hours: "Hours: N/A", contact: "Email: agriculturalcommunityevents@gmail.com\nPhone Number: (415) 999-5635", seasons: "Seasons: September to November", vendors: "# of vendors: 20", assistance: "WIC, SNAP, WIC Farmers Market, Senior Farmers' Market Nutrition Program", image2: springs2 },
  { title: "Downtown Novato Community Farmers' Market", image: novato, location: "Location: 7th Street behind the CVS between Grant Ave & Novato Blvd , Novato , California 94947", hours: "Hours: Tuesday: 04:00 PM - 08:00 PM", contact: "Email: agriculturalcommunityevents@gmail.com\nPhone Number: (415) 999-5635", seasons: "Seasons: May to September", vendors: "# of vendors: 45", assistance: "WIC, SNAP, WIC Farmers Market, Senior Farmers' Market Nutrition Program", image2: novato2 },
];

function FMInstance() {
    const { id } = useParams();
    const [ FMData, setFMData] = useState({});

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetchSpecMarket(id);
        setFMData(res.data);
      };

      fetchData();
    }, []);
  
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <h1 style={{ marginBottom: "15px", marginTop: "10px" }}>{FMData.market_name}</h1>
        <img src={Object.values(FMData.photo_references)[0]} alt={FMData.market_name} className="fm-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative" }}/>
        <p>Location description: {FMData.location_desc}</p>
        <p>Address: {FMData.location_address}</p>
        <p>Contact info: {FMData.phone}</p>
        <p>Indoor status: {FMData.location_indoor}</p>
        <p>Production methods: {FMData.special_prod}</p>
        <p>FNAP Programs: {FMData.fnap}</p>
        <img src={Object.values(FMData.photo_references)[0]} alt={FMData.market_name} className="fm-card-image mx-auto border border-dark" style={{ width: "100%", maxWidth: "300px", height: "auto", maxHeight: "300px", position: "relative", marginBottom: "20px"}}/>
        <h2>Nearby Counties</h2>
        <h2>Nearby Nonprofits</h2>
        {/* <FMCard 
          title={"Fresno"}
          image={fresno}
          crops={"Crops: Corn, Cotton"}
          population={"Population: 1.014 million"}
          unemployment={"Unemployment Rate: 7.10%"}
          labor_force={"Labor Force: 458,361"}/>
        <h2>Nearby Nonprofits</h2>
        <NPCard 
          title={"California Fresh Farmers' Markets Association"}
          image={californiafresh}
          county= "County: Fresno"
          NTEE_code="NTEE Code: K03"
          phone= "Phone: (559) 417-7970"
          employees= "Num. Employees: 16"
          year= "Est: 2015"/> */}
      </div>
    );
  }

export default FMInstance;