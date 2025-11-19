export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  origin: string; // e.g., "JFK"
  destination: string; // e.g., "LHR"
  departTime: string; // ISO Date
  arriveTime: string; // ISO Date
  duration: string;
  price: number;
  seatsAvailable: number;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  pricePerNight: number;
  imageUrl: string;
  amenities: string[];
}

export interface Booking {
  id: string;
  userId: string;
  type: 'flight' | 'hotel';
  itemId: string;
  details: Flight | Hotel; // Hydrated for UI convenience
  date: string;
  status: 'confirmed' | 'cancelled' | 'pending';
  totalAmount: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}