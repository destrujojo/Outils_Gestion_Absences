const useGetClasses = () => {
  const getClasses = async () => {
    try {
      const response = await fetch(
        "http://Localhost:5000/api/classes/classesFindsAll",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
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

  return { getClasses };
};

export default useGetClasses;
