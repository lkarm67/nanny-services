export interface Nanny {
  name: string;
  avatar_url: string;
  birthday: string;
  experience: number;
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









/*nannies.ts
import babysittersData from '../babysitters.json';

export interface BabysitterAPI {
  name: string;
  avatar_url: string;
  birthday: string;
  experience: string;
  reviews: {
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
  rating: number;
}

// UI тип
export interface Babysitter {
  id: string;
  name: string;
  avatar_url: string;
  experience: string;
  kids_age: string;
  price_per_hour: number;
  location: string;
  about: string;
  rating: number;
  isOnline: boolean;
  characters: string[];
}

// Маппінг API → UI
export const mapAPItoUI = (api: BabysitterAPI): Babysitter => ({
  id: `${api.name}-${api.location}-${api.price_per_hour}`,
  name: api.name,
  avatar_url: api.avatar_url,
  experience: api.experience,
  kids_age: api.kids_age,
  price_per_hour: api.price_per_hour,
  location: api.location,
  about: api.about,
  rating: api.rating,
  isOnline: true,
  characters: api.characters,
});

// Експорт масиву для UI
export const nannies: Babysitter[] = babysittersData.map(mapAPItoUI);





/*export interface Nanny {
  name: string;
  avatar: string;
  rating: number;
  price_per_hour: number;
  location: string;
  experience: string;
  kids_age: string;
  description: string;
  isOnline: boolean;
}

export const nannies: Nanny[] = [
  {
    name: "Emily Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    price_per_hour: 20,
    location: "New York, USA",
    experience: "5 years",
    kids_age: "2-10 years",
    description:
      "Caring and responsible nanny with extensive experience working with children of different ages.",
    isOnline: true,  
  },
];*/