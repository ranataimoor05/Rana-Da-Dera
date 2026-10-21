export type UserRole = 'customer' | 'owner_admin' | 'manager' | 'staff';

export interface UserAddress {
  id: string;
  label: string; // e.g. "Home", "Office"
  addressLine: string;
  zoneId: string;
  city: string;
  landmark?: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: UserRole;
  savedAddress?: UserAddress;
  loyaltyPoints: number;
  createdAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
