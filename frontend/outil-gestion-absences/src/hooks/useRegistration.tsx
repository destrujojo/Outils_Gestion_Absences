import { useState } from "react";
import { User } from "../auth/AuthContext";
import { MESSAGE_ERREUR_INSCRIPTION } from "../constante";

const useRegistration = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    prenom: string,
    nom: string,
    mail: string,
    mdp: string,
    classes: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurCreate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prenom,
            nom,
            mail,
            mdp,
            classes,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || MESSAGE_ERREUR_INSCRIPTION);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      let errorMsg = MESSAGE_ERREUR_INSCRIPTION;

      if (error instanceof Error) {
        try {
          const parsedError = JSON.parse(error.message);
          errorMsg = parsedError.message || MESSAGE_ERREUR_INSCRIPTION;
        } catch {
          errorMsg = error.message || MESSAGE_ERREUR_INSCRIPTION;
        }
      }

      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, error, register };
};

export default useRegistration;
