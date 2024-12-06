import { createContext, useContext, useState } from "react";
import useLogin from "./../hooks/useLogin";
import useRegistration from "./../hooks/useRegistration";
import useVerifMail from "./../hooks/useVerifMail";
import useGenerateCode from "./../hooks/useGenerateCode";
import useResetCode from "./../hooks/useResetCode";
import useUpdateMdp from "./../hooks/useUpdateMdp";
import useVerifCode from "./../hooks/useVerifCode";
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
  isVerifMail: boolean;
  user: User | null;
  verifMailUser: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  verifMail: (email: string) => Promise<boolean>;
  generateCode: (email: string) => Promise<boolean>;
  resetCode: (email: string) => Promise<boolean>;
  updateMdp: (email: string, mdp: string) => Promise<boolean>;
  verifCode: (email: string, code: string) => Promise<boolean>;
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
  verifMailError: string | null;
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
  const {
    verifMail: verifMailHook,
    user: userVerifMail,
    loading: verifMailLoading,
    error: verifMailError,
  } = useVerifMail();
  const { generateCode: generateCodeHook } = useGenerateCode();
  const { resetCode: resetCodeHook } = useResetCode();
  const { updateMdp: updateMdpHook } = useUpdateMdp();
  const { verifCode: verifCodeHook, error: verifCodeError } = useVerifCode();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    getAuthStatus()
  );

  const [isVerifMail, setIsVerifMail] = useState<boolean>(false);

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

  const verifMail = async (email: string): Promise<boolean> => {
    try {
      await verifMailHook(email);
      if (verifMailError === null) {
        setIsVerifMail(true);
        return true;
      } else {
        setIsVerifMail(false);
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const generateCode = async (email: string): Promise<boolean> => {
    try {
      await generateCodeHook(email);
      return true;
    } catch (err) {
      return false;
    }
  };

  const verifCode = async (email: string, code: string): Promise<boolean> => {
    try {
      await verifCodeHook(email, code);
      console.log(verifCodeError);
      if (verifCodeError === null) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const resetCode = async (email: string): Promise<boolean> => {
    try {
      await resetCodeHook(email);
      return true;
    } catch (err) {
      return false;
    }
  };

  const updateMdp = async (email: string, mdp: string): Promise<boolean> => {
    try {
      await updateMdpHook(email, mdp);
      return true;
    } catch (err) {
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
        isVerifMail,
        user,
        verifMailUser: userVerifMail,
        generateCode,
        resetCode,
        updateMdp,
        verifCode,
        login,
        verifMail,
        register,
        logout,
        error: loginError,
        loading: loginLoading || registrationLoading || verifMailLoading,
        registrationError,
        verifMailError,
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
