require('dotenv').config();
const express = require("express");
const corsMiddleware = require('./middlewares/corsMiddleware');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
 // Middleware to parse data from JSON to JavaScript
app.use(express.json());

 // Need this cors middleware as the frontend and backend run on different domains
app.use(corsMiddleware);

// Routes
const winnerRoute = require('./routes/winner');
app.use("/api/winner", winnerRoute); // url: /api/winner

const authRoutes = require('./routes/auth');
app.use("/api/auth", authRoutes); //url: /api/auth/signup || /api/auth/signup

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
