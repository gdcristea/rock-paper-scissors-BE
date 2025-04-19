const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

const SECRET_KEY = 'your-secret-key' // put in env in production

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 * @access  Public
 * @body    { username: string, password: string }
 * @returns 201 Created on success
 *          400 Bad Request if user already exists
 */
exports.signup = async (req, res) => {
  const {username, password} = req.body;

  if (User.findUserByName(username)) {
    return res.status(400).json({message: 'User already exists'});   //400 Bad Request
  }

  // I use 'await' here because it's CPU-intensive - hashing is slow and this line returns a Promise and the next line might execute before the hash is done
  // 'await' works only with Promises -> I write 'await' and I am telling JavaScript -> 'Hey, pause this function here until bcrypt.hash() resolves or rejects, then give me the result.
  const hashedPassword = await bcrypt.hash(password, 10);
  User.createUser({username, password: hashedPassword});

  return res.status(201).json({message: 'User created'}); //201 Created
}

/**
 * @route   POST /api/auth/login
 * @desc    Log in user and return JWT token
 * @access  Public
 * @body    { username: string, password: string }
 * @returns 200 OK with token on success
 *          401 Unauthorized if invalid credentials
 */
exports.login = async (req, res) => {
  const {username, password} = req.body;

  const existingUser = User.findUserByName(username);
  if (!existingUser) {
    return res.status(401).json({message: 'Invalid credentials'});   //401 Unauthorized
  }

  // It's an async operation and I need to await it
  const passwordMatch = await bcrypt.compare(password, existingUser.password);
  if (!passwordMatch) {
    return res.status(401).json({message: 'Invalid credentials'});   //401 Unauthorized
  }

  /**
   * Generate a JWT - JSON Web Token
   * The token is sent to the client and used it for future requests like accessing the profile, and scoreboard
   * jwt.sign(payload, secret, options)
   * 'payload' contains user info - use later to decode who made a request
   * 'secret' is the string used to sign the token. it ensures that the token can't be modified by someone else and that it can be verified later
   * in production I have to store the key in an env variable and must be kept secret
   * 'expiresIn' sets how long the token is valid - after that period the token will be rejected as expired
   */
  const token = jwt.sign({username}, SECRET_KEY, {expiresIn: '1h'});
  return res.json({message: 'Login successful', token});
}
