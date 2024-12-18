import { useCallback } from "react";

const useTelechargementFichiers = () => {
  const telechargementFichiers = useCallback(async (idFichiers: string) => {
    try {
      const fichier = await fetch(
        "http://localhost:5000/api/fichiers/fichiersFindsId",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idFichiers }),
        }
      );

      const fichierJson = await fichier.json();
      console.log(fichierJson);

      const response = await fetch(
        `http://localhost:5000/api/fichiers/fichierTelechargement/${idFichiers}`
      );

      if (!response.ok) {
        throw new Error("Erreur lors du téléchargement du fichier");
      }

      const blob = await response.blob(); // Récupérer le fichier sous forme de Blob
      console.log(response.json());

      const disposition = response.headers.get("Content-Disposition") || "";

      console.log("Nom du fichier :", fichierJson.nom);
      console.log(disposition);

      const url = window.URL.createObjectURL(blob); // Créer une URL pour le fichier
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fichierJson.nom); // Utiliser le nom extrait des en-têtes du serveur
      document.body.appendChild(link);
      link.click(); // Simuler le clic
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Libérer l'URL
    } catch (error: any) {
      console.error(
        "Erreur lors du téléchargement du fichier :",
        error.message
      );
      alert("Le téléchargement a échoué. Veuillez réessayer.");
    }
  }, []);

  return { telechargementFichiers };
};

export default useTelechargementFichiers;
