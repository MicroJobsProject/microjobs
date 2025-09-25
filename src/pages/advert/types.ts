export interface Advert {
  _id: string;
  owner: { _id: string; username: string };
  name: string;
  price: number;
  offer: boolean;
  category: string;
  photo: string | undefined;
  description: string;
}

export interface AdvertResponse {
  results: Advert[];
  total: number;
  page: number;
  totalAdverts: number;
  totalPages: number;
}
