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

export interface AdvertData {
  name: string;
  price: string;
  offer: string;
  category: string;
  photo?: File;
  description: string;
}

export interface AdvertResponse {
  results: Advert[];
  total: number;
  page: number;
  totalAdverts: number;
  totalPages: number;
}

export interface Filter {
  name?: string;
  minPrice?: number;
  maxPrice?: number;
  offer?: boolean;
  category?: string[];
}
