const useStatusNotifications = () => {
  const updateStatusNotifications = async (
    idNotifications: string,
    statusNotifications: string
  ) => {
    try {
      const response = await fetch(
        "http://Localhost:5000/api/notifications/updateStatusNotifications",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idNotifications,
            statusNotifications,
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

  return { updateStatusNotifications };
};

export default useStatusNotifications;
