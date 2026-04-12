export type Category = 'Cafes' | 'Malls' | 'Restaurants' | "McDonald's" | 'Parks' | 'Others';

export interface Place {
  id: string;
  name: string;
  category: Category;
  location: string;
  address: string;
  budgetMin: number;
  budgetMax: number;
  offers: string[];
  rating: number;
  reviewCount: number;
  image: string;
  gallery?: string[];
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}
