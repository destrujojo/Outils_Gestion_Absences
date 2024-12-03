import { Request, Response } from "express";
import ClassesDao from "../Dao/ClassesDao";
const Classe = require("../Models/ClassesModels");

class ClassesController {
  async createClasse(req: Request, res: Response) {
    const classes = new Classe(req.body);
    try {
      const newClasse = await ClassesDao.createClasses(classes);
      res.status(201).json(newClasse);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const classes = await ClassesDao.findAll();
      res.status(200).json(classes);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const classe = await ClassesDao.findById(id);
      res.status(200).json(classe);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateClasse(req: Request, res: Response) {
    const classe = new Classe(req.body);
    try {
      const updateClasse = await ClassesDao.updateClasses(classe);
      res.status(200).json(updateClasse);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteClasse(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await ClassesDao.deleteClasses(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ClassesController();
