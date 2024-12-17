const useDepoFichiers = () => {
  const depoFichiers = async (fichier: File, mail: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/fichiers/fichierDepo",
        {
          method: "POST",
          body: fichier,
          headers: {
            "Content-Type": "multipart/form-data",
            mail: mail,
          },
        }
      );
      console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    }
  };
  return { depoFichiers };
};

export default useDepoFichiers;
