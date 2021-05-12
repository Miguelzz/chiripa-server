/** @format */

import mongoose, { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IDemo } from "../models/demo";

type IDemoRepository = IDemo & Document;

export const imageSchema = new Schema(
  {
    public_id: String,
    url: String,
    secure_url: String,
  },
  { _id: false }
);

const demoSchema = new Schema({
  tags: [String],
  exclude: [String],
  title: String,
  images: [imageSchema],
  description: String,
});

demoSchema.plugin(mongoosePaginate);

demoSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    //delete ret.tags;
  },
});

export const Demo = mongoose.model<IDemoRepository>("Demo", demoSchema);
