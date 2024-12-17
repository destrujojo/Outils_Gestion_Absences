// Fonction pour définir l'état d'authentification dans localStorage
export const setAuthStatus = (status: boolean) => {
  localStorage.setItem("isAuthenticated", JSON.stringify(status));
};

// Fonction pour définir le role de l'utilisateur dans localStorage
export const setRole = (role: string) => {
  localStorage.setItem("role", role);
};

// Fonction pour définir le mail de l'utilisateur dans localStorage
export const setMail = (mail: string) => {
  localStorage.setItem("mail", mail);
};

// Fonction pour obtenir l'état d'authentification depuis localStorage
export const getAuthStatus = (): boolean => {
  const status = localStorage.getItem("isAuthenticated");
  return status === "true";
};

// Fontion pour obtenir le role de l'utilisateur depuis localStorage
export const getRole = (): string => {
  const role = localStorage.getItem("role");
  return role || "";
};

// Fonction pour obtenir le mail de l'utilisateur depuis localStorage
export const getMail = (): string => {
  const mail = localStorage.getItem("mail");
  return mail || "";
};

// Fonction pour supprimer l'état d'authentification de localStorage
export const clearAuthStatus = () => {
  localStorage.removeItem("isAuthenticated");
};

// Fonction pour supprimer le role de l'utilisateur de localStorage
export const clearRole = () => {
  localStorage.removeItem("role");
};

// Fonction pour supprimer le mail de l'utilisateur de localStorage
export const clearMail = () => {
  localStorage.removeItem("mail");
};
