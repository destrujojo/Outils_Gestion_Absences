import { Request, Response } from "express";
import FichiersDao from "../Dao/FichiersDao";
const Fichier = require("../Models/FichiersModels");

class FichiersController {
  async createFichier(req: Request, res: Response) {
    const fichiers = new Fichier(req.body);
    try {
      const newFichier = await FichiersDao.createFichiers(fichiers);
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
    const id = parseInt(req.params.id);
    try {
      const fichier = await FichiersDao.findById(id);
      res.status(200).json(fichier);
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
    const id = parseInt(req.params.id);
    try {
      await FichiersDao.deleteFichiers(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new FichiersController();
