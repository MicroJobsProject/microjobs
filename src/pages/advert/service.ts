import { client } from "../../api/client";
import type { AdvertData, AdvertCategory, AdvertResponse } from "./types";

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

export async function getAdvertsCategories() {
  const response = await client.get<AdvertCategory[]>(
    "/api/adverts/categories",
  );

  return response.data;
}
