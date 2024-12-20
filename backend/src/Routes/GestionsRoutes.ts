import e, { Router } from "express";
import multer from "multer";
import GestionsController from "../Controllers/GestionsController";

const routerGestions = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Répertoire où les fichiers seront sauvegardés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nom du fichier avec horodatage
  },
});

const upload = multer({ storage });

routerGestions.get("/gestionFindsAll", GestionsController.findAll);

routerGestions.post("/gestionCreate", GestionsController.createGestion);

routerGestions.post(
  "/gestionsTableauSuiviEtudiant",
  GestionsController.gestionsTableauSuiviEtudiant
);

routerGestions.post(
  "/gestionsCreationEvenements",
  upload.single("fichier"),
  GestionsController.creationGestions
);

routerGestions.put("/gestionUpdate", GestionsController.updateGestion);

export default routerGestions;
