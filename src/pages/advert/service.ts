import { client } from "../../api/client";
import type { AdvertCategory, AdvertResponse, Advert } from "./types";

export async function getAdverts(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const response = await client.get<AdvertResponse>(`/api/adverts?${query}`);

  return response.data;
}

export const createAdvert = async (formData: FormData) => {
  const response = await client.post("/api/adverts", formData);

  return response;
};

export async function getAdvertsCategories() {
  const response = await client.get<AdvertCategory[]>(
    "/api/adverts/categories",
  );

  return response.data;
}

export async function deleteAdvert(advertId: string): Promise<void> {
  await client.delete(`/api/adverts/${advertId}`);
}

export async function deleteMultipleAdverts(
  advertIds: string[],
): Promise<void> {
  await client.post("/api/adverts/bulk-delete", { advertIds });
}

export const getAdvertById = async (advertId: string) => {
  const response = await client.get<Advert>(`/api/adverts/${advertId}`);

  return response.data;
};

// CONTACT OWNER OF AN ADVERT
export async function sendContactMessage(
  advertId: string,
  data: {
    senderName: string;
    senderEmail: string;
    subject: string;
    message: string;
    username?: string;
  },
): Promise<{ success: boolean; message: string }> {
  const response = await client.post(`/api/contact/${advertId}`, data);
  return response.data;
}
