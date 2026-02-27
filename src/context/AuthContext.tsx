import React, { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  email: string;
  age: number;
  points: number;
  streak: number;
  level: 'Seed' | 'Root' | 'Leaf' | 'Bloom' | 'Crown';
  scratchCoupons: number;
  preferences: {
    relationships: string[];
    moods: string[];
  };
  badges: string[];
};

type AuthContextType = {
  user: User | null;
  login: (age?: number) => void;
  logout: () => void;
  addPoints: (points: number) => void;
  useScratchCoupon: () => void;
  isAdult: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (age: number = 25) => {
    setUser({
      id: '1',
      name: 'Invitado VIP',
      email: 'vip@ohawell.com',
      age: age,
      points: 150,
      streak: 3,
      level: 'Leaf',
      scratchCoupons: 2,
      preferences: {
        relationships: ['pareja', 'amigos'],
        moods: ['Awaken', 'Calm'],
      },
      badges: ['Quiet Mind', 'Morning Flame'],
    });
  };

  const logout = () => setUser(null);

  const addPoints = (points: number) => {
    if (user) {
      setUser({ ...user, points: user.points + points });
    }
  };

  const useScratchCoupon = () => {
    if (user && user.scratchCoupons > 0) {
      setUser({ ...user, scratchCoupons: user.scratchCoupons - 1 });
    }
  };

  const isAdult = user ? user.age >= 18 : false;

  return (
    <AuthContext.Provider value={{ user, login, logout, addPoints, useScratchCoupon, isAdult }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
