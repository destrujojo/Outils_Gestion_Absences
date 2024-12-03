import { Router } from "express";
import TypesEvenementsController from "../Controllers/TypesEvenementsController";

const routerTypesEvenements = Router();

routerTypesEvenements.get(
  "/typesEvenementFindsAll",
  TypesEvenementsController.findAll
);

routerTypesEvenements.get(
  "/typesEvenementFindsId",
  TypesEvenementsController.findById
);

routerTypesEvenements.post(
  "/typesEvenementCreate",
  TypesEvenementsController.createTypesEvenement
);

routerTypesEvenements.put(
  "/typesEvenementUpdate",
  TypesEvenementsController.updateTypesEvenement
);

routerTypesEvenements.delete(
  "/typesEvenementDelete",
  TypesEvenementsController.deleteTypesEvenement
);

export default routerTypesEvenements;
