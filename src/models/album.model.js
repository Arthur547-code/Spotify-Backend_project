// ODM library for defining MongoDB schemas/models. (Hinglish: MongoDB schemas/models define karne ki ODM library.)
const mongoose = require("mongoose");

// Album schema stores album metadata, owner artist, and linked music ids. (Hinglish: album metadata, owner artist aur linked music ids store karta hai.)
const albumSchema = new mongoose.Schema({
  // Human-readable album title. (Hinglish: album ka readable title.)
  title: {
    type: String,
    required: true,
  },
  // List of referenced music documents included in this album. (Hinglish: is album me included referenced music documents ki list.)
  musics: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "music",
    },
  ],
  // Artist (user) who owns/published this album. (Hinglish: jis artist user ka ye album hai.)
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// Create model bound to "album" collection. (Hinglish: "album" collection se bound model banao.)
const albumModel = mongoose.model("album", albumSchema);

// Export model for controllers/services. (Hinglish: controllers/services ke use ke liye model export karo.)
module.exports = albumModel;
