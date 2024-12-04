import { useState } from "react";
import { User } from "../auth/AuthContext";
import { MESSAGE_ERREUR_CONNEXION } from "../constante";

const useLogin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (mail: string, mdp: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail, mdp }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || MESSAGE_ERREUR_CONNEXION);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      let errorMsg = MESSAGE_ERREUR_CONNEXION;

      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          errorMsg = parsedError.message || MESSAGE_ERREUR_CONNEXION;
        } catch {
          errorMsg = error.message || MESSAGE_ERREUR_CONNEXION;
        }
      }
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, login };
};

export default useLogin;