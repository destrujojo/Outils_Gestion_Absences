import { Router } from "express";
import EvenementsController from "../Controllers/EvenementsController";

const routerEvenements = Router();

routerEvenements.get("/evenementsFindsAll", EvenementsController.findAll);

routerEvenements.get("/evenementsFindsId", EvenementsController.findById);

routerEvenements.post(
  "/evenementsCreate",
  EvenementsController.createEvenement
);

routerEvenements.put("/evenementsUpdate", EvenementsController.updateEvenement);

routerEvenements.delete(
  "/evenementsDelete",
  EvenementsController.deleteEvenement
);

export default routerEvenements;
