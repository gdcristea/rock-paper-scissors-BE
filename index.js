const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;

/**
 * Middleware to parse data from JSON to JavaScript
 */
app.use(express.json());

/**
 * Need this cors middleware as the frontend and backend run on different domains
 * Frontend - GitHub Pages
 * Backend - Render
 * This middleware adds 'Access-Control-Allow-Origin: https://username.github.io'
 * in the responses' header
 */
app.use(
  cors({
    origin: "https://username.github.io",
  })
);

const winnerRouter = require("./routes/winner");
app.use("/api/winner", winnerRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
