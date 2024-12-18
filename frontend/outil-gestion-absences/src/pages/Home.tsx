import * as React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Modal, Tab, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useAccueilServices } from "../Context/AccueilServicesContext";
import TableauComponent from "../components/tableauComponent";
import FormulaireEtudiant from "../components/formulaireEtudiant";
import { format } from "date-fns";
import { getRole, getMail } from "../utils/authUtils";

const columns = [
  {
    id: "typesEvenements",
    label: "Type d'événement",
    minWidth: 100,
    align: "center" as "center",
  },
  {
    id: "statusGestions",
    label: "Status",
    minWidth: 100,
    align: "center" as "center",
  },
  {
    id: "commentaire",
    label: "Commentaire",
    minWidth: 200,
    align: "center" as "center",
  },
  {
    id: "date",
    label: "Date de début",
    minWidth: 100,
    align: "center" as "center",
  },
  { id: "duree", label: "Durée", minWidth: 100, align: "center" as "center" },
  {
    id: "idFichiers",
    label: "Fichiers",
    minWidth: 100,
    align: "center" as "center",
  },
];

export default function Home() {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const { gestionsTableauSuiviEtudiant } = useAccueilServices();
  const [donneesTableauEtudiant, setDonneesTableauEtudiant] = useState([]);

  React.useEffect(() => {
    recuperationDonneesTableauSuiviEtudiant();
  }, []);

  async function recuperationDonneesTableauSuiviEtudiant() {
    try {
      const result = await gestionsTableauSuiviEtudiant(
        "jonathan.roy@student.junia.com",
        null,
        null,
        null
      );
      result.forEach((element: any) => {
        element.date = format(new Date(element.date), "dd/MM/yyyy HH:mm");
      });

      console.log(getRole());
      console.log(result);
      setDonneesTableauEtudiant(result);
    } catch (error) {
      console.error(error);
    }
  }

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handleDateChange = (date: any) => {
    // Affiche la date sélectionnée dans la console
    console.log("Date sélectionnée :", date);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                    <Tab label="Notifications" value="2" />
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
                              value={new Date()}
                              onChange={handleDateChange}
                            />
                          </LocalizationProvider>
                        </div>
                      </div>
                      <div>
                        <TableauComponent
                          columns={columns}
                          rows={donneesTableauEtudiant}
                        />
                      </div>
                      <button
                        type="button"
                        className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={recuperationDonneesTableauSuiviEtudiant}
                      >
                        Test
                      </button>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="2"></TabPanel>
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
        <FormulaireEtudiant role={getRole()} mail={getMail()} />
      </Modal>
    </>
  );
}
