const useCreationEvenement = () => {
  const creationEvenement = async (
    mail: string,
    typeEvenements: string,
    notificationMessage: string,
    evenementsMessage: string,
    evenementsDate: Date,
    evenementsDuree: string,
    fichier: File
  ) => {
    try {
      const formData = new FormData();
      formData.append("fichier", fichier); // Le fichier doit correspondre au nom défini dans `upload.single("fichier")`
      formData.append("mail", mail);
      formData.append("typeEvenements", typeEvenements);
      formData.append("notificationMessage", notificationMessage);
      formData.append("evenementsMessage", evenementsMessage);
      formData.append("evenementsDate", evenementsDate.toISOString());
      formData.append("evenementsDuree", evenementsDuree);

      const response = await fetch(
        "http://localhost:5000/api/gestions/gestionsCreationEvenements",
        {
          method: "POST",
          body: formData, // FormData gère automatiquement les en-têtes
        }
      );
      console.log(response);
      const data = await response.json();
      return data;
    } catch (error) {}
  };

  return { creationEvenement };
};

export default useCreationEvenement;
