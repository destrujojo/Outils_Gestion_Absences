// Fonction pour définir l'état d'authentification dans localStorage
export const setAuthStatus = (status: boolean) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
};

// Fonction pour obtenir l'état d'authentification depuis localStorage
export const getAuthStatus = (): boolean => {
  const status = localStorage.getItem("isAuthenticated");
  return status === "true";
};

// Fonction pour supprimer l'état d'authentification de localStorage
export const clearAuthStatus = () => {
  localStorage.removeItem("isAuthenticated");
};
