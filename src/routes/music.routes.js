// Router factory from Express. (Hinglish: Express ka router banane wala factory method.)
const express = require("express");
// Music controller contains track/album business logic. (Hinglish: track/album ka business logic controller me hai.)
const musicController = require("../controllers/music.controller");
// Role-based auth guards for route protection. (Hinglish: route protection ke liye role-based auth guards.)
const authMiddleware = require("../middlewares/auth.middleware");
// Multipart parser used for file uploads. (Hinglish: file upload parse karne ke liye multipart parser.)
const multer = require("multer");

// Store uploaded file in memory so controller can forward it to ImageKit. (Hinglish: uploaded file memory me rakho taaki controller ImageKit ko bhej sake.)
const upload = multer({
  storage: multer.memoryStorage(),
});

// Create isolated router for music endpoints. (Hinglish: music endpoints ke liye alag router banao.)
const router = express.Router();

// Artist-only route: upload one file field named "music" and create track. (Hinglish: sirf artist route jahan "music" field ki file upload hoke track create hota hai.)
router.post(
  "/upload",
  authMiddleware.authArtist,
  upload.single("music"),
  musicController.createMusic,
);

// Artist-only route: create album from provided title + music ids. (Hinglish: sirf artist ke liye title aur music ids se album create route.)
router.post("/album", authMiddleware.authArtist, musicController.createAlbum);

// User-only route: list all musics. (Hinglish: sirf user ke liye sab musics list route.)
router.get("/", authMiddleware.authUser, musicController.getAllMusics);
// User-only route: list all albums. (Hinglish: sirf user ke liye sab albums list route.)
router.get("/albums", authMiddleware.authUser, musicController.getAllAlbums);

// User-only route: fetch album details by album id. (Hinglish: sirf user ke liye album id se album details lane wala route.)
router.get(
  "/albums/:albumId",
  authMiddleware.authUser,
  musicController.getAlbumById,
);

// Export music router for app-level mounting. (Hinglish: app level par mount karne ke liye music router export karo.)
module.exports = router;
