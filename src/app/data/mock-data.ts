export interface Provider {
  id: string;
  name: string;
  rating: number;
  reliabilityScore: number;
  basePrice: number;
  distance: string;
  acceptRate: number;
  rejectRate: number;
  photo: string;
  services: string[];
  reviews: Review[];
  totalBookings: number;
  cancellations: number;
  consultationFee: number;
  serviceFee: number;
  bookingCharge: number;
  location: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  providerId: string;
  providerName: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  amount: number;
  type: "one-time" | "contract";
}

export const mockProviders: Provider[] = [
  {
    id: "1",
    name: "Priya Sharma",
    rating: 4.9,
    reliabilityScore: 98,
    basePrice: 50,
    distance: "0.8 km",
    acceptRate: 95,
    rejectRate: 5,
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
    services: ["House Cleaning", "Deep Cleaning", "Move-in/Move-out"],
    consultationFee: 10,
    serviceFee: 8,
    bookingCharge: 5,
    totalBookings: 342,
    cancellations: 3,
    location: "Kurla",
    reviews: [
      {
        id: "r1",
        userName: "Rohan Desai",
        rating: 5,
        comment: "Excellent service! Very thorough and professional.",
        date: "2026-02-10",
      },
      {
        id: "r2",
        userName: "Meera Patil",
        rating: 5,
        comment: "Best cleaning service I've used. Highly reliable!",
        date: "2026-02-08",
      },
      {
        id: "r3",
        userName: "Arjun Kulkarni",
        rating: 4,
        comment: "Great work, arrived on time.",
        date: "2026-02-05",
      },
    ],
  },
  {
    id: "2",
    name: "Rahul Mehta",
    rating: 4.8,
    reliabilityScore: 95,
    basePrice: 65,
    distance: "1.2 km",
    acceptRate: 92,
    rejectRate: 8,
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    services: ["Plumbing", "Emergency Repairs", "Installation"],
    consultationFee: 15,
    serviceFee: 10,
    bookingCharge: 5,
    totalBookings: 287,
    cancellations: 5,
    location: "Andheri",
    reviews: [
      {
        id: "r4",
        userName: "Sneha Iyer",
        rating: 5,
        comment: "Fixed my leak quickly and efficiently!",
        date: "2026-02-12",
      },
      {
        id: "r5",
        userName: "Vikram Joshi",
        rating: 5,
        comment: "Very knowledgeable and professional.",
        date: "2026-02-09",
      },
    ],
  },
  {
    id: "3",
    name: "Ananya Nair",
    rating: 4.7,
    reliabilityScore: 93,
    basePrice: 45,
    distance: "2.1 km",
    acceptRate: 88,
    rejectRate: 12,
    photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
    services: ["Pet Sitting", "Dog Walking", "Pet Care"],
    consultationFee: 5,
    serviceFee: 7,
    bookingCharge: 5,
    totalBookings: 456,
    cancellations: 12,
    location: "Bandra",
    reviews: [
      {
        id: "r6",
        userName: "Karan Malhotra",
        rating: 5,
        comment: "My dog loves her! Very caring and reliable.",
        date: "2026-02-11",
      },
    ],
  },
  {
    id: "4",
    name: "Siddharth Rao",
    rating: 4.9,
    reliabilityScore: 97,
    basePrice: 80,
    distance: "1.5 km",
    acceptRate: 96,
    rejectRate: 4,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    services: ["Electrical Work", "Wiring", "Installation"],
    consultationFee: 20,
    serviceFee: 12,
    bookingCharge: 5,
    totalBookings: 198,
    cancellations: 2,
    location: "Malad",
    reviews: [
      {
        id: "r7",
        userName: "Neha Kapoor",
        rating: 5,
        comment: "Expert electrician, very professional!",
        date: "2026-02-13",
      },
    ],
  },
  {
    id: "5",
    name: "Aditi Verma",
    rating: 4.6,
    reliabilityScore: 91,
    basePrice: 55,
    distance: "3.2 km",
    acceptRate: 85,
    rejectRate: 15,
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400",
    services: ["Gardening", "Landscaping", "Lawn Care"],
    consultationFee: 10,
    serviceFee: 8,
    bookingCharge: 5,
    totalBookings: 234,
    cancellations: 8,
    location: "Borivali",
    reviews: [
      {
        id: "r8",
        userName: "Suresh Pawar",
        rating: 4,
        comment: "Good work, made my garden look great.",
        date: "2026-02-07",
      },
    ],
  },
  {
    id: "6",
    name: "Manoj Kulkarni",
    rating: 4.9,
    reliabilityScore: 99,
    basePrice: 70,
    distance: "0.5 km",
    acceptRate: 98,
    rejectRate: 2,
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    services: ["AC Repair", "HVAC Installation", "Maintenance"],
    consultationFee: 15,
    serviceFee: 10,
    bookingCharge: 5,
    totalBookings: 412,
    cancellations: 1,
    location: "Vashi",
    reviews: [
      {
        id: "r9",
        userName: "Pooja Deshmukh",
        rating: 5,
        comment: "Amazing service! Fixed my AC in no time.",
        date: "2026-02-14",
      },
    ],
  },
];

export const mockUserBookings: Booking[] = [
  {
    id: "b1",
    providerId: "1",
    providerName: "Sarah Johnson",
    service: "House Cleaning",
    date: "2026-02-20",
    time: "10:00 AM",
    status: "confirmed",
    amount: 73,
    type: "one-time",
  },
  {
    id: "b2",
    providerId: "2",
    providerName: "Michael Chen",
    service: "Plumbing",
    date: "2026-02-15",
    time: "2:00 PM",
    status: "completed",
    amount: 95,
    type: "one-time",
  },
  {
    id: "b3",
    providerId: "3",
    providerName: "Emma Williams",
    service: "Pet Sitting",
    date: "2026-02-18",
    time: "9:00 AM",
    status: "pending",
    amount: 62,
    type: "contract",
  },
];

export const mockProviderBookings: Booking[] = [
  {
    id: "pb1",
    providerId: "1",
    providerName: "John Davis",
    service: "House Cleaning",
    date: "2026-02-16",
    time: "11:00 AM",
    status: "pending",
    amount: 73,
    type: "one-time",
  },
  {
    id: "pb2",
    providerId: "1",
    providerName: "Emily Brown",
    service: "Deep Cleaning",
    date: "2026-02-17",
    time: "3:00 PM",
    status: "pending",
    amount: 120,
    type: "one-time",
  },
  {
    id: "pb3",
    providerId: "1",
    providerName: "Robert Wilson",
    service: "Move-in Cleaning",
    date: "2026-02-22",
    time: "10:00 AM",
    status: "confirmed",
    amount: 150,
    type: "contract",
  },
];

export const popularServices = [
  { name: "House Cleaning", icon: "Home", count: 1245 },
  { name: "Plumbing", icon: "Wrench", count: 876 },
  { name: "Electrical Work", icon: "Zap", count: 654 },
  { name: "Pet Care", icon: "PawPrint", count: 543 },
  { name: "Gardening", icon: "Flower2", count: 432 },
  { name: "AC Repair", icon: "Wind", count: 398 },
];