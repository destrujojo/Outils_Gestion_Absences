import React, { createContext, useContext, ReactNode } from "react";
import useSuiviTableauEtudiant from "../hooks/useSuiviTableauEtudiant";
import useSuiviTableauNotificationsEtudiant from "../hooks/useSuiviTableauNotificationsEtudiant";
import useSuiviTableauNotificationsAdmin from "../hooks/useSuiviTableauNotificationsAdmin";

interface AccueilServicesContexteType {
  gestionsTableauSuiviEtudiant: (
    mail: string,
    classes: string | null,
    dateDebut: Date | null,
    dateFin: Date | null
  ) => Promise<any>;
  gestionsTableauSuiviNotificationsEtudiant: (mail: string) => Promise<any>;
  gestionsTableauSuiviNotificationsAdmin: () => Promise<any>;
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
  const { suiviTableauNotificationsAdmin: getSuivieTableauNotificationAdmin } =
    useSuiviTableauNotificationsAdmin();

  const gestionsTableauSuiviEtudiant = async (
    mail: string,
    classes: string | null,
    dateDebut: Date | null,
    dateFin: Date | null
  ) => getsuivi(mail, classes, dateDebut, dateFin);

  const gestionsTableauSuiviNotificationsEtudiant = async (mail: string) =>
    getsuiviNotifications(mail);

  const gestionsTableauSuiviNotificationsAdmin = async () =>
    getSuivieTableauNotificationAdmin();

  return (
    <AccueilServicesContext.Provider
      value={{
        gestionsTableauSuiviEtudiant,
        gestionsTableauSuiviNotificationsEtudiant,
        gestionsTableauSuiviNotificationsAdmin,
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
