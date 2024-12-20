const useSuiviTableauNotificationsEtudiant = () => {
  const suiviTableauNotificationsEtudiant = async (mail: string) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications/tableauNotifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ mail }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      return await response.json();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return { suiviTableauNotificationsEtudiant };
};

export default useSuiviTableauNotificationsEtudiant;
