/** @format */

import { Schema } from "mongoose";

export type Id = Schema.Types.ObjectId;
export type Ids = Schema.Types.ObjectId[];

export interface Input {
  idUser?: Id;
  token?: string;
  phone?: string;
}
