import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { gql } from '@apollo/client/core';
import { apolloClient } from '@/lib/apollo';

// GraphQL Login Mutation
const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        nome_completo
        email
        tipo_colaborador
        telefone
      }
    }
  }
`;

interface User {
  id: number;
  nome: string;
  email: string;
  tipo: string;
  telefone?: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing token and user data on app load
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (token && savedUser) {
        try {
          // Parse saved user data
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          
          // Note: GraphQL health check would go here if needed
          // For now, we trust the stored token
        } catch (error) {
          // Invalid saved data, clear everything
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const result = await apolloClient.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          input: {
            email,
            senha: password
          }
        }
      });

      const { token, user: userData } = (result.data as { login: LoginResponse }).login;

      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));

      setIsAuthenticated(true);
      setUser(userData);
      return true;
    } catch (error: any) {
      console.error('Login failed:', error);
      // Return false for invalid credentials
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
