/** @format */

import { cloudinary } from "../connections/cloundinary";
import { analyzeQuery } from "../utils/tags/search";
import { RouteParams } from "../utils/types";

export const searchDemo: RouteParams = async (req, res) => {
  // const query = analyzeQuery(req.query.q as string);
  // const page = req.query.page || 0;
  // const limit = req.query.limit || 10;
  // let filter;
  // if (!(req.query.q as string)?.trim())
  //   filter = await (Demo as any).paginate({}, { page, limit });
  // else
  //   filter = await (Demo as any).paginate(
  //     {
  //       tags: {
  //         $all: query.tags.map(
  //           (x) => new RegExp(`\\b${x.slice(0, x.length - 1)}(a|o)?\\b`)
  //         ),
  //       },
  //     },
  //     { page, limit }
  //   );
  //res.json(filter);
};

export const createDemo: RouteParams = async (req, res) => {
  // const files = req.files as Express.Multer.File[];
  // const { title, description } = req.body;
  // const { tags, exclude } = analyzeQuery(`${title} ${description}`);
  // const images = await Promise.all(
  //   files.map(
  //     async (file) =>
  //       new Promise((resolve, reject) => {
  //         cloudinary.uploader
  //           .upload_stream({ format: "jpg" }, (err, res) => {
  //             if (err) reject(err);
  //             else resolve(res);
  //           })
  //           .end(file.buffer);
  //       })
  //   )
  // );
  // const demo = await new Demo({
  //   title,
  //   tags,
  //   exclude,
  //   images,
  //   description,
  // }).save();
  // res.json(demo);
};
