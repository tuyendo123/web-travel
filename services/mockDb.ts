import { Flight, Hotel, User, Booking, UserRole, AuthResponse } from '../types';

// --- Mock Data Seeds ---

const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'f1',
    airline: 'SkyHigh Airways',
    flightNumber: 'SH-101',
    origin: 'New York (JFK)',
    destination: 'London (LHR)',
    departTime: '2023-12-15T10:00:00Z',
    arriveTime: '2023-12-15T22:00:00Z',
    duration: '7h 00m',
    price: 450,
    seatsAvailable: 12,
  },
  {
    id: 'f2',
    airline: 'Oceanic Airlines',
    flightNumber: 'OA-815',
    origin: 'Los Angeles (LAX)',
    destination: 'Sydney (SYD)',
    departTime: '2023-12-16T14:00:00Z',
    arriveTime: '2023-12-18T06:00:00Z',
    duration: '15h 00m',
    price: 1200,
    seatsAvailable: 5,
  },
  {
    id: 'f3',
    airline: 'British Airways',
    flightNumber: 'BA-112',
    origin: 'London (LHR)',
    destination: 'New York (JFK)',
    departTime: '2023-12-20T08:00:00Z',
    arriveTime: '2023-12-20T11:00:00Z',
    duration: '8h 00m',
    price: 520,
    seatsAvailable: 20,
  },
  {
    id: 'f4',
    airline: 'Emirates',
    flightNumber: 'EK-202',
    origin: 'New York (JFK)',
    destination: 'Dubai (DXB)',
    departTime: '2023-12-18T23:00:00Z',
    arriveTime: '2023-12-19T20:00:00Z',
    duration: '12h 30m',
    price: 950,
    seatsAvailable: 8,
  },
  {
    id: 'f5',
    airline: 'Delta',
    flightNumber: 'DL-44',
    origin: 'New York (JFK)',
    destination: 'Paris (CDG)',
    departTime: '2023-12-15T18:00:00Z',
    arriveTime: '2023-12-16T07:30:00Z',
    duration: '7h 30m',
    price: 680,
    seatsAvailable: 15,
  },
];

const MOCK_HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Grand Plaza Hotel',
    location: 'New York',
    rating: 4.8,
    pricePerNight: 350,
    imageUrl: 'https://picsum.photos/seed/hotel1/400/300',
    amenities: ['Pool', 'Spa', 'Gym', 'Free WiFi'],
  },
  {
    id: 'h2',
    name: 'Seaside Resort',
    location: 'Sydney',
    rating: 4.5,
    pricePerNight: 220,
    imageUrl: 'https://picsum.photos/seed/hotel2/400/300',
    amenities: ['Beach Access', 'Breakfast Included', 'Bar'],
  },
  {
    id: 'h3',
    name: 'The Royal London',
    location: 'London',
    rating: 4.2,
    pricePerNight: 180,
    imageUrl: 'https://picsum.photos/seed/hotel3/400/300',
    amenities: ['City View', 'Concierge', 'Restaurant'],
  },
  {
    id: 'h4',
    name: 'Desert Oasis',
    location: 'Dubai',
    rating: 4.9,
    pricePerNight: 500,
    imageUrl: 'https://picsum.photos/seed/hotel4/400/300',
    amenities: ['Luxury', 'Private Pool', 'Butler Service'],
  },
  {
    id: 'h5',
    name: 'Eiffel Tower View',
    location: 'Paris',
    rating: 4.6,
    pricePerNight: 290,
    imageUrl: 'https://picsum.photos/seed/hotel5/400/300',
    amenities: ['Romantic', 'Near Metro', 'Bathtub'],
  },
];

const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Demo User',
    email: 'user@demo.com',
    role: UserRole.USER,
    avatarUrl: 'https://picsum.photos/seed/user1/100/100',
  },
  {
    id: 'u2',
    name: 'Admin User',
    email: 'admin@demo.com',
    role: UserRole.ADMIN,
    avatarUrl: 'https://picsum.photos/seed/admin1/100/100',
  },
];

// --- Service Layer (Simulating Async API) ---

export const FlightService = {
  search: async (origin: string, destination: string): Promise<Flight[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = MOCK_FLIGHTS.filter(
          (f) =>
            (origin === '' || f.origin.toLowerCase().includes(origin.toLowerCase())) &&
            (destination === '' || f.destination.toLowerCase().includes(destination.toLowerCase()))
        );
        resolve(results);
      }, 800); // Simulate network latency
    });
  },
  getById: async (id: string): Promise<Flight | undefined> => {
    return new Promise((resolve) => resolve(MOCK_FLIGHTS.find((f) => f.id === id)));
  },
};

export const HotelService = {
  search: async (location: string): Promise<Hotel[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = MOCK_HOTELS.filter((h) =>
          location === '' || h.location.toLowerCase().includes(location.toLowerCase())
        );
        resolve(results);
      }, 800);
    });
  },
  getById: async (id: string): Promise<Hotel | undefined> => {
    return new Promise((resolve) => resolve(MOCK_HOTELS.find((h) => h.id === id)));
  },
};

// In-memory storage for new bookings
let bookingsStore: Booking[] = [
  {
    id: 'b1',
    userId: 'u1',
    type: 'flight',
    itemId: 'f1',
    details: MOCK_FLIGHTS[0],
    date: '2023-10-10',
    status: 'confirmed',
    totalAmount: 450,
  },
];

export const BookingService = {
  create: async (booking: Omit<Booking, 'id'>): Promise<Booking> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newBooking = { ...booking, id: `b${Date.now()}` };
        bookingsStore.push(newBooking);
        resolve(newBooking);
      }, 1000);
    });
  },
  getByUserId: async (userId: string): Promise<Booking[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(bookingsStore.filter((b) => b.userId === userId));
      }, 600);
    });
  },
  getAll: async (): Promise<Booking[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(bookingsStore), 500));
  },
};

export const AuthService = {
  login: async (email: string): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = MOCK_USERS.find((u) => u.email === email);
        if (user) {
          resolve({ token: 'mock-jwt-token', user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
};