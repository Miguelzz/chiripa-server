/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { IRaffle } from "../models/raffle";
import { playerSchema } from "./player.repository";
import { imageSchema } from "./shared";

type IRaffleRepository = IRaffle & Document;

const raffleSchema = new Schema({
  name: String,
  tags: [String],
  description: String,
  drawDate: Date,
  tickets: [String],
  players: [playerSchema],
  images: [imageSchema],
});

raffleSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
    delete ret.tags;
  },
});

export const Raffle = mongoose.model<IRaffleRepository>("Raffle", raffleSchema);
