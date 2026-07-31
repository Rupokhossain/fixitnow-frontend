export interface ITechnicianProfile {
  id: string;
  bio: string;
  skills: string;
  experience: string;
  pricing: number;
  location?: string | null;
  availability?: string | null;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'TECHNICIAN' | 'CUSTOMER' | 'ADMIN';
  status: 'ACTIVE' | 'BANNED';
  technicianProfile?: ITechnicianProfile | null;
}

export interface IBooking {
  _id: string;
  id?: string;
  service?: { name: string; price: number };
  customer?: { name: string; email: string };
  technician?: { name: string };
  slotDate: string;
  slotTime: string;
  status: 'REQUESTED' | 'ACCEPTED' | 'PAID' | 'IN_PROGRESS' | 'COMPLETED' | 'DECLINED';
  price?: number;
}

export interface IAvailability {
  status: 'Available' | 'Unavailable' | 'Offline';
  nextAvailableSlot?: string;
}