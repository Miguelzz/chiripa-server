/** @format */

import mongoose, { Schema, Document } from "mongoose";
import { IRole } from "../models/role";

type IRoleRepository = IRole & Document;

const RoleSchema = new Schema({
  type: { type: Number, enum: [0, 1, 2] },
  versionKey: Boolean,
});

RoleSchema.set("toJSON", {
  transform(doc: any, ret: any, options: any) {
    delete ret._id;
    delete ret.__v;
  },
});

export const Role = mongoose.model<IRoleRepository>("Role", RoleSchema);
