const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;

/**
 * Middleware to parse data from JSON to JavaScript
 */
app.use(express.json());

// 🔍 CORS based on the environment
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://gdcristea.github.io"
    : "http://localhost:4200";


/**
 * Need this cors middleware as the frontend and backend run on different domains
 */
app.use(
  cors({
    origin: allowedOrigin,
  })
);

const winnerRouter = require("./routes/winner");
app.use("/api/winner", winnerRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
