import { Request, Response } from "express";
import EvenementsDao from "../Dao/EvenementsDao";
const Evenement = require("../Models/EvenementsModels");

class EvenementsController {
  async createEvenement(req: Request, res: Response) {
    const { idTypesEvenements, commentaire, date, duree } = new Evenement(
      req.body
    );
    try {
      const newEvenement = await EvenementsDao.createEvenements(
        idTypesEvenements,
        commentaire,
        date,
        duree
      );
      res.status(201).json(newEvenement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const evenements = await EvenementsDao.findAll();
      res.status(200).json(evenements);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const evenement = await EvenementsDao.findById(id);
      res.status(200).json(evenement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateEvenement(req: Request, res: Response) {
    const evenement = new Evenement(req.body);
    try {
      const updateEvenement = await EvenementsDao.updateEvenements(evenement);
      res.status(200).json(updateEvenement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteEvenement(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await EvenementsDao.deleteEvenements(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new EvenementsController();
