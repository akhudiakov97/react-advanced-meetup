import React from "react";

export const Starship = ({ starship }) => {
  return (
    <div className="starship-info">
      <h2>Our Starship</h2>
      {starship ? (
        <div>
          <p>Name: {starship.result.properties.name}</p>
          <p>Model: {starship.result.properties.model}</p>
          <p>Manufacturer: {starship.result.properties.manufacturer}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Starship;
