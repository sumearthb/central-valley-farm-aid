import React from "react";
import { useParams } from "react-router-dom";

function LocationInstance() {
  const { id } = useParams();

  // Replace the following with actual location data retrieval logic
  const locationData = {
    id: id,
    name: "Sample Location Name",
    description: "Sample location description",
    // Add more properties as needed
  };

  if (!locationData) {
    return <div>Location not found.</div>;
  }

  return (
    <div>
      <h1>Location Details</h1>
      <p>ID: {locationData.id}</p>
      <p>Name: {locationData.name}</p>
      <p>Description: {locationData.description}</p>
      {/* Display other location details here */}
    </div>
  );
}

export default LocationInstance;
