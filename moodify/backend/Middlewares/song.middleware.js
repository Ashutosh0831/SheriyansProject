const multer = require("multer");

const Storage = multer.memoryStorage();

const upload = multer({
  storage: Storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

module.exports = upload;
