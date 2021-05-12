/** @format */

import fs from "fs";
import apiCloudinary from "cloudinary";
import path from "path";
import { cloudDinary, publicTemp } from "../env";

apiCloudinary.v2.config(cloudDinary);

if (!fs.existsSync(publicTemp))
  fs.mkdirSync(path.resolve(publicTemp), { recursive: true });

const storeFS = ({
  stream,
  filename,
}: {
  stream: any;
  filename: string;
}): Promise<string> => {
  const path = `${publicTemp}/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .on("error", (error: any) => {
        if (stream.truncated)
          // delete the truncated file
          fs.unlinkSync(path);
        reject(error);
      })
      .pipe(fs.createWriteStream(path))
      .on("error", (error: any) => reject(error))
      .on("finish", () => {
        try {
          setTimeout(() => fs.unlinkSync(path), 3000);
        } catch (error) {}
        resolve(path);
      })
  );
};

export const getPath = async (file: any) => {
  try {
    const { filename, createReadStream } = await file.promise;
    if (filename === "") return "";
    const stream = createReadStream();
    return await storeFS({ stream, filename });
  } catch (e) {
    return "";
  }
};

export const cloudinary = apiCloudinary.v2;
