const useGetTypesEvenements = () => {
  const getTypesEvenements = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/typesEvenements/typesEvenementFindsAll",
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
  return { getTypesEvenements };
};

export default useGetTypesEvenements;
