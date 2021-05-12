/** @format */

import { twilioEnv } from "../env";
import twilio from "twilio";
const client = twilio(twilioEnv.accountSid, twilioEnv.authToken, {});

export const sendMessage = async (phone: string, message: string) => {
  console.log(`twilio ${phone}`);
  await client.messages.create({
    to: phone,
    from: twilioEnv.phone,
    body: message,
  });
};
