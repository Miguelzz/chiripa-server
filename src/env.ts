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

      readonly MONGO_USERS: string;
      readonly MONGO_MERCAKY: string;

      readonly JWT_SECRET: string;

      readonly EMAIL_HOST: string;
      readonly EMAIL_PORT: string;
      readonly EMAIL_USER: string;
      readonly EMAIL_PASSWORD: string;

      readonly TWILIO_ACCOUNT_SID: string;
      readonly TWILIO_AUTH_TOKEN: string;
      readonly TWILIO_PHONE: string;
      readonly TWILIO_WHATSAPP: string;

      readonly WHATSAPP_CLIENT_ID: string;
      readonly WHATSAPP_SERVER_TOKEN: string;
      readonly WHATSAPP_CLIENT_TOKEN: string;
      readonly WHATSAPP_ENC_KEY: string;
      readonly WHATSAPP_MAC_KEY: string;
      readonly NOTIFICATION_PUBLIC_KEY: string;
      readonly NOTIFICATION_PRIVATE_KEY: string;

      readonly FIREBASE_TYPE: string;
      readonly FIREBASE_PROJECT_ID: string;
      readonly FIREBASE_PRIVATE_KEY_ID: string;
      readonly FIREBASE_PRIVATE_KEY: string;
      readonly FIREBASE_CLIENT_EMAIL: string;
      readonly FIREBASE_CLIENT_ID: string;
      readonly FIREBASE_AUTH_URI: string;
      readonly FIREBASE_TOKEN_URI: string;
      readonly FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string;
      readonly FIREBASE_CLIENT_X509_CERT_URL: string;

      readonly CLOUDINARY_CLOUD_NAME: string;
      readonly CLOUDINARY_API_KEY: string;
      readonly CLOUDINARY_API_SECRET: string;
    }
  }
}

import { config } from "dotenv";
import path from "path";
config();

const externals = [process.env.EXTERNAL_RIFAKO!, process.env.EXTERNAL_MERCAKY!];

export const isExternal = (external: string = "") =>
  externals.some((x) => external === x);

export const publicPath = path.resolve(__dirname, "public");
export const publicTemp = path.resolve(`${publicPath}/temp/`);
export const publicPhotos = path.resolve(`${publicPath}/photos/`);

if (!fs.existsSync(publicTemp)) fs.mkdirSync(publicTemp);
if (!fs.existsSync(publicTemp)) fs.mkdirSync(publicPhotos);

export const notificationEnv = {
  privateKey: process.env.NOTIFICATION_PRIVATE_KEY!,
  publicKey: process.env.NOTIFICATION_PUBLIC_KEY!,
};

export const whatsappEnv = {
  clientID: process.env.WHATSAPP_CLIENT_ID!,
  serverToken: process.env.WHATSAPP_SERVER_TOKEN!,
  clientToken: process.env.WHATSAPP_CLIENT_TOKEN!,
  encKey: process.env.WHATSAPP_ENC_KEY!,
  macKey: process.env.WHATSAPP_MAC_KEY!,
};

export const emailEnv = {
  host: process.env.EMAIL_HOST!,
  port: parseInt(process.env.EMAIL_PORT!),
  user: process.env.EMAIL_USER!,
  password: process.env.EMAIL_PASSWORD!,
};

export const twilioEnv = {
  accountSid: process.env.TWILIO_ACCOUNT_SID!,
  authToken: process.env.TWILIO_AUTH_TOKEN!,
  phone: process.env.TWILIO_PHONE!,
};

export const databases = {
  mercaky: process.env.MONGO_MERCAKY!,
  chiripa: process.env.MONGO_CHIRIPA!,
  rifako: process.env.MONGO_RIFAkO!,
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
