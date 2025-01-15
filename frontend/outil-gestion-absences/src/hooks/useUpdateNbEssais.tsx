const useUpdateNbEssais = () => {
  const updateNbEssais = async (
    mail: string,
    nbEssais: number,
    etat: string
  ) => {
    console.log(mail, nbEssais, etat);
    try {
      const response = await fetch(
        "http://localhost:5000/api/utilisateurs/utilisateurUpdateNbEssais",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail, nbEssais, etat }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error(error);
    }
  };

  return { updateNbEssais };
};

export default useUpdateNbEssais;
