import { Router } from "express";
import RolesController from "../Controllers/RolesController";

const routerRoles = Router();

routerRoles.get("/roleFindsAll", RolesController.findAll);

routerRoles.get("/roleFindsId/:id", RolesController.findById);

routerRoles.post("/roleCreate", RolesController.createRole);

export default routerRoles;
