export type ReservationStatus = 'pending' | 'confirmed' | 'cancelled' | 'seated' | 'completed';

export interface Reservation {
  id: string; // e.g. "RES-3821"
  customerName: string;
  phone: string;
  email?: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  guestCount: number;
  occasion: 'regular' | 'birthday' | 'anniversary' | 'business' | 'family_gathering';
  seatingPreference: 'indoor_royal' | 'outdoor_courtyard' | 'private_dining' | 'no_preference';
  specialRequests?: string;
  status: ReservationStatus;
  createdAt: string;
  isDemoBooking: boolean;
}
