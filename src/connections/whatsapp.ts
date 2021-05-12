/** @format */

// import {
//   WAConnection,
//   MessageType,
//   MessageOptions,
// } from "@adiwajshing/baileys";
// import { whatsappEnv } from "../env";

// const newConnection = async (conn: WAConnection, connect: boolean) => {
//   if (connect) {
//     const msg = conn.base64EncodedAuthInfo();
//     const result = `
// WHATSAPP_CLIENT_ID="${msg.clientID}"
// WHATSAPP_SERVER_TOKEN="${msg.serverToken}"
// WHATSAPP_CLIENT_TOKEN="${msg.clientToken}"
// WHATSAPP_ENC_KEY="${msg.encKey}"
// WHATSAPP_MAC_KEY="${msg.macKey}"
// `;
//     console.log(result);
//     throw "aaaaaaaaaaaaaaaa";
//   } else {
//     conn.loadAuthInfo(whatsappEnv);
//     await conn.connect();
//   }
// };

// export const whatsapp = new WAConnection();

// export const init = async () => {
//   try {
//     await newConnection(whatsapp, false);
//     console.log("Whatsapp server started!");
//   } catch (e) {
//     console.log(`Whatsapp server error! ${e}`);
//   }
// };

// newConnection(whatsapp, true);

// export const sendMessage = async (phone: string, message: string) => {
//   phone = `${phone.replace(/[\s\+]/g, "").trim()}@s.whatsapp.net`;
//   console.log(`${phone}@s.whatsapp.net`);
//   await whatsapp.sendMessage(phone, message, MessageType.text);
// };

// class Whatsapp {
//   private whatsapp: WAConnection = new WAConnection();
//   private name: string = "";

//   async init() {
//     try {
//       newConnection(this.whatsapp, true);
//       console.log("Whatsapp server started!");
//     } catch (e) {
//       console.log(`Whatsapp server error! ${e}`);
//     }
//   }

//   async sendFile(
//     phone: string,
//     file: Buffer,
//     type: MessageType,
//     options?: MessageOptions
//   ) {
//     phone = phone.replace(/[\s\+]/g, "").trim();
//     const result = await this.whatsapp.sendMessage(
//       `${phone}@s.whatsapp.net`,
//       file,
//       type,
//       options
//     );
//     return result;
//   }

//   async sendText(phone: string, message: string): Promise<void> {
//     phone = `${phone.replace(/[\s\+]/g, "").trim()}@s.whatsapp.net`;
//     console.log(`${phone}@s.whatsapp.net`);
//     await this.whatsapp.sendMessage(phone, message, MessageType.text);

//     // const buffer = fs.readFileSync(`${publicPath}/apps/debts.png`);
//     // const options: MessageOptions = {
//     //   mimetype: Mimetype.png,
//     //   caption: message,
//     // }; // some metadata & caption
//     // await this.whatsapp.sendMessage(phone, buffer, MessageType.image, options);
//   }
// }

// export const whatsapp = new Whatsapp();
