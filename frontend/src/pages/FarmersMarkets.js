import React from "react";
import FMCard from "../components/FMCard/FMCard";
import { Link } from "react-router-dom";

const FarmersMarkets = () => {
  // Hard-coded data
  const FMData = [
    { title: "Farmers Market 1", image: "/placeholder.png", description: "Description 1" },
    { title: "Farmers Market 2", image: "/placeholder.png", description: "Description 2" },
    { title: "Farmers Market 3", image: "/placeholder.png", description: "Description 3" },
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
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmersMarkets;