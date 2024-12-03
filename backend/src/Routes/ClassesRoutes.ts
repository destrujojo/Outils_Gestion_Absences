import { Router } from "express";
import ClassesController from "../Controllers/ClassesController";

const routerClasses = Router();

routerClasses.get("/classesFindsAll", ClassesController.findAll);

routerClasses.get("/classesFindsId/:id", ClassesController.findById);

routerClasses.post("/classesCreate", ClassesController.createClasse);

routerClasses.put("/classesUpdate", ClassesController.updateClasse);

routerClasses.delete("/classesDelete", ClassesController.deleteClasse);

export default routerClasses;
