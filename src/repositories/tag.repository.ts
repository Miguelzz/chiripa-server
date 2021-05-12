/** @format */

import mongoose, { Schema, Document } from "mongoose";

export interface ITag {
  grandpa: string;
  dad: string;
  child: string;
  tag: string;
}

type ITagRepository = ITag & Document;

export const tagSchema = new Schema({
  grandpa: String,
  dad: String,
  child: String,
  tag: String,
});

tagSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Tag = mongoose.model<ITagRepository>("Tag", tagSchema);
