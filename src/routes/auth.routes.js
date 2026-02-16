// Router factory from Express. (Hinglish: Express ka router banane wala factory method.)
const express = require("express");
// Auth controller contains route handler implementations. (Hinglish: auth routes ke handler implementations yaha se aate hain.)
const authController = require("../controllers/auth.controller");

// Create isolated router for auth endpoints. (Hinglish: auth endpoints ke liye alag router banao.)
const router = express.Router();

// Register new user/artist account. (Hinglish: naya user/artist account register route.)
router.post("/register", authController.registerUser);

// Login existing account and issue cookie token. (Hinglish: existing account login karke cookie token issue karo.)
router.post("/login", authController.loginUser);

// Logout by clearing auth cookie. (Hinglish: auth cookie clear karke logout karo.)
router.post("/logout", authController.logoutUser);

// Export auth router for app-level mounting. (Hinglish: app level par mount karne ke liye auth router export karo.)
module.exports = router;
