import { useCallback } from "react";

const useTelechargementFichiers = () => {
  const telechargementFichiers = useCallback(async (idFichiers: string) => {
    const url = `http://localhost:5000/api/fichiers/fichierTelechargement/${idFichiers}`;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return { telechargementFichiers };
};

export default useTelechargementFichiers;
