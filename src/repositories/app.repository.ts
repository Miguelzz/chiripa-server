/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { IApp } from "../models/app";

type IAppRepository = IApp & Document;

const AppSchema = new Schema({
  name: { type: Number, enum: [0, 1, 2], default: 0 },
  roles: [{ _id: false, type: Number, enum: [0, 1, 2], default: 0 }],
});

AppSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
  },
});

export const App = mongoose.model<IAppRepository>("App", AppSchema);
