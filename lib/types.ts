export interface ITechnicianProfile {
  id: string;
  bio: string;
  skills: string;
  experience: string;
  pricing: number;
  location?: string | null;
  availability?: string | null;
}

export interface IAvailability {
  availability: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "TECHNICIAN" | "ADMIN";
  status: "ACTIVE" | "BANNED";
  technicianProfile?: ITechnicianProfile | null;
}

export interface IBooking {
  id: string;
  price?: string;
  service?: {
    name: string;
    price: number;
  };

  customer?: {
    name: string;
    email: string;
  };

  technician?: {
    name: string;
  };

  scheduledAt: string;

  status:
    | "REQUESTED"
    | "ACCEPTED"
    | "PAID"
    | "IN_PROGRESS"
    | "COMPLETED"
    | "DECLINED";

  payment?: unknown;
}