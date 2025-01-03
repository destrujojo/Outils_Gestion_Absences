const useGestionsTableauBord = () => {
  const gestionsTableauBord = async (
    mail: string | null,
    classes: string | null,
    dateDebut: Date | null,
    dateFin: Date | null
  ) => {
    console.log(mail, classes, dateDebut, dateFin);
    try {
      const response = await fetch(
        "http://Localhost:5000/api/gestions/gestionsTableauBord",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            mail,
            classes,
            dateDebut,
            dateFin,
          }),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  };

  return { gestionsTableauBord };
};

export default useGestionsTableauBord;
