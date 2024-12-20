import * as React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Modal, Tab } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useAccueilServices } from "../Context/AccueilServicesContext";
import useStatusNotifications from "../hooks/useUpdateStatusNotifications";
import TableauComponent from "../components/tableauComponent";
import FormulaireEtudiant from "../components/formulaireEtudiant";
import { format, set } from "date-fns";
import { getRole, getMail } from "../utils/authUtils";
import { id } from "date-fns/locale";

const colonneTableauEtudiant = [
  {
    id: "typesEvenements",
    label: "Type d'événement",
    minWidth: 100,
  },
  {
    id: "statusGestions",
    label: "Status",
    minWidth: 100,
  },
  {
    id: "commentaire",
    label: "Commentaire",
    minWidth: 200,
  },
  {
    id: "date",
    label: "Date de début",
    minWidth: 100,
  },
  { id: "duree", label: "Durée", minWidth: 100, align: "center" as "center" },
  {
    id: "idFichiers",
    label: "Fichiers",
    minWidth: 100,
  },
];

const colonneTableauNotifications = [
  {
    id: "idNotifications",
    label: "idNotifications",
  },
  {
    id: "typesEvenements",
    label: "Type d'événement",
    minWidth: 100,
  },
  {
    id: "date",
    label: "Date",
    minWidth: 100,
  },
  {
    id: "commentaire",
    label: "Commentaire",
    minWidth: 200,
  },
  {
    id: "message",
    label: "Notification",
    minWidth: 200,
  },
  {
    id: "statusNotifications",
    label: "Status",
    minWidth: 100,
  },
];

export default function Home() {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [nbNotificationsNLues, setNbNotificationsNLues] = useState(0);
  const [actualisationForcer, setActualisationForcer] = useState(0);
  const {
    gestionsTableauSuiviEtudiant,
    gestionsTableauSuiviNotificationsEtudiant,
  } = useAccueilServices();
  const { updateStatusNotifications } = useStatusNotifications();

  const [donneesTableauEtudiant, setDonneesTableauEtudiant] = useState([]);
  const [donneesNotifications, setDonneesNotifications] = useState([]);

  const [dateDebut, setDateDebut] = useState<Date | null>(null); // Date de début
  const [dateFin, setDateFin] = useState<Date | null>(null); // Date de fin
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  React.useEffect(() => {
    recuperationDonneesTableauSuiviEtudiant();
    recuperationNbNotificationNLues();
  }, []);

  React.useEffect(() => {
    if (value === "2") {
      recuperationDonneesTableauNotifications();
    }
  }, [value]);

  React.useEffect(() => {
    recuperationDonneesTableauSuiviEtudiant();
  }, [dateDebut, dateFin]);

  React.useEffect(() => {
    if (donneesNotifications.length > 0) {
      // recuperationDonneesTableauNotifications();
      setActualisationForcer((prev) => prev + 1);
      recuperationNbNotificationNLues();
    }
  }, [donneesNotifications]);

  async function recuperationDonneesTableauSuiviEtudiant() {
    try {
      const result = await gestionsTableauSuiviEtudiant(
        getMail(),
        null,
        dateDebut,
        dateFin
      );
      result.forEach((element: any) => {
        element.date = format(new Date(element.date), "dd/MM/yyyy HH:mm");
      });

      // console.log(getRole());
      setDonneesTableauEtudiant(result);
    } catch (error) {
      console.error(error);
    }
  }

  async function recuperationDonneesTableauNotifications() {
    try {
      setChargement(true);
      const result = await gestionsTableauSuiviNotificationsEtudiant(getMail());
      result.forEach((element: any) => {
        element.date = format(new Date(element.date), "dd/MM/yyyy HH:mm");
      });

      // console.log(getRole());
      setDonneesNotifications(result);
      // setActualisationForcer((prev) => prev + 1);
    } catch (error) {
      console.error(error);
    } finally {
      setChargement(false);
    }
  }

  async function recuperationNbNotificationNLues() {
    try {
      const notifications = await gestionsTableauSuiviNotificationsEtudiant(
        getMail()
      );
      const nbNotifications = notifications.filter(
        (notification: any) => notification.statusNotifications === "Non lue"
      ).length;
      setNbNotificationsNLues(nbNotifications);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    handleOpen();
  };
  const handleMoisChange = (newDate: Date | null) => {
    if (newDate) {
      // Calcul de la plage du mois
      const startOfMonth = new Date(
        newDate.getFullYear(),
        newDate.getMonth(),
        1,
        0,
        0
      );
      const endOfMonth = new Date(
        newDate.getFullYear(),
        newDate.getMonth() + 1,
        0,
        23,
        59
      );

      // Mise à jour des états
      setDateDebut(startOfMonth);
      setDateFin(endOfMonth);
    }
  };

  const handleRetourGestions = () => {
    handleClose();
    recuperationDonneesTableauSuiviEtudiant();
  };

  const handleStatusNotifications = async (
    idNotifications: string,
    statusNotifications: string
  ) => {
    // Implémentez la logique de mise à jour du statut ici
    await updateStatusNotifications(idNotifications, statusNotifications);
    await recuperationDonneesTableauNotifications();
  };

  return (
    <>
      <div className="flex min-h-screen flex-grow items-center justify-center pt-24 bg-lightOrange">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-darkBlue">
            Bienvenue sur l'outil de gestion des absences
          </h1>
          <div className="w-full max-w-md bg-white p-8 mb-14 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Déclarations" value="1" />
                    <Tab
                      label={`Notifications (${nbNotificationsNLues})`}
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <div className="flex flex-grow items-center justify-center pt-24 bg-lightPurple">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-4xl font-bold text-center text-darkBlue">
                        Déclaration d'absence
                      </h1>
                      <Button
                        className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleOpen}
                      >
                        Formulaire Déclaration
                      </Button>
                      <div items-center justify-center>
                        <div>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <StaticDatePicker
                              displayStaticWrapperAs="desktop"
                              openTo="day"
                              value={selectedDate}
                              onChange={(newDate) => handleDateChange(newDate)}
                              onMonthChange={handleMoisChange}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div>
                        <TableauComponent
                          columns={colonneTableauEtudiant}
                          rows={donneesTableauEtudiant}
                        />
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="flex flex-grow items-center justify-center pt-24 bg-lightPurple">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-4xl font-bold text-center text-darkBlue">
                        Notifications
                      </h1>
                      {chargement ? (
                        <p>Chargement des données...</p>
                      ) : (
                        <TableauComponent
                          key={actualisationForcer}
                          columns={colonneTableauNotifications}
                          rows={donneesNotifications}
                          onStatusChange={handleStatusNotifications}
                        />
                      )}
                    </div>
                  </div>
                </TabPanel>
              </TabContext>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormulaireEtudiant
          role={getRole()}
          mail={getMail()}
          date={selectedDate}
          onRetourGestions={handleRetourGestions}
        />
      </Modal>
    </>
  );
}
