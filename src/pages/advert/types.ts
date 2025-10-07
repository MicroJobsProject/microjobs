export interface Advert {
  _id: string;
  owner: { username: string };
  name: string;
  price: number;
  offer: boolean;
  category: string;
  photo: string | undefined;
  description: string;
  updatedAt: string;
  isOwner: boolean;
}

export interface AdvertResponse {
  results: Advert[];
  total: number;
  page: number;
  totalAdverts: number;
  totalPages: number;
}

export interface AdvertCategory {
  name: string;
  icon?: string;
}

export interface Filter {
  name?: string;
  min?: number;
  max?: number;
  offer?: boolean;
  category?: string[];
}
