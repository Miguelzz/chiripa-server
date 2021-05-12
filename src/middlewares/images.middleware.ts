/** @format */

import multer from "multer";
const storage = multer.memoryStorage();
export const imagesMiddleware = multer({
  fileFilter(req, file, cb) {
    let extension = file.mimetype.match(/\w+$/gi)![0];
    if (extension === "stream") extension = "png";
    if (/jpeg|gif|png|pdf|mp4|webp|ogg/.test(extension)) cb(null, true);
    else return cb(new Error("Invalid mime type"));
  },
  storage,
});
