// JWT helper to verify signed auth cookies. (Hinglish: signed auth cookies verify karne ke liye JWT helper.)
const jwt = require("jsonwebtoken");

// Allows only authenticated users with role "artist". (Hinglish: sirf artist role wale authenticated users ko allow karta hai.)
async function authArtist(req, res, next) {
  // Read token from cookies parsed by cookie-parser. (Hinglish: cookie-parser se parsed cookies me se token lo.)
  const token = req.cookies.token;

  // Block request if token is missing. (Hinglish: token missing ho to request block karo.)
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Validate token integrity and decode payload. (Hinglish: token valid hai ya nahi check karke payload decode karo.)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Enforce artist-only access for protected artist routes. (Hinglish: protected artist routes par artist-only access enforce karo.)
    if (decoded.role !== "artist") {
      return res.status(403).json({ message: "You don't have access" });
    }

    // Attach authenticated user payload for downstream handlers. (Hinglish: aage ke handlers ke liye decoded user req.user me set karo.)
    req.user = decoded;

    // Continue request lifecycle. (Hinglish: request lifecycle ko next middleware/controller tak badhao.)
    next();
  } catch (err) {
    // Log verification failure for debugging. (Hinglish: debug ke liye verification failure log karo.)
    console.log(err);
    // Return unauthorized when token is invalid/expired. (Hinglish: invalid ya expired token par unauthorized return karo.)
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Allows only authenticated users with role "user". (Hinglish: sirf user role wale authenticated users ko allow karta hai.)
async function authUser(req, res, next) {
  // Read token from cookies parsed by cookie-parser. (Hinglish: cookie-parser se parsed cookies me se token lo.)
  const token = req.cookies.token;

  // Block request if token is missing. (Hinglish: token missing ho to request block karo.)
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
  }

  try {
    // Validate token integrity and decode payload. (Hinglish: token valid hai ya nahi check karke payload decode karo.)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Enforce user-only access for protected listener routes. (Hinglish: protected listener routes par user-only access enforce karo.)
    if (decoded.role !== "user") {
      return res.status(403).json({ message: "You don't have access" });
    }

    // Attach authenticated user payload for downstream handlers. (Hinglish: aage ke handlers ke liye decoded user req.user me set karo.)
    req.user = decoded;

    // Continue request lifecycle. (Hinglish: request lifecycle ko next middleware/controller tak badhao.)
    next();
  } catch (err) {
    // Log verification failure for debugging. (Hinglish: debug ke liye verification failure log karo.)
    console.log(err);
    // Return unauthorized when token is invalid/expired. (Hinglish: invalid ya expired token par unauthorized return karo.)
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// Export middleware guards for route layer. (Hinglish: route layer me use ke liye middleware guards export karo.)
module.exports = { authArtist, authUser };
