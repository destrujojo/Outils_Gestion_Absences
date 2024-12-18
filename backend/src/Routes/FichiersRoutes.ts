import { Router } from "express";
import FichiersController from "../Controllers/FichiersController";

const routerFichiers = Router();

routerFichiers.get("/fichiersFindsAll", FichiersController.findAll);

routerFichiers.post("/fichiersFindsId", FichiersController.findById);

routerFichiers.get(
  "/fichiersFindsIdEvenements",
  FichiersController.findByIdEvenements
);

routerFichiers.post("/fichiersCreate", FichiersController.createFichier);

routerFichiers.put("/fichiersUpdate", FichiersController.updateFichier);

routerFichiers.delete("/fichiersDelete", FichiersController.deleteFichier);

routerFichiers.post("/fichierDepo", FichiersController.depoFichiers);

routerFichiers.get(
  "/fichierTelechargement/:idFichiers",
  FichiersController.telechargerFichiers
);

export default routerFichiers;
