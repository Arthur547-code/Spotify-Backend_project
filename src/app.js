// Core framework used to create the API server. (Hinglish: API server banane ke liye main framework.)
const express = require("express");
// Parses Cookie header and exposes cookies via req.cookies. (Hinglish: Cookie header parse karke cookies ko req.cookies par deta hai.)
const cookieParser = require("cookie-parser");
// Authentication route handlers (/register, /login, /logout). (Hinglish: auth wale routes ke handlers.)
const authRoutes = require("./routes/auth.routes");
// Music/album route handlers. (Hinglish: music aur album ke route handlers.)
const musicRoutes = require("./routes/music.routes");

// Create Express application instance. (Hinglish: Express app ka instance banao.)
const app = express();
// Parse incoming JSON payloads and map them to req.body. (Hinglish: incoming JSON ko parse karke req.body me rakho.)
app.use(express.json());
// Parse cookies for auth middleware and controllers. (Hinglish: auth middleware/controllers ke liye cookies parse karo.)
app.use(cookieParser());

// Mount auth routes under /api/auth namespace. (Hinglish: auth routes ko /api/auth ke niche attach karo.)
app.use("/api/auth", authRoutes);
// Mount music routes under /api/music namespace. (Hinglish: music routes ko /api/music ke niche attach karo.)
app.use("/api/music", musicRoutes);

// Export app so server.js can start listening. (Hinglish: app export karo taki server.js listen start kar sake.)
module.exports = app;
