import { useState } from "react";

const useSuiviTableauEtudiant = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSuiviTableauEtudiant = async (
    mail: string,
    classes: string | null,
    dateDebut: string | null,
    dateFin: string | null
  ) => {
    setLoading(true);
    setError(null);
    console.log(mail, classes, dateDebut);

    try {
      const response = await fetch(
        "http://localhost:5000/api/gestions/gestionsTableauSuiviEtudiant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail, classes, dateDebut, dateFin }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, getSuiviTableauEtudiant };
};

export default useSuiviTableauEtudiant;
