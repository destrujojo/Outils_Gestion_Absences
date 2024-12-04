import { Request, Response } from "express";
import UtilisateursDao from "../Dao/UtilisateursDao";
import UtilisateursServices from "../Services/UtilisateursServices";
const Utilisateur = require("../Models/UtilisateursModels");

class UtilisateursController {
  async createUtilisateur(req: Request, res: Response) {
    const { classes, ...otherField } = req.body;
    const utilisateur = { ...otherField };
    console.log(req.body);
    try {
      const newUtilisateur = await UtilisateursServices.createUtilisateurs(
        utilisateur,
        classes
      );
      res.status(201).json(newUtilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async loginUtilisateurs(req: Request, res: Response) {
    const { mail, mdp } = req.body;
    try {
      const login = await UtilisateursServices.loginUtilisateurs({ mail, mdp });
      res.status(200).json(login);
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

  async findByEmail(req: Request, res: Response) {
    const email = req.params.email;
    try {
      const utilisateur = await UtilisateursDao.findByMail(email);
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
