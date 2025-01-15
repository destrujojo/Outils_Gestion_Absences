import * as React from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, StaticDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { useAccueilServices } from "../Context/AccueilServicesContext";
import useUpdateStatusGestions from "../hooks/useUpdateStatusGestions";
import TableauComponent from "../components/tableauComponent";
import FormulaireAdmin from "../components/formulaireAdmin";
import useGetAllEtudiant from "../hooks/useGetAllEtudiant";
import useGestionsTableauBord from "../hooks/useGestionsTableauBord";
import useGetClasses from "../hooks/useGetClasses";
import { format } from "date-fns";
import { getRole, getMail } from "../utils/authUtils";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import { TABLEAU_NOTIFICATION, TABLEAU_BORD } from "../constante";
import * as XLSX from "xlsx";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

export default function Home_Admin() {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [openGestions, setOpenGestions] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [nbNotificationsNLues, setNbNotificationsNLues] = useState(0);
  const { gestionsTableauSuiviNotificationsAdmin } = useAccueilServices();
  const { updateStatusGestions } = useUpdateStatusGestions();
  const { getAllEtudiant } = useGetAllEtudiant();
  const { gestionsTableauBord } = useGestionsTableauBord();
  const { getClasses } = useGetClasses();

  const [filtreTableauBord, setFiltreTableauBord] = useState(false);
  const [idGestions, setIdGestions] = useState("");
  const [status, setStatus] = useState("");

  const [donneesNotifications, setDonneesNotifications] = useState([]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [commentaire, setCommentaire] = useState("");
  const [utilisateurs, setUtilisateurs] = React.useState<any[]>([]);
  const [classes, setClasses] = React.useState<any[]>([]);
  const [tableauBord, setTableauBord] = React.useState<any[]>([]);
  const [tableauBordUtilisateur, setTableauBordUtilisateur] = useState<
    string | null
  >(null);
  const [tableauBordClasse, setTableauBordClasse] = useState<string | null>(
    null
  );
  const [tableauBordDateDebut, setTableauBordDateDebut] = useState<Date | null>(
    null
  );
  const [tableauBordDateFin, setTableauBordDateFin] = useState<Date | null>(
    null
  );

  const [excel, setExcel] = useState<any[]>([]);
  const [fichier, setFichier] = useState<File>();

  React.useEffect(() => {
    const fetchUtilisateurs = async () => {
      try {
        const data = await getAllEtudiant();

        // Transformation si nécessaire
        const utilisateursArray = Array.isArray(data) ? data : [data];
        setUtilisateurs(utilisateursArray);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
      }
    };

    const fetchClasses = async () => {
      try {
        const data = await getClasses();

        // Transformation si nécessaire
        const classesArray = Array.isArray(data) ? data : [data];
        setClasses(classesArray);
      } catch (error) {
        console.error("Erreur lors de la récupération des classes :", error);
      }
    };

    recuperationNbNotificationNLues();
    getTableauBord();
    fetchUtilisateurs();
    fetchClasses();
  }, []);

  React.useEffect(() => {
    switch (value) {
      case "1":
        getTableauBord();
        break;
      case "2":
        break;
      case "3":
        recuperationDonneesTableauNotifications();
        break;
      case "4":
        break;
    }
  }, [
    value,
    tableauBordUtilisateur,
    tableauBordClasse,
    tableauBordDateDebut,
    tableauBordDateFin,
  ]);

  React.useEffect(() => {
    if (donneesNotifications.length > 0) {
      recuperationNbNotificationNLues();
    }
    if (openGestions === false) {
      setIdGestions("");
      setStatus("");
    }
  }, [donneesNotifications, openGestions]);

  async function lectureExel() {
    if (!fichier) {
      console.error("Aucun fichier sélectionné !");
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const target = event.target as FileReader;
      if (target) {
        const binaryStr = target.result;
        const workbook = XLSX.read(binaryStr, { type: "binary" });

        // Supposons que vous prenez la première feuille
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Convertir les données de la feuille en JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const Data = jsonData.slice(1);

        console.log(Data);

        setExcel(Data); // Mettre à jour l'état
      }
    };

    reader.onerror = () => {
      console.error("Erreur lors de la lecture du fichier !");
    };

    reader.readAsBinaryString(fichier);
  }

  async function recuperationDonneesTableauNotifications() {
    try {
      setChargement(true);
      const result = await gestionsTableauSuiviNotificationsAdmin();
      result.forEach((element: any) => {
        element.date = format(new Date(element.date), "dd/MM/yyyy HH:mm");
      });
      // console.log(result);

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
    return;
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

  const handleCloseGestions = () => {
    setOpenGestions(false);
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
    handleOpen();
  };

  const handleRetourGestions = () => {
    handleClose();
  };

  const handleStatusGestions = async (idGestions: string, status: string) => {
    setIdGestions(idGestions);
    setStatus(status);
    setOpenGestions(true);
  };

  const handleStatusEvenement = async () => {
    await updateStatusGestions(idGestions, status, status + "" + commentaire);
    // console.log("le resultat " + result);
    await recuperationDonneesTableauNotifications();
    setCommentaire("");
    setOpenGestions(false);
    // console.log("Modification du status de l'événement");
  };

  const getTableauBord = async () => {
    try {
      setChargement(true);
      const result = await gestionsTableauBord(
        tableauBordUtilisateur,
        tableauBordClasse,
        tableauBordDateDebut,
        tableauBordDateFin
      );
      result.forEach((element: any) => {
        element.date = format(new Date(element.date), "dd/MM/yyyy HH:mm");
      });
      setTableauBord(result);
    } catch (error) {
      console.error(error);
    } finally {
      setChargement(false);
    }
  };

  const gérerSélectionFichier = async () => {
    try {
      const entrée = document.createElement("input");
      entrée.type = "file";
      entrée.accept = ".xlx, .xlsx"; // Extensions autorisées
      entrée.onchange = (événement: Event) => {
        const cible = événement.target as HTMLInputElement;
        if (cible?.files?.[0]) {
          const fichier = cible.files[0];
          setFichier(fichier);
        }
      };
      entrée.click();
    } catch (erreur) {
      console.error("Erreur lors de la sélection du fichier :", erreur);
    }
  };

  const gérerSuppressionFichier = () => {
    setFichier(undefined);
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
                <TabPanel value="1">
                  <div className="items-center justify-center p-12 bg-lightPurple">
                    {filtreTableauBord ? (
                      <>
                        <Button
                          className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          onClick={() =>
                            setFiltreTableauBord(!filtreTableauBord)
                          }
                        >
                          <FilterAltOffIcon />
                        </Button>
                        <div className="flex flex-row items-center justify-center">
                          <FormControl sx={{ m: 1 }} fullWidth>
                            <InputLabel id="comboEleve">élève</InputLabel>
                            <Select
                              id="comboEleve"
                              value={tableauBordUtilisateur}
                              onChange={(
                                event: SelectChangeEvent<string | null>
                              ) =>
                                setTableauBordUtilisateur(event.target.value)
                              }
                              autoWidth
                              label="élève"
                              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                              <MenuItem value="">Tous les étudiant</MenuItem>
                              {utilisateurs.map((utilisateur) => (
                                <MenuItem value={utilisateur.mail}>
                                  {utilisateur.nom} {utilisateur.prenom}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl sx={{ m: 1 }} fullWidth>
                            <InputLabel id="comboClasse">classe</InputLabel>
                            <Select
                              id="comboClasse"
                              value={tableauBordClasse}
                              onChange={(
                                event: SelectChangeEvent<string | null>
                              ) => setTableauBordClasse(event.target.value)}
                              autoWidth
                              label="classe"
                              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            >
                              <MenuItem value="">Toute les classes</MenuItem>
                              {classes.map((classe) => (
                                <MenuItem value={classe.classes}>
                                  {classe.classes}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Date Début"
                              value={tableauBordDateDebut}
                              format="dd/MM/yyyy"
                              onChange={(newValue) =>
                                setTableauBordDateDebut(newValue)
                              }
                              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            />
                          </LocalizationProvider>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              label="Date Fin"
                              value={tableauBordDateFin}
                              format="dd/MM/yyyy"
                              onChange={(newValue) =>
                                setTableauBordDateFin(newValue)
                              }
                              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                            />
                          </LocalizationProvider>
                        </div>
                      </>
                    ) : (
                      <Button
                        className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setFiltreTableauBord(!filtreTableauBord)}
                      >
                        <FilterAltIcon />
                      </Button>
                    )}
                  </div>
                  <div>
                    {chargement ? (
                      <p>Chargement des données...</p>
                    ) : (
                      <TableauComponent
                        columns={TABLEAU_BORD}
                        rows={tableauBord}
                      />
                    )}
                  </div>
                </TabPanel>
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
                          columns={TABLEAU_NOTIFICATION}
                          rows={donneesNotifications}
                          onStatusChange={handleStatusGestions}
                        />
                      )}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel value="4">
                  <div className="flex flex-grow items-center justify-center pt-24 bg-lightPurple">
                    <div className="flex flex-col items-center justify-center">
                      <h1 className="text-4xl font-bold text-center text-darkBlue">
                        Intégration
                      </h1>
                      <DownloadIcon
                        onClick={gérerSélectionFichier}
                        sx={{ cursor: "pointer", color: "blue" }}
                      />
                      {fichier?.name && (
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body2">
                            {fichier.name}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={gérerSuppressionFichier}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                      <Button
                        className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={lectureExel}
                      >
                        Valider
                      </Button>
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
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <TextField
            id="CommentaireRetard"
            label="Commentaire"
            multiline
            maxRows={4}
            value={commentaire}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setCommentaire(event.target.value)
            }
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          />
          <div>
            <Button
              className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={handleStatusEvenement}
            >
              Valider
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}
