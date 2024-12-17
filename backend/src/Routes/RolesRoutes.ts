import { Router } from "express";
import RolesController from "../Controllers/RolesController";

const routerRoles = Router();

routerRoles.get("/roleFindsAll", RolesController.findAll);

routerRoles.post("/roleFindsId", RolesController.findById);

routerRoles.post("/roleFindsByMail", RolesController.findByMail);

routerRoles.post("/roleCreate", RolesController.createRole);

export default routerRoles;
