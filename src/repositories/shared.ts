/** @format */
import { Schema } from "mongoose";

export const imageSchema = new Schema(
  {
    public_id: String,
    url: String,
    secure_url: String,
  },
  { _id: false }
);
