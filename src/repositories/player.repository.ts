/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { IPlayer } from "../models/player";

type IPlayerRepository = IPlayer & Document;

export const playerSchema = new Schema({
  userId: String,
  tickets: [String],
});

playerSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Player = mongoose.model<IPlayerRepository>("Player", playerSchema);
