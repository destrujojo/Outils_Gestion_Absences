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
import FormulaireAdmin from "../components/formulaireAdmin";
import { format, set } from "date-fns";
import { getRole, getMail } from "../utils/authUtils";

const colonneTableauNotifications = [
  {
    id: "idNotifications",
    label: "idNotifications",
  },
  {
    id: "idGestions",
    label: "idGestions",
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
    id: "statusGestions",
    label: "Etat Evenement",
    minWidth: 200,
  },
  {
    id: "statusGestions",
    label: "Validation",
    minWidth: 100,
  },
];

export default function Home_Admin() {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [openGestions, setOpenGestions] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [nbNotificationsNLues, setNbNotificationsNLues] = useState(0);
  const { gestionsTableauSuiviNotificationsAdmin } = useAccueilServices();
  const { updateStatusNotifications } = useStatusNotifications();

  const [donneesNotifications, setDonneesNotifications] = useState([]);

  const [dateDebut, setDateDebut] = useState<Date | null>(null); // Date de début
  const [dateFin, setDateFin] = useState<Date | null>(null); // Date de fin
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  React.useEffect(() => {
    recuperationNbNotificationNLues();
  }, []);

  React.useEffect(() => {
    if (value === "3") {
      recuperationDonneesTableauNotifications();
    }
  }, [value]);

  React.useEffect(() => {
    if (donneesNotifications.length > 0) {
      recuperationNbNotificationNLues();
    }
  }, [donneesNotifications]);

  async function recuperationDonneesTableauNotifications() {
    try {
      setChargement(true);
      const result = await gestionsTableauSuiviNotificationsAdmin();
      result.forEach((element: any) => {
        element.date = format(new Date(element.date), "dd/MM/yyyy HH:mm");
      });

      setDonneesNotifications(result);
    } catch (error) {
      console.error(error);
    } finally {
      setChargement(false);
    }
  }

  async function recuperationNbNotificationNLues() {
    try {
      const notifications = await gestionsTableauSuiviNotificationsAdmin();
      const nbNotifications = notifications.filter(
        (notification: any) => notification.statusGestions === "En attente"
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

  const handleOpenGestions = () => {
    setOpenGestions(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseGestions = () => {
    setOpenGestions(false);
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
  };

  const handleStatusNotifications = async (
    idNotifications: string,
    statusNotifications: string
  ) => {
    // Implémentez la logique de mise à jour du statut ici
    await updateStatusNotifications(idNotifications, statusNotifications);
    await recuperationDonneesTableauNotifications();
  };

  const handleStatusGestions = async (idGestions: string, status: string) => {
    // Implémentez la logique de mise à jour du statut ici
    // await updateStatusNotifications(idGestions, status);
    // await recuperationDonneesTableauNotifications();
    setOpenGestions(true);
  };

  return (
    <>
      <div className="flex min-h-screen flex-grow items-center justify-center pt-24 bg-lightOrange">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-darkBlue">
            Bienvenue sur l'outil d'administration des absences
          </h1>
          <div className="w-full bg-white p-8 mb-14 rounded-lg shadow-lg">
            <div className="flex flex-col items-center justify-center">
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="Tableau de bord" value="1"></Tab>
                    <Tab label="Déclarations" value="2" />
                    <Tab
                      label={`Notifications (${nbNotificationsNLues})`}
                      value="3"
                    />
                    <Tab label="Intégration" value="4"></Tab>
                  </TabList>
                </Box>
                <TabPanel value="1">Item 1</TabPanel>
                <TabPanel value="2">
                  <div className="flex flex-grow items-center justify-center p-12 bg-lightPurple">
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
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div className="flex flex-grow items-center justify-center pt-24 bg-lightPurple">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-4xl font-bold text-center text-darkBlue">
                        Notifications
                      </h1>
                      {chargement ? (
                        <p>Chargement des données...</p>
                      ) : (
                        <TableauComponent
                          columns={colonneTableauNotifications}
                          rows={donneesNotifications}
                          onStatusChange={handleStatusGestions}
                        />
                      )}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="4">Item Four</TabPanel>
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
        <FormulaireAdmin
          role={getRole()}
          mail={getMail()}
          date={selectedDate}
          onRetourGestions={handleRetourGestions}
        />
      </Modal>

      <Modal
        open={openGestions}
        onClose={handleCloseGestions}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex flex-grow items-center justify-center pt-24 bg-lightPurple">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center text-darkBlue">
              Gestion des absences
            </h1>
            <Button
              className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleCloseGestions}
            >
              Retour
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
