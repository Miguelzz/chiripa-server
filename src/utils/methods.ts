/** @format */

import { ValidationErrors } from "fluentvalidation-ts/dist/ValidationErrors";
import multer from "multer";
import { publicPath } from "../env";

export const mapperProps = <T>(
  obj: ValidationErrors<T>,
  ...array: (keyof T)[]
) =>
  Object.keys(obj).reduce((a: any, x: any) => {
    if (array.includes(x)) a[x] = (obj as any)[x];

    return a;
  }, {});

export const isValid = <T>(obj: ValidationErrors<T>) =>
  Object.keys(obj).length === 0;

export const listErrors = <T>(obj: ValidationErrors<T>) =>
  Object.keys(obj).map((x) => `${(obj as any)[x]} "${x}"`);

export const guidId = function () {
  let timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  return (
    timestamp +
    "xxxxxxxxxxxxxxxx"
      .replace(/[x]/g, function () {
        return ((Math.random() * 16) | 0).toString(16);
      })
      .toLowerCase()
  );
};

export const uploadImages = multer({
  dest: `${publicPath}`,
  storage: multer.memoryStorage(),
  fileFilter(req, file, cb) {
    const extension = file.mimetype.match(/\w+$/gi)![0];
    if (/jpeg|gif|png|pdf|mp4|webp|ogg/.test(extension)) cb(null, true);
    else return cb(new Error("Invalid mime type"));
  },
});
