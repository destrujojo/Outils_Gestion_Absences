const useSuiviTableauNotificationsAdmin = () => {
  const suiviTableauNotificationsAdmin = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/notifications/tableauNotificationsAdmin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
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

  return { suiviTableauNotificationsAdmin };
};

export default useSuiviTableauNotificationsAdmin;
