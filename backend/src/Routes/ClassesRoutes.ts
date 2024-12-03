import { Router } from "express";
import ClassesController from "../Controllers/ClassesController";

const routerClasses = Router();

routerClasses.get("/classesFindsAll", ClassesController.findAll);

routerClasses.post("/classesFindsId", ClassesController.findById);

routerClasses.post("/classesCreate", ClassesController.createClasse);

routerClasses.put("/classesUpdate", ClassesController.updateClasse);

routerClasses.delete("/classesDelete", ClassesController.deleteClasse);

export default routerClasses;
