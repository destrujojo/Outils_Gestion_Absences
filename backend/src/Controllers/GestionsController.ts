import { Request, Response } from "express";
import GestionsDao from "../Dao/GestionsDao";
import GestionsServices from "../Services/GestionsServices";
import multer from "multer";
const Gestion = require("../Models/GestionsModels");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Répertoire de stockage
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Nom du fichier avec horodatage
  },
});

const upload = multer({ storage });

interface Fichier {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
}

class GestionsController {
  async createGestion(req: Request, res: Response) {
    const { idUtilisateurs, idEvenements, idStatusGestions } = new Gestion(
      req.body
    );
    try {
      const newGestion = await GestionsDao.createGestions(
        idUtilisateurs,
        idEvenements,
        idStatusGestions
      );
      res.status(201).json(newGestion);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const gestions = await GestionsDao.findAll();
      res.status(200).json(gestions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateGestion(req: Request, res: Response) {
    const gestion = new Gestion(req.body);
    try {
      const updateGestion = await GestionsDao.updateGestions(gestion);
      res.status(200).json(updateGestion);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async gestionsTableauSuiviEtudiant(req: Request, res: Response) {
    const { mail, classes, dateDebut, dateFin } = req.body;
    try {
      const gestions = await GestionsDao.gestionsTableauSuiviEtudiant(
        mail,
        classes,
        dateDebut,
        dateFin
      );
      res.status(200).json(gestions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async creationGestions(req: Request, res: Response) {
    // Champs texte de la requête
    const {
      mail,
      typeEvenements,
      notificationMessage,
      evenementsMessage,
      evenementsDate,
      evenementsDuree,
    } = req.body;
    console.log(req.body);

    const fichier: Fichier | null = req.file
      ? {
          fieldname: req.file.fieldname,
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          path: req.file.path,
        }
      : null;

    try {
      // Appeler le service avec les données et le chemin du fichier
      const newGestion = await GestionsServices.creationGestion(
        mail,
        typeEvenements,
        notificationMessage,
        evenementsMessage,
        evenementsDate,
        evenementsDuree,
        fichier // Passer le chemin du fichier au service
      );

      // Répondre avec les données de la nouvelle gestion
      res.status(201).json(newGestion);
    } catch (error: any) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
}

export default new GestionsController();
