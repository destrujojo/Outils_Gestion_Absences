const useGetAllEtudiant = () => {
  const getAllEtudiant = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs//utilisateurFindsAll",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  return { getAllEtudiant };
};

export default useGetAllEtudiant;
