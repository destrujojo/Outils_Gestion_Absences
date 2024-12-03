import e, { Router } from "express";
import GestionsController from "../Controllers/GestionsController";

const routerGestions = Router();

routerGestions.get("/gestionFindsAll", GestionsController.findAll);

routerGestions.get("/gestionFindsId", GestionsController.findById);

routerGestions.post("/gestionCreate", GestionsController.createGestion);

routerGestions.put("/gestionUpdate", GestionsController.updateGestion);

routerGestions.delete("/gestionDelete", GestionsController.deleteGestion);

export default routerGestions;
