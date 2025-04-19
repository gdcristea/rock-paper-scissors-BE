const cors = require("cors");

// 🔍 CORS based on the environment
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? process.env.CORS_PRODUCTION
    : process.env.CORS_DEVELOPMENT;

    const corsMiddleware = cors({origin: allowedOrigin});

    module.exports = corsMiddleware;