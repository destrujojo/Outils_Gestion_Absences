import { Router } from "express";
import FichiersController from "../Controllers/FichiersController";

const routerFichiers = Router();

routerFichiers.get("/fichiersFindsAll", FichiersController.findAll);

routerFichiers.get("/fichiersFindsId", FichiersController.findById);

routerFichiers.post("/fichiersCreate", FichiersController.createFichier);

routerFichiers.put("/fichiersUpdate", FichiersController.updateFichier);

routerFichiers.delete("/fichiersDelete", FichiersController.deleteFichier);

export default routerFichiers;
