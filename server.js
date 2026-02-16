// Load environment variables from .env before importing app modules. (Hinglish: app modules import karne se pehle .env se env vars load karo.)
require("dotenv").config();
// Import pre-configured Express app with middlewares and routes. (Hinglish: middlewares aur routes ke sath ready Express app import karo.)
const app = require("./src/app");
// Import MongoDB connection bootstrap function. (Hinglish: MongoDB connect start karne wala function import karo.)
const connectDB = require("./src/db/db");

// Establish database connection during server startup. (Hinglish: server start hote hi database connection banao.)
connectDB();

// Start HTTP server on port 3000 for API requests. (Hinglish: API requests ke liye server ko port 3000 par chalao.)
app.listen(3000, () => {
  // Log startup confirmation for local/dev observability. (Hinglish: local/dev me confirm karne ke liye startup log dikhao.)
  console.log("Server is running on port 3000");
});
