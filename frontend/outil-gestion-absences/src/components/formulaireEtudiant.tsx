import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect, ChangeEvent } from "react";
import useGetEtudiant from "../hooks/useGetEtudiant";
import useGetTypesEvenements from "../hooks/useGetTypesEvenements";
import useCreationEvenement from "../hooks/useCreationEvenement";
import useDepoFichiers from "../hooks/useDepoFichiers";
import { DateTimeField } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";

// Définir le type des utilisateurs
interface Utilisateur {
  idClasses: string;
  idRoles: string;
  mail: string;
  nbAbsences: number;
  nbRetards: number;
  nbEssais: number;
  nom: string;
  prenom: string;
}

interface typeEvenement {
  idTypesEvenements: string;
  typesEvenements: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface FormulairePropTypes {
  mail: string;
  role: string;
}

const FormulaireEtudiant: React.FC<FormulairePropTypes> = ({ mail }) => {
  const [disableNomPrenom, setDisableNomPrenom] = useState<boolean>(false);
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [localError, setLocalError] = useState("");
  const [retourGestions, setRetourGestions] = useState<[] | null>(null);

  const [typeEvenement, setTypeEvenement] = useState<typeEvenement[]>([]);
  const [selectionEvenement, setSelectionEvenement] = useState<string>("");

  const [dateDebut, setDateDebut] = useState<Date | null>(null);
  const [selectedDemiJournee, setSelectedDemiJournee] = useState<string>("");
  const [selectedJournee, setSelectedJournee] = useState<string>("");
  const [commentaire, setCommentaire] = useState<string>("");
  const [duree, setDuree] = useState<string>("");

  // const [cheminFichier, setCheminFichier] = useState<string | null>(null);
  // const [nomFichier, setNomFichier] = useState<string | null>(null);

  const [fichier, setFichier] = useState<File>();

  const { getEtudiant } = useGetEtudiant();
  const { getTypesEvenements } = useGetTypesEvenements();
  const { creationEvenement } = useCreationEvenement();
  const { depoFichiers } = useDepoFichiers();

  // Charger les utilisateurs depuis l'API
  useEffect(() => {
    setIsLoading(true);
    const fetchUtilisateurs = async () => {
      try {
        setError(null);
        const data = await getEtudiant(mail);

        // Transformation si nécessaire
        const utilisateursArray = Array.isArray(data) ? data : [data];
        setUtilisateurs(utilisateursArray);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        setError(
          "Une erreur est survenue lors de la récupération des utilisateurs."
        );
      }
    };

    const fetchTypesEvenements = async () => {
      try {
        const data = await getTypesEvenements();
        const typeEvenementArray = Array.isArray(data) ? data : [data];
        setTypeEvenement(typeEvenementArray);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'événements :",
          error
        );
      }
    };

    fetchUtilisateurs();
    fetchTypesEvenements();
    setDisableNomPrenom(true);
    setIsLoading(false);
  }, [mail]);

  useEffect(() => {
    if (utilisateurs.length > 0) {
      // console.log("Premier utilisateur:", utilisateurs[0]);
      // Sélection automatique du premier utilisateur
      setSelectedUser(utilisateurs[0].mail);
    } else {
      console.log("Aucun utilisateur trouvé");
    }
  }, [utilisateurs]);

  useEffect(() => {}, [typeEvenement]);

  // Gestionnaire de changement pour la sélection
  const handleUserChange = (event: SelectChangeEvent<string>) => {
    setSelectedUser(event.target.value);
  };

  const handleDureeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    // Filtrer uniquement les caractères numériques
    if (
      /^\d*$/.test(inputValue) &&
      (inputValue === "" || parseInt(inputValue, 10) <= 55)
    ) {
      setDuree(inputValue);
    }
  };

  const justificatifElement = () => {
    return (
      <>
        <div>
          <h2>Justificatif</h2>
          <DownloadIcon
            onClick={gérerSélectionFichier}
            sx={{ cursor: "pointer", color: "blue" }}
          />
          {fichier?.name && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="body2">{fichier.name}</Typography>
              <IconButton size="small" onClick={gérerSuppressionFichier}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </div>
      </>
    );
  };

  const commentaireElement = () => {
    return (
      <>
        <div>
          <Box sx={{ minWidth: 200 }}>
            <TextField
              id="CommentaireRetard"
              label="Commentaire"
              multiline
              maxRows={4}
              value={commentaire}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setCommentaire(event.target.value)
              }
              className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
            />
          </Box>
        </div>
      </>
    );
  };

  const boutonValidationElement = () => {
    return (
      <>
        <div>
          <button
            className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={async () => {
              setLocalError("");
              if (dateDebut === null) {
                setLocalError("Veuillez sélectionner une date de début");
                return;
              }
              if (selectionEvenement === "") {
                setLocalError("Veuillez sélectionner un type d'événement");
                return;
              }
              if (selectionEvenement === "Absence") {
                if (selectedDemiJournee === "" && selectedJournee === "") {
                  setLocalError("Veuillez sélectionner une durée d'absence");
                  return;
                }
              } else if (selectionEvenement === "Retard") {
                if (duree === "") {
                  setLocalError("Veuillez compléter la durée");
                }
              }

              // if (fichier !== null) {
              //   const Fichier = depoFichiers(fichier, mail);
              //   console.log(Fichier);
              // }

              const Gestions = await creationEvenement(
                mail,
                selectionEvenement,
                "Création évènement" + selectionEvenement,
                commentaire,
                dateDebut,
                duree,
                fichier ?? new File([], "")
              );
              setRetourGestions(Gestions);
            }}
          >
            Valider
          </button>
          {localError && (
            <div className="mt-2 text-red-600 text-sm">{localError}</div>
          )}
        </div>
      </>
    );
  };

  const renderEvenementFields = () => {
    // console.log("Type d'événement sélectionné:", selectionEvenement);
    switch (selectionEvenement) {
      case "Absence":
        return (
          <>
            <div>
              <div>
                <FormControl sx={{ m: 1 }} fullWidth>
                  <InputLabel id="comboDemiJournee">Demi-Journée</InputLabel>
                  <Select
                    id="comboDemiJournee"
                    value={selectedDemiJournee}
                    onChange={(event: SelectChangeEvent<string>) =>
                      setSelectedDemiJournee(event.target.value)
                    }
                    autoWidth
                    label="Demi-Journée"
                    className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    <MenuItem value="">Choisir option</MenuItem>
                    <MenuItem value="DemiJournee">Une demi journée</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ m: 1 }} fullWidth>
                  <InputLabel id="comboJournee">Journée</InputLabel>
                  <Select
                    id="comboJournee"
                    value={selectedJournee}
                    onChange={(event: SelectChangeEvent<string>) =>
                      setSelectedJournee(event.target.value)
                    }
                    autoWidth
                    label="Demi-Journée"
                    className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
                  >
                    <MenuItem value="">Choisir option</MenuItem>
                    {Array.from({ length: 5 }, (_, i) => (
                      <MenuItem key={i + 1} value={`Journee${i + 1}`}>
                        {i + 1} jour
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              {justificatifElement()}
              {commentaireElement()}
              {boutonValidationElement()}
            </div>
          </>
        );
      case "Retard":
        return (
          <>
            <div>
              <div>
                <TextField
                  id="DureeMin"
                  label="Durée en minutes"
                  onChange={handleDureeChange}
                  value={duree}
                ></TextField>
              </div>
              {justificatifElement()}
              {commentaireElement()}
              {boutonValidationElement()}
            </div>
          </>
        );
      default:
        return (
          <Typography variant="body2" color="textSecondary">
            Veuillez sélectionner un type d'événement
          </Typography>
        );
    }
  };

  const gérerSélectionFichier = async () => {
    try {
      const entrée = document.createElement("input");
      entrée.type = "file";
      entrée.accept = ".png, .jpg, .pdf, .jpeg"; // Extensions autorisées
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
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Formulaire Étudiant
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Veuillez sélectionner un étudiant.
      </Typography>
      <div className="flex-col w-full justify-center">
        <FormControl sx={{ m: 1 }} fullWidth disabled={disableNomPrenom}>
          <InputLabel id="comboEtudiant">Étudiant</InputLabel>
          <Select
            id="comboEtudiant"
            input={<OutlinedInput label="Étudiant" />}
            value={selectedUser}
            onChange={handleUserChange}
            autoWidth
            label="Étudiant"
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            {isLoading ? (
              <MenuItem value="" disabled>
                Chargement...
              </MenuItem>
            ) : error ? (
              <option value="" disabled>
                {error}
              </option>
            ) : utilisateurs.length > 0 ? (
              utilisateurs.map((user) => (
                <MenuItem key={user.mail} value={user.mail}>
                  {user.nom} {user.prenom}
                </MenuItem>
              ))
            ) : (
              (console.log("Aucun étudiant trouvé" + utilisateurs),
              (
                <MenuItem value="" disabled>
                  Aucun étudiant trouvé
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimeField
            label="Date Début"
            value={dateDebut}
            format="dd/MM/yyyy HH:mm"
            onChange={(newValue) => setDateDebut(newValue)}
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          />
        </LocalizationProvider>
      </div>
      <div className="flex w-full justify-center">
        <FormControl sx={{ m: 1 }} fullWidth>
          <InputLabel id="comboEvenement">Type d'événement</InputLabel>
          <Select
            id="comboEvenement"
            input={<OutlinedInput label="Type d'événement" />}
            value={selectionEvenement}
            onChange={(event: SelectChangeEvent<string>) => {
              setSelectionEvenement(event.target.value);
            }}
            autoWidth
            label="Type d'événement"
            className="flex w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-lightPurple shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          >
            {typeEvenement.map((type) => (
              <MenuItem key={type.typesEvenements} value={type.typesEvenements}>
                {type.typesEvenements}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {renderEvenementFields()}
    </Box>
  );
};

export default FormulaireEtudiant;
