
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type AuthProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  username: string;
  email?: string;
  avatar?: string;
  authProvider: 'discord' | 'twitter' | 'google' | 'wallet';
  points: number;
  premium: boolean;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (provider: 'discord' | 'twitter' | 'google' | 'wallet') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        // Simulate loading from session/localStorage
        setTimeout(() => {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Session check failed:", error);
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (provider: 'discord' | 'twitter' | 'google' | 'wallet') => {
    // Simulate authentication process
    setIsLoading(true);
    try {
      // In a real implementation, this would connect to the authentication provider
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      
      // Sample user data after successful auth
      const mockUser: User = {
        id: `user-${Math.random().toString(36).substring(2, 9)}`,
        username: `traveler_${Math.floor(Math.random() * 1000)}`,
        avatar: "https://ui-avatars.com/api/?name=Travel+User&background=random",
        authProvider: provider,
        points: 0,
        premium: false
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
    } catch (error) {
      console.error(`${provider} login failed:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
