/** @format */

import multer from "multer";
import { publicPath, publicPhotos } from "../env";

const mongoObjectId = function () {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

const storage = multer.memoryStorage();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, publicPhotos);
//   },
//   filename: function (req, file, cb) {
//     cb(null, `${mongoObjectId()}.png`);
//   },
// });

export const imagesMiddleware = multer({
  fileFilter(req, file, cb) {
    let extension = file.mimetype.match(/\w+$/gi)![0];
    if (extension === "stream") extension = "png";
    if (/jpeg|gif|png|pdf|mp4|webp|ogg/.test(extension)) cb(null, true);
    else return cb(new Error("Invalid mime type"));
  },
  storage,
});
