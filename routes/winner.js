const express = require("express");
const router = express.Router();

//Endpoint for determining who won
router.post("/", (req, res) => {
  const { userOption } = req.body;
  const options = ["rock", "paper", "scissors"];
  const computerOption = options[Math.floor(Math.random() * options.length)];
  let result;

  if (userOption === computerOption) {
    result = "tie";
  } else if (
    (userOption === "rock" && computerOption === "scissors") ||
    (userOption === "scissors" && computerOption === "paper") ||
    (userOption === "paper" && computerOption === "rock")
  ) {
    result = "user";
  } else {
    result = "computer";
  }

  /**
   * res,json(...):
   * 1. JSON.stringify()
   * 2. res.setHeader('Content-Type', 'application/json)
   * 3. res.send(...)
   */
  res.json({ computerOption, result });
});

module.exports = router;
