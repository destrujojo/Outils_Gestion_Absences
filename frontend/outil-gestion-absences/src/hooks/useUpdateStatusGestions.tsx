const useUpdateStatusGestions = () => {
  const updateStatusGestions = async (
    idGestions: string,
    status: string,
    message: string
  ) => {
    try {
      const response = await fetch(
        "http://Localhost:5000/api/gestions/updateStatusGestions",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idGestions,
            status,
            message,
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

  return { updateStatusGestions };
};

export default useUpdateStatusGestions;
