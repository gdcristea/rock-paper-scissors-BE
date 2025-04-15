const express = require("express");
const router = express.Router();
const determineWinner = require('../controllers/winnerController');

router.post("/", determineWinner);

module.exports = router;
