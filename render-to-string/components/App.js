import React, { useEffect } from "react";
import { Starship } from "./Starship";
import { Route, Routes } from "react-router-dom";

export const App = ({ planet, starship }) => {
  useEffect(() => {
    console.log("This code will not be executed on the server side !!");
  }, []);

  return (
    <div className="app">
      <h1>React Advanced</h1>
      {planet ? (
        <div className="planet-info">
          <h2>Our Planet</h2>
          <p>Name: {planet.result.properties.name}</p>
          <p>Climate: {planet.result.properties.climate}</p>
          <p>Population: {planet.result.properties.population}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Routes>
        <Route path="/starship" element={<Starship starship={starship} />} />
      </Routes>
    </div>
  );
};
