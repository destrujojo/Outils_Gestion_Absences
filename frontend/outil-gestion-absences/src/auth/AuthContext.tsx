import { createContext, useContext, useState } from "react";
import useLogin from "./../hooks/useLogin";
import useRegistration from "./../hooks/useRegistration";
import { setAuthStatus, getAuthStatus } from "../utils/authUtils";

export interface User {
  IdUser: number;
  IdRole: string;
  Name: string;
  Surname: string;
  Email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    classes: string
  ) => Promise<boolean>;
  logout: () => void;
  error: string | null;
  loading: boolean;
  registrationError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    user,
    loading: loginLoading,
    error: loginError,
    login: loginRequest,
  } = useLogin();
  const {
    loading: registrationLoading,
    error: registrationError,
    register: registerRequest,
  } = useRegistration();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getAuthStatus()
  );

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      await loginRequest(email, password);
      setIsAuthenticated(true);
      setAuthStatus(true);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    classes: string
  ): Promise<boolean> => {
    try {
      await registerRequest(firstName, lastName, email, password, classes);
      setIsAuthenticated(true);
      setAuthStatus(true);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthStatus(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        register,
        logout,
        error: loginError,
        loading: loginLoading || registrationLoading,
        registrationError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
