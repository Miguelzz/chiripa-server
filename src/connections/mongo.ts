/** @format */

import mongoose from "mongoose";
import { databases } from "../env";

export const chiripaConnect = async () => {
  try {
    await mongoose.connect(databases.chiripa, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Database is connected!");
  } catch (e) {
    console.log(e);
  }
};
