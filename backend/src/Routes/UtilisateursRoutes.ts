import { Router } from "express";
import UtilisateursController from "../Controllers/UtilisateursController";

const routerUtilisateurs = Router();

routerUtilisateurs.get("/utilisateurFindsAll", UtilisateursController.findAll);

routerUtilisateurs.get("/utilisateurFindsId", UtilisateursController.findById);

routerUtilisateurs.post(
  "/utilisateurCreate",
  UtilisateursController.createUtilisateur
);

routerUtilisateurs.put(
  "/utilisateurUpdate",
  UtilisateursController.updateUtilisateur
);

routerUtilisateurs.delete(
  "/utilisateurDelete",
  UtilisateursController.deleteUtilisateur
);

export default routerUtilisateurs;
