const express = require("express");
const winnerRouter = require('./routes/winner');
const corsMiddleware = require('./middlewares/corsMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
 // Middleware to parse data from JSON to JavaScript
app.use(express.json());

 // Need this cors middleware as the frontend and backend run on different domains
app.use(corsMiddleware);

// Routes
app.use("/api/winner", winnerRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
