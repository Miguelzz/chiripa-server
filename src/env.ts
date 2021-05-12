/** @format */
import fs from "fs";

export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly NODE_ENV: "development" | "production" | "test";
      readonly PORT: string;
      readonly PRESENTATION: string;
      readonly SESSION_SECRET: string;

      readonly MONGO_CHIRIPA: string;

      readonly JWT_SECRET: string;

      readonly WHATSAPP_CLIENT_ID: string;
      readonly WHATSAPP_SERVER_TOKEN: string;
      readonly WHATSAPP_CLIENT_TOKEN: string;
      readonly WHATSAPP_ENC_KEY: string;
      readonly WHATSAPP_MAC_KEY: string;
      readonly NOTIFICATION_PUBLIC_KEY: string;
      readonly NOTIFICATION_PRIVATE_KEY: string;

      readonly CLOUDINARY_CLOUD_NAME: string;
      readonly CLOUDINARY_API_KEY: string;
      readonly CLOUDINARY_API_SECRET: string;
    }
  }
}

import { config } from "dotenv";
import path from "path";
config();

export const publicPath = path.resolve(__dirname, "public");
export const publicTemp = path.resolve(`${publicPath}/temp/`);
export const publicPhotos = path.resolve(`${publicPath}/photos/`);

if (!fs.existsSync(publicTemp)) fs.mkdirSync(publicTemp);
if (!fs.existsSync(publicTemp)) fs.mkdirSync(publicPhotos);

export const whatsappEnv = {
  clientID: process.env.WHATSAPP_CLIENT_ID!,
  serverToken: process.env.WHATSAPP_SERVER_TOKEN!,
  clientToken: process.env.WHATSAPP_CLIENT_TOKEN!,
  encKey: process.env.WHATSAPP_ENC_KEY!,
  macKey: process.env.WHATSAPP_MAC_KEY!,
};

export const databases = {
  chiripa: process.env.MONGO_CHIRIPA!,
};

export default {
  port: parseInt(process.env.PORT!),
  sessionSecret: process.env.SESSION_SECRET!,
  jwtSecret: process.env.JWT_SECRET!,
};

export const cloudDinary = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
};
