import React from "react";
import NPCard from "../components/NPCard/NPCard";
import { Link } from "react-router-dom";

const NonProfits = () => {
  // Hard-coded data
  const NPData = [
    { title: "Nonprofit 1", image: "/placeholder.png", description: "Description 1" },
    { title: "Nonprofit 2", image: "/placeholder.png", description: "Description 2" },
    { title: "Nonprofit 3", image: "/placeholder.png", description: "Description 3" },
  ];

  return (
    <div className="nonprofits">
      <h1 className="title" style={{ marginTop: "30px" }}>
        Non-Profit Organizations
      </h1>
      {/* Title of page */}
      <div className="centered-container">
        {/* Centered container for cards */}
        <div className="np-cards-container">
          {/* Applies the container class in CSS file */}
          {/* Render three NPCard components */}
          {NPData.map((nonprofit, index) => (
            <Link
              key={index}
              to={`/nonprofit/${encodeURIComponent(nonprofit.title)}`} // Specify the URL for the nonprofit
              style={{ textDecoration: "none" }}
            >
              <NPCard
                title={nonprofit.title}
                image={nonprofit.image}
                description={nonprofit.description}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonProfits;
