/**
 * @function determineWinner
 * @description
 * This controller determines the result of a Rock-Paper-Scissors game round.
 * It compares the user's selected option against a randomly selected option for the computer.
 * Based on the rules of the game, it returns the result as either:
 *  - "tie"
 *  - "user" (user wins)
 *  - "computer" (computer wins)
 *
 * @route POST /api/winner
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body should contain `userOption`
 * @param {string} req.body.userOption - User's selected move: "rock", "paper", or "scissors"
 *
 * @param {Object} res - Express response object
 * @returns {Object} JSON response with:
 *  - {string} computerOption - Randomly chosen move by the computer
 *  - {string} result - "tie" | "user" | "computer"
 *
 * @example
 * // Request
 * POST /api/winner
 * {
 *   "userOption": "rock"
 * }
 *
 * // Response
 * {
 *   "computerOption": "scissors",
 *   "result": "user"
 * }
 */
exports.determineWinner = (req, res) => {
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
   * res.json(...):
   * 1. JSON.stringify()
   * 2. res.setHeader('Content-Type', 'application/json)
   * 3. res.send(...)
   */
  res.json({ computerOption, result });
};
