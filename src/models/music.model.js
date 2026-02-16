// ODM library for defining MongoDB schemas/models. (Hinglish: MongoDB schemas/models define karne ki ODM library.)
const mongoose = require("mongoose");

// Music schema stores uploaded track metadata and owner reference. (Hinglish: uploaded track metadata aur owner reference store karta hai.)
const musicSchema = new mongoose.Schema({
  // Public URI returned by storage provider for streaming/download. (Hinglish: streaming/download ke liye storage provider se aaya public URI.)
  uri: {
    type: String,
    required: true,
  },
  // Display title of the music track. (Hinglish: music track ka display title.)
  title: {
    type: String,
    required: true,
  },
  // Artist (user) who uploaded this track. (Hinglish: jis artist user ne ye track upload kiya.)
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// Create model bound to "music" collection. (Hinglish: "music" collection se bound model banao.)
const musicModel = mongoose.model("music", musicSchema);

// Export model for controllers/services. (Hinglish: controllers/services ke use ke liye model export karo.)
module.exports = musicModel;
