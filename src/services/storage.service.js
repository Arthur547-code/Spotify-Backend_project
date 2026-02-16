// ImageKit SDK for media upload/storage operations. (Hinglish: media upload/storage operations ke liye ImageKit SDK.)
const { ImageKit } = require("@imagekit/nodejs");

// Configure ImageKit client using server-side private key. (Hinglish: server-side private key se ImageKit client configure karo.)
const ImageKitClient = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

// Uploads base64-encoded file content and returns storage response. (Hinglish: base64 encoded file upload karke storage response return karta hai.)
async function uploadFile(file) {
  // Send upload request with generated file name and target folder path. (Hinglish: generated file name aur target folder ke sath upload request bhejo.)
  const result = await ImageKitClient.files.upload({
    file,
    fileName: "music_" + Date.now(),
    folder: "yt-complete-backend/music",
  });

  // Return full provider response to caller. (Hinglish: caller ko provider ka full response return karo.)
  return result;
}

// Export storage helpers for controllers. (Hinglish: controllers ke use ke liye storage helpers export karo.)
module.exports = { uploadFile };
