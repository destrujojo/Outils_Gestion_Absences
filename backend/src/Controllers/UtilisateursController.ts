import { Request, Response } from "express";
import UtilisateursDao from "../Dao/UtilisateursDao";
const Utilisateur = require("../Models/UtilisateursModels");

class UtilisateursController {
  async createUtilisateur(req: Request, res: Response) {
    const utilisateurs = new Utilisateur(req.body);
    try {
      const newUtilisateur = await UtilisateursDao.createUtilisateurs(
        utilisateurs
      );
      res.status(201).json(newUtilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const utilisateurs = await UtilisateursDao.findAll();
      res.status(200).json(utilisateurs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const utilisateur = await UtilisateursDao.findById(id);
      res.status(200).json(utilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUtilisateur(req: Request, res: Response) {
    const utilisateur = new Utilisateur(req.body);
    try {
      const updateUtilisateur = await UtilisateursDao.updateUtilisateurs(
        utilisateur
      );
      res.status(200).json(updateUtilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUtilisateur(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await UtilisateursDao.deleteUtilisateurs(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UtilisateursController();
