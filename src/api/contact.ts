import { client } from "./client";

export interface ContactMessageData {
  senderName: string;
  senderEmail: string;
  message: string;
  username?: string;
}

export async function sendContactMessage(
  advertId: string,
  data: ContactMessageData,
) {
  const response = await client.post(`/contact/${advertId}`, data);
  return response.data;
}
