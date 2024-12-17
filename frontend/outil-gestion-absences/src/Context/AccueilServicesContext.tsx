import React, { createContext, useContext, ReactNode } from "react";
import useSuiviTableauEtudiant from "../hooks/useSuiviTableauEtudiant";

interface AccueilServicesContexteType {
  gestionsTableauSuiviEtudiant: (
    mail: string,
    classes: string | null,
    dateDebut: string | null,
    dateFin: string | null
  ) => Promise<any>;
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

  const gestionsTableauSuiviEtudiant = async (
    mail: string,
    classes: string | null,
    dateDebut: string | null,
    dateFin: string | null
  ) => getsuivi(mail, classes, dateDebut, dateFin);

  return (
    <AccueilServicesContext.Provider
      value={{
        gestionsTableauSuiviEtudiant,
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
