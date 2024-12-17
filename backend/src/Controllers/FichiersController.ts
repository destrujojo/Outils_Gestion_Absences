import { Request, Response } from "express";
import FichiersDao from "../Dao/FichiersDao";
import fichiersServices from "../Services/fichiersServices";
const Fichier = require("../Models/FichiersModels");

class FichiersController {
  async createFichier(req: Request, res: Response) {
    const { idEvenements, idFormatsFichiers, chemin, nom } = req.body;
    try {
      const newFichier = await FichiersDao.createFichiers(
        idEvenements,
        idFormatsFichiers,
        chemin,
        nom
      );
      res.status(201).json(newFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const fichiers = await FichiersDao.findAll();
      res.status(200).json(fichiers);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = req.params.id;
    try {
      const fichier = await FichiersDao.findById(id);
      res.status(200).json(fichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findByIdEvenements(req: Request, res: Response) {
    const idEvenements = req.params.idEvenements;
    try {
      const fichiers = await FichiersDao.findByIdEvenements(idEvenements);
      res.status(200).json(fichiers);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateFichier(req: Request, res: Response) {
    const fichier = new Fichier(req.body);
    try {
      const updateFichier = await FichiersDao.updateFichiers(fichier);
      res.status(200).json(updateFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteFichier(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await FichiersDao.deleteFichiers(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async depoFichiers(req: Request, res: Response) {
    const { idEvenements, chemin, mail } = req.body;
    try {
      const newFichier = await fichiersServices.depoFichiers(
        chemin,
        mail,
        idEvenements
      );
      res.status(201).json(newFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async telechargerFichiers(req: Request, res: Response) {
    const idFichiers = req.params.idFichiers;
    try {
      await fichiersServices.telechargerFichiers(idFichiers);
      res.status(200).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new FichiersController();
