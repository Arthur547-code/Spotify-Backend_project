// User model for database operations related to accounts. (Hinglish: account se related DB operations ke liye user model.)
const userModel = require("../models/user.model");
// JWT utility for creating signed auth tokens. (Hinglish: signed auth token banane ke liye JWT utility.)
const jwt = require("jsonwebtoken");
// Password hashing and verification library. (Hinglish: password hash aur verify karne wali library.)
const bcrypt = require("bcryptjs");

// Registers a new user/artist account. (Hinglish: naya user/artist account register karta hai.)
async function registerUser(req, res) {
  // Read registration fields from request body. (Hinglish: request body se registration fields lo.)
  const { username, email, password, role = "user" } = req.body;

  // Ensure username/email is not already used by an existing account. (Hinglish: check karo username/email pehle se use na ho.)
  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // Stop early if account already exists. (Hinglish: account exist kare to yahin response dekar stop karo.)
  if (isUserAlreadyExists) {
    return res.status(409).json({ message: "User already exists" });
  }

  // Hash plain password before persisting it in database. (Hinglish: DB me save karne se pehle plain password hash karo.)
  const hash = await bcrypt.hash(password, 10);

  // Create new user document. (Hinglish: naya user document create karo.)
  const user = await userModel.create({
    username,
    email,
    password: hash,
    role,
  });

  // Create signed JWT containing user id and role for authorization. (Hinglish: authorization ke liye id aur role wala signed JWT banao.)
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  // Store token in cookie so client can send it automatically. (Hinglish: token cookie me set karo taaki client auto bheje.)
  res.cookie("token", token);

  // Return success response with safe user fields. (Hinglish: safe user fields ke saath success response bhejo.)
  res.status(201).json({
    message: "User registered successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

// Logs in an existing account. (Hinglish: existing account ko login karta hai.)
async function loginUser(req, res) {
  // Accept login by either username or email plus password. (Hinglish: username ya email + password se login allow.)
  const { username, email, password } = req.body;

  // Find matching user record. (Hinglish: matching user record dhundo.)
  const user = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  // Reject when user does not exist. (Hinglish: user na mile to reject karo.)
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Compare provided password with stored hashed password. (Hinglish: diya gaya password stored hash se compare karo.)
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // Reject when password is wrong. (Hinglish: password galat ho to reject karo.)
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Create auth token that identifies current user session. (Hinglish: current session identify karne wala auth token banao.)
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  // Persist token in cookie for subsequent authenticated requests. (Hinglish: next authenticated requests ke liye token cookie me rakho.)
  res.cookie("token", token);

  // Return logged-in user details. (Hinglish: login hone ke baad user details bhejo.)
  res.status(200).json({
    message: "User logged in successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
}

// Logs out current user by removing auth cookie. (Hinglish: auth cookie hata kar current user logout karta hai.)
async function logoutUser(req, res) {
  // Remove token cookie from response/browser. (Hinglish: response/browser se token cookie clear karo.)
  res.clearCookie("token");
  // Send confirmation response. (Hinglish: confirmation response bhejo.)
  res.status(200).json({ message: "User logged out successfully" });
}

// Expose controller methods for route layer. (Hinglish: route layer ke use ke liye controller methods export karo.)
module.exports = { registerUser, loginUser, logoutUser };
