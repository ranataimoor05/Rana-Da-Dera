import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, UserRole, UserAddress } from '../types/auth';
import { storage } from '../utils/storage';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStaff: boolean;
  login: (emailOrPhone: string, role?: UserRole) => void;
  register: (fullName: string, email: string, phone: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  updateSavedAddress: (address: UserAddress) => void;
  switchRole: (role: UserRole) => void;
}

const defaultCustomerUser: UserProfile = {
  id: 'usr-101',
  fullName: 'Rana Taimoor',
  email: 'taimoor@ranadadera.com',
  phone: '0301-4431520',
  role: 'customer',
  loyaltyPoints: 340,
  createdAt: '2026-01-15',
  savedAddress: {
    id: 'addr-1',
    label: 'Home',
    addressLine: 'House 14, Street 3, Sector 1',
    zoneId: 'naseerabad',
    city: 'Rawalpindi',
    landmark: 'Near Dera Chowk',
    isDefault: true
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    return storage.get<UserProfile | null>('auth_user', defaultCustomerUser);
  });

  useEffect(() => {
    storage.set('auth_user', user);
  }, [user]);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'owner_admin';
  const isStaff = user?.role === 'owner_admin' || user?.role === 'manager' || user?.role === 'staff';

  const login = (emailOrPhone: string, role: UserRole = 'customer') => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      fullName: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Valued Guest',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'customer@ranadadera.com',
      phone: emailOrPhone.includes('@') ? '0301-4431520' : emailOrPhone,
      role,
      loyaltyPoints: 150,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
  };

  const register = (fullName: string, email: string, phone: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      fullName,
      email,
      phone,
      role: 'customer', // strictly customer for public registration
      loyaltyPoints: 100, // bonus welcome points
      createdAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    storage.remove('auth_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    setUser({ ...user, ...updates });
  };

  const updateSavedAddress = (address: UserAddress) => {
    if (!user) return;
    setUser({ ...user, savedAddress: address });
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({ ...user, role });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        isStaff,
        login,
        register,
        logout,
        updateProfile,
        updateSavedAddress,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
