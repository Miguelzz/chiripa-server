/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { IImage } from "../models/image";

type IImageRepository = IImage & Document;

const ImageSchema = new Schema({
  publicId: String,
  url: String,
});

ImageSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Image = mongoose.model<IImageRepository>("Image", ImageSchema);
