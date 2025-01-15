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
  "/utilisateurFindsEmailEtudiant",
  UtilisateursController.findByEmailEtudiant
);

routerUtilisateurs.post(
  "/utilisateurCreate",
  UtilisateursController.createUtilisateur
);

routerUtilisateurs.post(
  "/utilisateurRecuperationNbEssais",
  UtilisateursController.recuperationNbEssais
);

routerUtilisateurs.post(
  "/utilisateurRecuperationBlocage",
  UtilisateursController.recuperationBlocage
);

routerUtilisateurs.post(
  "/utilisateurUpdateBlocage",
  UtilisateursController.updateBlocage
);

routerUtilisateurs.post(
  "/utilisateurUpdateNbEssais",
  UtilisateursController.updateNbEssais
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
