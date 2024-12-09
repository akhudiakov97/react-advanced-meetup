import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { App } from "./components/App";
import axios from "axios";
import { StaticRouter } from "react-router-dom/server";

const app = express();

const publicPath = `${path.resolve()}/public`;

app.use("*", async (req, res) => {
  let indexHTML = fs.readFileSync(
    path.resolve(__dirname, `${publicPath}/index.html`),
    {
      encoding: "utf8",
    }
  );

  const planetResponse = await axios.get(
    `https://www.swapi.tech/api/planets/1`
  );
  const planet = planetResponse.data;

  const starshipResponse = await axios.get(
    `https://www.swapi.tech/api/starships/9`
  );
  const starship = starshipResponse.data;

  const appJSX = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <App planet={planet} starship={starship} />
    </StaticRouter>
  );

  indexHTML = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${appJSX}</div>`
  );

  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

app.listen("3000", () => {
  console.log("Server at http://localhost:3000");
});
