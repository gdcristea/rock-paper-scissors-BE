const cors = require("cors");

// 🔍 CORS based on the environment
const allowedOrigin =
  process.env.NODE_ENV === "production"
    ? "https://gdcristea.github.io"
    : "http://localhost:4200";

    const corsMiddleware = cors({origin: allowedOrigin});

    module.exports = corsMiddleware;