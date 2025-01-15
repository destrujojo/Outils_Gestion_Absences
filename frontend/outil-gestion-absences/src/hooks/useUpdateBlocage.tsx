const useUpdateBlocage = () => {
  const updateBlocage = async (tableau: []) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurUpdateBlocage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tableau }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(error);
    }
  };
  return { updateBlocage };
};

export default useUpdateBlocage;
