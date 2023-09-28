import React from "react";
import LocationCard from "../components/LocationCard/LocationCard";
import { Link } from "react-router-dom";
import fresno from "../card-pics/locations-pics/fresno.png";
import kern from "../card-pics/locations-pics/kern.png";
import kings from "../card-pics/locations-pics/kings.png";

const Locations = () => {
  // Hard coded data
  const locationsData = [
    { title: "Fresno", image: fresno, crops: "Crops: Corn, Cotton", population: "Population: 1.014 million", unemployment: "Unemployment Rate: 7.10%", labor_force: "Labor Force: 458,361"},
    { title: "Kern", image: kern, crops: "Crops: Corn, Cotton, Wheat", population: "Population: 917,673", unemployment: "Unemployment Rate: 8.1%", labor_force: "Labor Force: 397,355" },
    { title: "Kings", image: kings, crops: "Crops: Corn, Cotton, Wheat", population: "Population: 153,443", unemployment: "Unemployment Rate: 7.9%", labor_force: "Labor Force: 57,503" }
  ];

  return (
    <div className="locations">
      <h1 className="title" style={{ marginTop: "30px" }}>
        Locations
      </h1>
      {/* Title of page */}
      <div className="centered-container">
        {/* Centered container for cards */}
        <div className="location-cards-container">
          {/* Applies the container class in CSS file */}
          {/* Render three LocationCard components */}
          {locationsData.map((location, index) => (
            <Link
              key={index}
              to={`/location/${location.title}`} // Specify the URL for the location
              style={{ textDecoration: "none" }}
            >
              <LocationCard
                title={location.title}
                image={location.image}
                crops={location.crops}
                population={location.population}
                unemployment={location.unemployment}
                labor_force={location.labor_force}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Locations;
