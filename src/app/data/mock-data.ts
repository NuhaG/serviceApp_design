export type ServiceTuple = [string, string];

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
  serviceTuple: ServiceTuple;
  services: string[];
  reviews: Review[];
  totalBookings: number;
  cancellations: number;
  consultationFee: number;
  serviceFee: number;
  bookingCharge: number;
  location: string;
  lat: number;
  lng: number;
  blocked?: boolean;
  flaggedCount?: number;
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

export interface PopularService {
  name: string;
  icon: string;
  count: number;
}

export interface CurrentUser {
  id: string;
  name: string;
  city: string;
}

type NewReview = {
  userName: string;
  rating: number;
  comment: string;
};

type CreateBookingInput = {
  providerId: string;
  date: string;
  time: string;
  type: "one-time" | "contract";
};

const currentUserData: CurrentUser = {
  id: "u1",
  name: "Aryan Sharma",
  city: "Bengaluru, India",
};

let providersData: Provider[] = [
  { id: "1", name: "Priya Sharma", rating: 4.9, reliabilityScore: 98, basePrice: 699, distance: "1.2 km", acceptRate: 96, rejectRate: 4, photo: "/images/provider1.jpg", serviceTuple: ["House Cleaning", "Deep Cleaning"], services: ["House Cleaning", "Deep Cleaning", "Move-in Cleaning"], consultationFee: 99, serviceFee: 79, bookingCharge: 49, totalBookings: 542, cancellations: 5, location: "Powai, Mumbai", lat: 19.1176, lng: 72.906, reviews: [{ id: "r1", userName: "Rohan Desai", rating: 5, comment: "Excellent deep cleaning and very punctual.", date: "2026-02-10" }] },
  { id: "2", name: "Rahul Mehta", rating: 4.8, reliabilityScore: 95, basePrice: 899, distance: "2.1 km", acceptRate: 92, rejectRate: 8, photo: "/images/provider2.jpg", serviceTuple: ["Plumbing", "Emergency Repairs"], services: ["Plumbing", "Emergency Repairs", "Bathroom Installation"], consultationFee: 149, serviceFee: 99, bookingCharge: 59, totalBookings: 431, cancellations: 9, location: "Andheri West, Mumbai", lat: 19.1367, lng: 72.8295, reviews: [] },
  { id: "3", name: "Ananya Nair", rating: 4.7, reliabilityScore: 93, basePrice: 549, distance: "3.0 km", acceptRate: 89, rejectRate: 11, photo: "/images/provider3.jpg", serviceTuple: ["Pet Sitting", "Dog Walking"], services: ["Pet Sitting", "Dog Walking", "Pet Grooming Support"], consultationFee: 89, serviceFee: 69, bookingCharge: 39, totalBookings: 388, cancellations: 14, location: "Bandra West, Mumbai", lat: 19.0596, lng: 72.8295, reviews: [] },
  { id: "4", name: "Siddharth Rao", rating: 4.9, reliabilityScore: 97, basePrice: 999, distance: "1.7 km", acceptRate: 95, rejectRate: 5, photo: "/images/provider4.jpg", serviceTuple: ["Electrical Work", "Wiring"], services: ["Electrical Work", "Wiring", "Fan and Light Installation"], consultationFee: 149, serviceFee: 119, bookingCharge: 69, totalBookings: 324, cancellations: 4, location: "Goregaon East, Mumbai", lat: 19.1663, lng: 72.8526, reviews: [] },
  { id: "5", name: "Aditi Verma", rating: 4.6, reliabilityScore: 91, basePrice: 749, distance: "4.2 km", acceptRate: 86, rejectRate: 14, photo: "/images/provider5.jpg", serviceTuple: ["Gardening", "Landscaping"], services: ["Gardening", "Landscaping", "Lawn Care"], consultationFee: 119, serviceFee: 89, bookingCharge: 49, totalBookings: 276, cancellations: 11, location: "Thane West, Mumbai", lat: 19.2183, lng: 72.9781, reviews: [] },
  { id: "6", name: "Manoj Kulkarni", rating: 4.9, reliabilityScore: 99, basePrice: 1199, distance: "0.9 km", acceptRate: 98, rejectRate: 2, photo: "/images/provider6.jpg", serviceTuple: ["AC Repair", "HVAC Installation"], services: ["AC Repair", "HVAC Installation", "Seasonal Maintenance"], consultationFee: 179, serviceFee: 129, bookingCharge: 79, totalBookings: 603, cancellations: 2, location: "Vashi, Navi Mumbai", lat: 19.076, lng: 72.9986, reviews: [] },
  { id: "7", name: "Harsh Jain", rating: 4.8, reliabilityScore: 96, basePrice: 849, distance: "2.4 km", acceptRate: 93, rejectRate: 7, photo: "/images/provider2.jpg", serviceTuple: ["Carpentry", "Furniture Assembly"], services: ["Carpentry", "Furniture Assembly", "Door Repair"], consultationFee: 129, serviceFee: 99, bookingCharge: 59, totalBookings: 359, cancellations: 6, location: "Viman Nagar, Pune", lat: 18.5679, lng: 73.9143, reviews: [] },
  { id: "8", name: "Kavya Iyer", rating: 4.7, reliabilityScore: 94, basePrice: 629, distance: "3.5 km", acceptRate: 90, rejectRate: 10, photo: "/images/provider3.jpg", serviceTuple: ["Salon at Home", "Facial Services"], services: ["Salon at Home", "Facial Services", "Bridal Makeup"], consultationFee: 99, serviceFee: 79, bookingCharge: 49, totalBookings: 412, cancellations: 10, location: "Chembur, Mumbai", lat: 19.0522, lng: 72.9005, reviews: [] },
  { id: "9", name: "Imran Khan", rating: 4.8, reliabilityScore: 95, basePrice: 779, distance: "2.9 km", acceptRate: 92, rejectRate: 8, photo: "/images/provider4.jpg", serviceTuple: ["Appliance Repair", "Refrigerator Repair"], services: ["Appliance Repair", "Refrigerator Repair", "Washing Machine Repair"], consultationFee: 119, serviceFee: 89, bookingCharge: 59, totalBookings: 337, cancellations: 7, location: "Dadar, Mumbai", lat: 19.0178, lng: 72.8478, reviews: [] },
  { id: "10", name: "Nikita Banerjee", rating: 4.9, reliabilityScore: 97, basePrice: 689, distance: "1.8 km", acceptRate: 95, rejectRate: 5, photo: "/images/provider5.jpg", serviceTuple: ["Home Painting", "Wall Texturing"], services: ["Home Painting", "Wall Texturing", "Touch-up Painting"], consultationFee: 109, serviceFee: 89, bookingCharge: 49, totalBookings: 451, cancellations: 4, location: "Lower Parel, Mumbai", lat: 19.0048, lng: 72.8258, reviews: [] },
  { id: "11", name: "Arvind Patel", rating: 4.7, reliabilityScore: 94, basePrice: 559, distance: "2.6 km", acceptRate: 91, rejectRate: 9, photo: "/images/provider1.jpg", serviceTuple: ["Pest Control", "Termite Treatment"], services: ["Pest Control", "Termite Treatment", "Mosquito Control"], consultationFee: 89, serviceFee: 69, bookingCharge: 39, totalBookings: 288, cancellations: 8, location: "Mulund West, Mumbai", lat: 19.171, lng: 72.956, reviews: [] },
  { id: "12", name: "Sneha Reddy", rating: 4.8, reliabilityScore: 96, basePrice: 749, distance: "2.3 km", acceptRate: 94, rejectRate: 6, photo: "/images/provider2.jpg", serviceTuple: ["Home Organizing", "Kitchen Setup"], services: ["Home Organizing", "Kitchen Setup", "Wardrobe Setup"], consultationFee: 99, serviceFee: 79, bookingCharge: 49, totalBookings: 311, cancellations: 5, location: "Ghatkopar East, Mumbai", lat: 19.0817, lng: 72.9081, reviews: [] },
  { id: "13", name: "Rakesh Yadav", rating: 4.6, reliabilityScore: 92, basePrice: 699, distance: "3.4 km", acceptRate: 88, rejectRate: 12, photo: "/images/provider3.jpg", serviceTuple: ["Bike Service", "Car Wash"], services: ["Bike Service", "Car Wash", "Interior Cleaning"], consultationFee: 99, serviceFee: 79, bookingCharge: 49, totalBookings: 264, cancellations: 12, location: "Dwarka, Delhi", lat: 28.5921, lng: 77.046, reviews: [] },
  { id: "14", name: "Maya Krishnan", rating: 4.9, reliabilityScore: 98, basePrice: 899, distance: "1.6 km", acceptRate: 97, rejectRate: 3, photo: "/images/provider4.jpg", serviceTuple: ["Elder Care", "Nursing Assistance"], services: ["Elder Care", "Nursing Assistance", "Post-surgery Support"], consultationFee: 159, serviceFee: 119, bookingCharge: 69, totalBookings: 521, cancellations: 3, location: "Bhandup, Mumbai", lat: 19.1458, lng: 72.936, reviews: [] },
  { id: "15", name: "Vikram Saini", rating: 4.8, reliabilityScore: 95, basePrice: 849, distance: "2.0 km", acceptRate: 93, rejectRate: 7, photo: "/images/provider5.jpg", serviceTuple: ["RO Service", "Water Purifier Repair"], services: ["RO Service", "Water Purifier Repair", "Filter Replacement"], consultationFee: 129, serviceFee: 99, bookingCharge: 59, totalBookings: 386, cancellations: 6, location: "Panvel, Navi Mumbai", lat: 18.9894, lng: 73.1175, reviews: [] },
  { id: "16", name: "Devika Menon", rating: 4.7, reliabilityScore: 93, basePrice: 669, distance: "3.1 km", acceptRate: 90, rejectRate: 10, photo: "/images/provider6.jpg", serviceTuple: ["Catering", "Tiffin Service"], services: ["Catering", "Tiffin Service", "Event Snacks"], consultationFee: 99, serviceFee: 79, bookingCharge: 49, totalBookings: 279, cancellations: 9, location: "Kakkanad, Kochi", lat: 10.0159, lng: 76.3419, reviews: [] },
  { id: "17", name: "Kunal Arora", rating: 4.8, reliabilityScore: 96, basePrice: 999, distance: "1.9 km", acceptRate: 94, rejectRate: 6, photo: "/images/provider1.jpg", serviceTuple: ["Home CCTV Setup", "Security Audit"], services: ["Home CCTV Setup", "Security Audit", "Smart Lock Installation"], consultationFee: 159, serviceFee: 119, bookingCharge: 69, totalBookings: 402, cancellations: 5, location: "Sector 62, Noida", lat: 28.6268, lng: 77.3722, reviews: [] },
  { id: "18", name: "Ishita Bose", rating: 4.9, reliabilityScore: 97, basePrice: 799, distance: "2.2 km", acceptRate: 95, rejectRate: 5, photo: "/images/provider2.jpg", serviceTuple: ["Yoga Trainer", "Fitness Coach"], services: ["Yoga Trainer", "Fitness Coach", "Prenatal Yoga"], consultationFee: 129, serviceFee: 99, bookingCharge: 59, totalBookings: 356, cancellations: 4, location: "Ballygunge, Kolkata", lat: 22.5235, lng: 88.3646, reviews: [] },
  { id: "19", name: "Sanjay Thakur", rating: 4.6, reliabilityScore: 91, basePrice: 579, distance: "4.1 km", acceptRate: 87, rejectRate: 13, photo: "/images/provider3.jpg", serviceTuple: ["Courier Pickup", "Parcel Packing"], services: ["Courier Pickup", "Parcel Packing", "Same-day Delivery"], consultationFee: 79, serviceFee: 59, bookingCharge: 39, totalBookings: 245, cancellations: 14, location: "Bhopal New Market, Bhopal", lat: 23.2599, lng: 77.4126, reviews: [] },
  { id: "20", name: "Pooja Chawla", rating: 4.8, reliabilityScore: 96, basePrice: 739, distance: "2.8 km", acceptRate: 93, rejectRate: 7, photo: "/images/provider4.jpg", serviceTuple: ["Event Decor", "Balloon Setup"], services: ["Event Decor", "Balloon Setup", "Birthday Backdrop"], consultationFee: 109, serviceFee: 89, bookingCharge: 49, totalBookings: 333, cancellations: 6, location: "Civil Lines, Nagpur", lat: 21.1458, lng: 79.0882, reviews: [] },
];

const userBookingsData: Booking[] = [
  { id: "b1", providerId: "3", providerName: "Ananya Nair", service: "Pet Sitting", date: "2026-02-21", time: "09:00 AM", status: "confirmed", amount: 746, type: "contract" },
  { id: "b2", providerId: "1", providerName: "Priya Sharma", service: "Deep Cleaning", date: "2026-02-14", time: "10:00 AM", status: "completed", amount: 926, type: "one-time" },
  { id: "b3", providerId: "2", providerName: "Rahul Mehta", service: "Plumbing", date: "2026-02-10", time: "12:30 PM", status: "completed", amount: 1206, type: "one-time" },
  { id: "b4", providerId: "6", providerName: "Manoj Kulkarni", service: "AC Repair", date: "2026-02-05", time: "04:00 PM", status: "completed", amount: 1586, type: "one-time" },
  { id: "b5", providerId: "7", providerName: "Harsh Jain", service: "Furniture Assembly", date: "2026-02-01", time: "11:30 AM", status: "completed", amount: 1136, type: "one-time" },
  { id: "b6", providerId: "8", providerName: "Kavya Iyer", service: "Salon at Home", date: "2026-01-27", time: "06:00 PM", status: "completed", amount: 856, type: "contract" },
  { id: "b7", providerId: "10", providerName: "Nikita Banerjee", service: "Home Painting", date: "2026-01-22", time: "03:00 PM", status: "completed", amount: 936, type: "one-time" },
  { id: "b8", providerId: "5", providerName: "Aditi Verma", service: "Gardening", date: "2026-01-18", time: "08:30 AM", status: "cancelled", amount: 1006, type: "contract" },
];

const providerBookingsData: Booking[] = [
  { id: "pb1", providerId: "1", providerName: "Arjun Gupta", service: "House Cleaning", date: "2026-02-20", time: "11:00 AM", status: "pending", amount: 926, type: "one-time" },
  { id: "pb2", providerId: "1", providerName: "Ishita Reddy", service: "Deep Cleaning", date: "2026-02-22", time: "03:00 PM", status: "pending", amount: 1149, type: "one-time" },
  { id: "pb3", providerId: "1", providerName: "Nikhil Soni", service: "Move-in Cleaning", date: "2026-02-24", time: "10:00 AM", status: "confirmed", amount: 1299, type: "contract" },
  { id: "pb4", providerId: "1", providerName: "Pallavi Menon", service: "House Cleaning", date: "2026-02-14", time: "01:30 PM", status: "completed", amount: 899, type: "one-time" },
  { id: "pb5", providerId: "2", providerName: "Tanya Shah", service: "Emergency Repairs", date: "2026-02-19", time: "09:00 AM", status: "pending", amount: 1250, type: "one-time" },
  { id: "pb6", providerId: "3", providerName: "Rahul Nair", service: "Dog Walking", date: "2026-02-18", time: "07:30 AM", status: "confirmed", amount: 699, type: "contract" },
  { id: "pb7", providerId: "4", providerName: "Vivek S", service: "Wiring", date: "2026-02-17", time: "04:45 PM", status: "completed", amount: 1399, type: "one-time" },
  { id: "pb8", providerId: "5", providerName: "Maya B", service: "Gardening", date: "2026-02-16", time: "08:00 AM", status: "cancelled", amount: 999, type: "contract" },
  { id: "pb9", providerId: "6", providerName: "Ajay Kumar", service: "AC Repair", date: "2026-02-23", time: "02:00 PM", status: "pending", amount: 1599, type: "one-time" },
  { id: "pb10", providerId: "7", providerName: "Naina Mehra", service: "Furniture Assembly", date: "2026-02-21", time: "05:15 PM", status: "confirmed", amount: 1160, type: "one-time" },
  { id: "pb11", providerId: "8", providerName: "Ritika Jain", service: "Salon at Home", date: "2026-02-15", time: "06:30 PM", status: "completed", amount: 880, type: "contract" },
  { id: "pb12", providerId: "9", providerName: "Mohit Verma", service: "Appliance Repair", date: "2026-02-20", time: "10:15 AM", status: "pending", amount: 1090, type: "one-time" },
  { id: "pb13", providerId: "10", providerName: "Prerna Das", service: "Home Painting", date: "2026-02-25", time: "11:30 AM", status: "confirmed", amount: 1280, type: "contract" },
  { id: "pb14", providerId: "11", providerName: "Hemant Rao", service: "Pest Control", date: "2026-02-13", time: "09:45 AM", status: "completed", amount: 799, type: "one-time" },
  { id: "pb15", providerId: "12", providerName: "Supriya Sen", service: "Home Organizing", date: "2026-02-18", time: "03:45 PM", status: "pending", amount: 930, type: "one-time" },
  { id: "pb16", providerId: "13", providerName: "Kushal T", service: "Car Wash", date: "2026-02-12", time: "01:00 PM", status: "cancelled", amount: 820, type: "one-time" },
  { id: "pb17", providerId: "14", providerName: "Aparna N", service: "Elder Care", date: "2026-02-26", time: "08:30 AM", status: "confirmed", amount: 1520, type: "contract" },
  { id: "pb18", providerId: "15", providerName: "Rohit Malhotra", service: "RO Service", date: "2026-02-22", time: "12:15 PM", status: "pending", amount: 1080, type: "one-time" },
  { id: "pb19", providerId: "16", providerName: "Kriti Pillai", service: "Tiffin Service", date: "2026-02-14", time: "11:00 AM", status: "completed", amount: 860, type: "contract" },
  { id: "pb20", providerId: "17", providerName: "Sachin G", service: "Home CCTV Setup", date: "2026-02-27", time: "04:00 PM", status: "pending", amount: 1750, type: "one-time" },
  { id: "pb21", providerId: "18", providerName: "Anita Roy", service: "Yoga Trainer", date: "2026-02-21", time: "07:00 AM", status: "confirmed", amount: 980, type: "contract" },
  { id: "pb22", providerId: "19", providerName: "Saurabh M", service: "Parcel Packing", date: "2026-02-11", time: "02:30 PM", status: "cancelled", amount: 640, type: "one-time" },
  { id: "pb23", providerId: "20", providerName: "Priti K", service: "Event Decor", date: "2026-02-28", time: "06:00 PM", status: "confirmed", amount: 1220, type: "contract" },
];

const popularServicesData: PopularService[] = [
  { name: "House Cleaning", icon: "Home", count: 6245 },
  { name: "Plumbing", icon: "Wrench", count: 4676 },
  { name: "Electrical Work", icon: "Zap", count: 4421 },
  { name: "Pet Care", icon: "PawPrint", count: 3120 },
  { name: "Gardening", icon: "Flower2", count: 2986 },
  { name: "AC Repair", icon: "Wind", count: 4758 },
];

function withDelay<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), 120);
  });
}

export async function fetchCurrentUser(): Promise<CurrentUser> {
  return withDelay(currentUserData);
}

export async function fetchProviders(): Promise<Provider[]> {
  return withDelay(providersData.map((provider) => ({ ...provider, reviews: [...provider.reviews] })));
}

export async function fetchUserBookings(): Promise<Booking[]> {
  return withDelay([...userBookingsData]);
}

export async function fetchProviderBookings(): Promise<Booking[]> {
  return withDelay([...providerBookingsData]);
}

export async function fetchPopularServices(): Promise<PopularService[]> {
  return withDelay([...popularServicesData]);
}

export async function addProviderReview(providerId: string, review: NewReview): Promise<Review> {
  const provider = providersData.find((item) => item.id === providerId);
  if (!provider) {
    throw new Error("Provider not found");
  }

  const createdReview: Review = {
    id: `r${Date.now()}`,
    userName: review.userName,
    rating: Math.max(1, Math.min(5, Math.round(review.rating))),
    comment: review.comment.trim(),
    date: new Date().toISOString().slice(0, 10),
  };

  provider.reviews = [createdReview, ...provider.reviews];
  const ratings = provider.reviews.map((item) => item.rating);
  const nextRating = ratings.reduce((sum, value) => sum + value, 0) / ratings.length;
  provider.rating = Number(nextRating.toFixed(1));

  return withDelay(createdReview);
}

export async function createUserBooking(input: CreateBookingInput): Promise<Booking> {
  const provider = providersData.find((item) => item.id === input.providerId);
  if (!provider) throw new Error("Provider not found");

  const amount =
    provider.basePrice +
    provider.bookingCharge +
    provider.consultationFee +
    provider.serviceFee;

  const booking: Booking = {
    id: `b${Date.now()}`,
    providerId: provider.id,
    providerName: provider.name,
    service: provider.serviceTuple[0],
    date: input.date,
    time: input.time,
    status: "confirmed",
    amount,
    type: input.type,
  };

  userBookingsData.unshift(booking);

  const providerSideBooking: Booking = {
    id: `pb${Date.now()}`,
    providerId: provider.id,
    providerName: currentUserData.name,
    service: booking.service,
    date: booking.date,
    time: booking.time,
    status: "pending",
    amount: booking.amount,
    type: booking.type,
  };
  providerBookingsData.unshift(providerSideBooking);

  return withDelay(booking);
}

export async function updateUserBookingStatus(
  bookingId: string,
  status: Booking["status"]
): Promise<void> {
  const target = userBookingsData.find((item) => item.id === bookingId);
  if (target) {
    target.status = status;
  }
  return withDelay(undefined);
}

export async function rescheduleUserBooking(
  bookingId: string,
  date: string,
  time: string
): Promise<void> {
  const target = userBookingsData.find((item) => item.id === bookingId);
  if (target) {
    target.date = date;
    target.time = time;
    if (target.status === "cancelled") {
      target.status = "pending";
    }
  }
  return withDelay(undefined);
}

export async function updateProviderModeration(
  providerId: string,
  action: "flag" | "block" | "unblock"
): Promise<void> {
  const provider = providersData.find((item) => item.id === providerId);
  if (!provider) return withDelay(undefined);

  if (action === "flag") {
    provider.flaggedCount = (provider.flaggedCount ?? 0) + 1;
  }
  if (action === "block") {
    provider.blocked = true;
  }
  if (action === "unblock") {
    provider.blocked = false;
  }

  return withDelay(undefined);
}
