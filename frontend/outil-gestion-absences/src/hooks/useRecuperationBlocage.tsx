const useRecuperationBlocage = () => {
  const recuperationBlocage = async (mail: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurRecuperationBlocage",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail: mail }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(error);
    }
  };

  return { recuperationBlocage };
};

export default useRecuperationBlocage;
