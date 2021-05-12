/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { IProfile } from "../models/profile";

type IProfileRepository = IProfile & Document;

const profileSchema = new Schema({
  raffles: [{ type: Schema.Types.ObjectId, ref: "Raffle" }],
});

profileSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Profile = mongoose.model<IProfileRepository>(
  "Profile",
  profileSchema
);
