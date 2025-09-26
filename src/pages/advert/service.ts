import { client } from "../../api/client";
import type { AdvertData, AdvertResponse } from "./types";

export async function getAdverts(params?: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  const response = await client.get<AdvertResponse>(`/api/adverts?${query}`);

  return response.data;
}

export const createAdvert = async (advertData: AdvertData) => {
  console.log("advertData in service:", advertData);
  const response = await client.post("/api/adverts", advertData);

  return response;
};
