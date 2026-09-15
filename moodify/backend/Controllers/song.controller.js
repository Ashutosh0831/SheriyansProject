const SongModel = require("../models/song.model.js");
const id3 = require("node-id3");
const storageService = require("../services/storage.service.js");
const songModel = require("../models/song.model.js");

async function uploadSong(req, res) {
  try {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);

    const songFile = await storageService.uploadFile({
      buffer: songBuffer,
      filename: tags.title + ".mp3",
      folder: "/moodify/songs",
    });

    const posterUrl = await storageService.uploadFile({
      buffer: tags.image.imageBuffer,
      filename: tags.title + ".jpeg",
      folder: "/moodify/poster",
    });

    const song = await SongModel.create({
      title: tags.title,
      url: songFile.url,
      posterUrl: posterUrl.url,
      mood,
    });

    res.status(201).json({
      message: "Songs upload successfully",
      song,
    });
  } catch (error) {
    console.error("Upload Error:", error.message);
    res.status(500).json({ error: error.message });
  }
}

module.exports = uploadSong;
