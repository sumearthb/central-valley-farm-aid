import React from "react";
import FMCard from "../components/FMCard/FMCard";
import { Link } from "react-router-dom";
import fairfax from "../card-pics/markets-pics/fairfaxcommunity.png";
import springs from "../card-pics/markets-pics/springscommunity.png";
import novato from "../card-pics/markets-pics/downtownnovato.png";

const FarmersMarkets = () => {
  // Hard-coded data
  const FMData = [
    { title: "Fairfax Community Farmers' Market", image: fairfax, description: "" },
    { title: "The Springs Community Farmers' Market", image: springs, description: "Description 2" },
    { title: "Downtown Novato Community Farmers' Market", image: novato, description: "Description 3" }
  ];

  return (
    <div className="farmersmarkets">
      <h1 className="title" style={{ marginTop: "30px" }}>
        Farmers Markets
      </h1>
      {/* Title of page */}
      <div className="centered-container">
        {/* Centered container for cards */}
        <div className="fm-cards-container">
          {/* Applies the container class in CSS file */}
          {/* Render three FMCard components */}
          {FMData.map((farmersmarket, index) => (
            <Link
              key={index}
              to={`/farmersmarket/${encodeURIComponent(farmersmarket.title)}`} // Specify the URL for the farmers market
              style={{ textDecoration: "none" }}
            >
              <FMCard
                title={farmersmarket.title}
                image={farmersmarket.image}
                description={farmersmarket.description}
                nonprofits={farmersmarket.nonprofits}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmersMarkets;