const useGetEtudiant = () => {
  const getEtudiant = async (mail: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurFindsEmailEtudiant",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return { getEtudiant };
};

export default useGetEtudiant;