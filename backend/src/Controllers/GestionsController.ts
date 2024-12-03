import { Request, Response } from "express";
import GestionsDao from "../Dao/GestionsDao";
const Gestion = require("../Models/GestionsModels");

class GestionsController {
  async createGestion(req: Request, res: Response) {
    const gestions = new Gestion(req.body);
    try {
      const newGestion = await GestionsDao.createGestions(gestions);
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

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const gestion = await GestionsDao.findById(id);
      res.status(200).json(gestion);
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

  async deleteGestion(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await GestionsDao.deleteGestions(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new GestionsController();
