/** @format */

import mongoose, { Schema, Document } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { IRaffle } from "../models/raffle";
import { playerSchema } from "./player.repository";
import { imageSchema } from "./shared";

type IRaffleRepository = IRaffle & Document;

const raffleSchema = new Schema({
  name: String,
  tags: [String],
  description: String,
  drawDate: String,
  tickets: [String],
  totalPrice: Number,
  players: [playerSchema],
  images: [imageSchema],
});

raffleSchema.plugin(mongoosePaginate);

raffleSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.tags;
  },
});

export const Raffle = mongoose.model<IRaffleRepository>("Raffle", raffleSchema);
