import { useState } from "react";
import { MESSAGE_ERREUR_CONNEXION } from "../constante";

const useVerifCode = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const verifCode = async (email: string, code: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurVerifCode",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, code }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || MESSAGE_ERREUR_CONNEXION);
      }

      const data = await response.json();
      if (data === null) {
        throw new Error("Utilisateur non trouvé");
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

  return { loading, error, verifCode };
};

export default useVerifCode;
