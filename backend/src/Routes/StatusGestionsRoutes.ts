import { Router } from "express";
import StatusGestionsController from "../Controllers/StatusGestionsController";

const routerStatusGestions = Router();

routerStatusGestions.get(
  "/statusGestionFindsAll",
  StatusGestionsController.findAll
);

routerStatusGestions.get(
  "/statusGestionFindsId",
  StatusGestionsController.findById
);

routerStatusGestions.post(
  "/statusGestionCreate",
  StatusGestionsController.createStatusGestion
);

routerStatusGestions.put(
  "/statusGestionUpdate",
  StatusGestionsController.updateStatusGestion
);

routerStatusGestions.delete(
  "/statusGestionDelete",
  StatusGestionsController.deleteStatusGestion
);

export default routerStatusGestions;
