export interface Nanny {
  id: string;
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  reviews?: {
    reviewer: string;
    rating: number;
    comment: string;
  }[];
  education: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  characters: string[];
  rating?: number;
  isOnline?: boolean;
}
