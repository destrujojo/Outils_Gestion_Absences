import { Router } from "express";
import FormatsFichiersController from "../Controllers/FormatsFichiersController";

const routerFormatsFichiers = Router();

routerFormatsFichiers.get(
  "/formatsFichiersFindsAll",
  FormatsFichiersController.findAll
);

routerFormatsFichiers.get(
  "/formatsFichiersFindsId",
  FormatsFichiersController.findById
);

routerFormatsFichiers.post(
  "/formatsFichiersCreate",
  FormatsFichiersController.createFormatFichier
);

routerFormatsFichiers.put(
  "/formatsFichiersUpdate",
  FormatsFichiersController.updateFormatFichier
);

routerFormatsFichiers.delete(
  "/formatsFichiersDelete",
  FormatsFichiersController.deleteFormatFichier
);

export default routerFormatsFichiers;
