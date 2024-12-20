import React, { createContext, useContext, ReactNode } from "react";
import useSuiviTableauEtudiant from "../hooks/useSuiviTableauEtudiant";
import useSuiviTableauNotificationsEtudiant from "../hooks/useSuiviTableauNotificationsEtudiant";

interface AccueilServicesContexteType {
  gestionsTableauSuiviEtudiant: (
    mail: string,
    classes: string | null,
    dateDebut: Date | null,
    dateFin: Date | null
  ) => Promise<any>;
  gestionsTableauSuiviNotificationsEtudiant: (mail: string) => Promise<any>;
}

const AccueilServicesContext = createContext<
  AccueilServicesContexteType | undefined
>(undefined);

export const AccueilServicesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { getSuiviTableauEtudiant: getsuivi } = useSuiviTableauEtudiant();
  const { suiviTableauNotificationsEtudiant: getsuiviNotifications } =
    useSuiviTableauNotificationsEtudiant();

  const gestionsTableauSuiviEtudiant = async (
    mail: string,
    classes: string | null,
    dateDebut: Date | null,
    dateFin: Date | null
  ) => getsuivi(mail, classes, dateDebut, dateFin);

  const gestionsTableauSuiviNotificationsEtudiant = async (mail: string) =>
    getsuiviNotifications(mail);

  return (
    <AccueilServicesContext.Provider
      value={{
        gestionsTableauSuiviEtudiant,
        gestionsTableauSuiviNotificationsEtudiant,
      }}
    >
      {children}
    </AccueilServicesContext.Provider>
  );
};

export const useAccueilServices = () => {
  const context = useContext(AccueilServicesContext);
  if (context === undefined) {
    throw new Error(
      "useAccueilServices must be used within a AccueilServicesProvider"
    );
  }
  return context;
};
