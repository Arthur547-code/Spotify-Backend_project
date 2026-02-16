// Music model to create/query individual tracks. (Hinglish: individual tracks create/query karne ke liye music model.)
const musicModel = require("../models/music.model");
// Album model to create/query album collections. (Hinglish: album collection create/query karne ke liye album model.)
const albumModel = require("../models/album.model");
// External storage upload service abstraction. (Hinglish: external storage upload ko handle karne wali service layer.)
const { uploadFile } = require("../services/storage.service");

// Creates a new music track for authenticated artist. (Hinglish: authenticated artist ke liye naya music track banata hai.)
async function createMusic(req, res) {
  // Get metadata from body and uploaded file from multer middleware. (Hinglish: body se metadata aur multer se uploaded file lo.)
  const { title } = req.body;
  const file = req.file;

  // Upload file buffer to storage service after base64 conversion. (Hinglish: file buffer ko base64 karke storage service par upload karo.)
  const result = await uploadFile(file.buffer.toString("base64"));

  // Persist uploaded track reference in database. (Hinglish: uploaded track ka reference DB me save karo.)
  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  });

  // Return newly created music payload. (Hinglish: naya bana music payload response me bhejo.)
  res.status(201).json({
    message: "Music created successfully",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
}

// Creates a new album owned by authenticated artist. (Hinglish: authenticated artist ka naya album create karta hai.)
async function createAlbum(req, res) {
  // Read album title and list of music ids from request. (Hinglish: request se album title aur music ids ki list lo.)
  const { title, musics } = req.body;

  // Persist album with artist from auth middleware context. (Hinglish: auth middleware se aaye artist ke sath album save karo.)
  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics,
  });

  // Return created album details. (Hinglish: created album ki details response me bhejo.)
  res.status(201).json({
    message: "Album created successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics,
    },
  });
}

// Fetches all music tracks with basic artist details. (Hinglish: sab music tracks basic artist details ke sath fetch karta hai.)
async function getAllMusics(req, res) {
  // Populate artist reference to include username/email in response. (Hinglish: response me username/email lane ke liye artist populate karo.)
  const musics = await musicModel.find().populate("artist", "username email");

  // Return list response. (Hinglish: list wala response bhejo.)
  res.status(200).json({
    message: "Musics fetched successfully",
    musics: musics,
  });
}

// Fetches all albums with lightweight artist info. (Hinglish: sab albums lightweight artist info ke sath fetch karta hai.)
async function getAllAlbums(req, res) {
  // Select minimal fields and populate artist reference. (Hinglish: minimal fields select karke artist reference populate karo.)
  const albums = await albumModel
    .find()
    .select("title artist")
    .populate("artist", "username email");

  // Return list response. (Hinglish: list response return karo.)
  res.status(200).json({
    message: "Albums fetched successfully",
    albums: albums,
  });
}

// Fetches single album by id including related music documents. (Hinglish: album id se single album related music docs ke sath fetch karta hai.)
async function getAlbumById(req, res) {
  // Read dynamic route parameter. (Hinglish: dynamic route parameter padho.)
  const albumId = req.params.albumId;

  // Load album with linked artist and music entries. (Hinglish: linked artist aur music entries ke sath album load karo.)
  const album = await albumModel
    .findById(albumId)
    .populate("artist", "username email")
    .populate("musics");

  // Return album detail response. (Hinglish: album detail response bhejo.)
  return res.status(200).json({
    message: "Album fetched successfully",
    album: album,
  });
}

// Export controller actions for route bindings. (Hinglish: route bindings ke liye controller actions export karo.)
module.exports = {
  createMusic,
  createAlbum,
  getAllMusics,
  getAllAlbums,
  getAlbumById,
};
