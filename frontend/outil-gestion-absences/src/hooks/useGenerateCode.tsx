import { useState } from "react";
import { MESSAGE_ERREUR_CONNEXION } from "../constante";

const useGenerateCode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateCode = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurUpdateCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || MESSAGE_ERREUR_CONNEXION);
      }
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

  return { loading, error, generateCode };
};

export default useGenerateCode;
