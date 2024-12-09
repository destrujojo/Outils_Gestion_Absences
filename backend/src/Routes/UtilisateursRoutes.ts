import { Router } from "express";
import UtilisateursController from "../Controllers/UtilisateursController";

const routerUtilisateurs = Router();

routerUtilisateurs.get("/utilisateurFindsAll", UtilisateursController.findAll);

routerUtilisateurs.get("/utilisateurFindsId", UtilisateursController.findById);

routerUtilisateurs.post(
  "/utilisateurFindsEmail",
  UtilisateursController.findByEmail
);

routerUtilisateurs.post(
  "/utilisateurCreate",
  UtilisateursController.createUtilisateur
);

routerUtilisateurs.put(
  "/utilisateurUpdate",
  UtilisateursController.updateUtilisateur
);

routerUtilisateurs.post(
  "/utilisateurUpdateCode",
  UtilisateursController.generateCode
);

routerUtilisateurs.post(
  "/utilisateurVerifMail",
  UtilisateursController.verifMail
);

routerUtilisateurs.post(
  "/utilisateurVerifCode",
  UtilisateursController.verifCode
);

routerUtilisateurs.post(
  "/utilisateurResetCode",
  UtilisateursController.resetCode
);

routerUtilisateurs.post(
  "/utilisateurUpdateMdp",
  UtilisateursController.updateMdp
);

routerUtilisateurs.delete(
  "/utilisateurDelete",
  UtilisateursController.deleteUtilisateur
);

routerUtilisateurs.post(
  "/utilisateurLogin",
  UtilisateursController.loginUtilisateurs
);

export default routerUtilisateurs;
