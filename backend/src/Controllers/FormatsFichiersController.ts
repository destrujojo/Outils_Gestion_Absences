import { Request, Response } from "express";
import FormatsFichiersDao from "../Dao/FormatsFichiersDao";
const FormatFichier = require("../Models/FormatsFichiersModels");

class FormatsFichiersController {
  async createFormatFichier(req: Request, res: Response) {
    const formatsFichiers = new FormatFichier(req.body);
    try {
      const newFormatFichier = await FormatsFichiersDao.createFormatsFichiers(
        formatsFichiers
      );
      res.status(201).json(newFormatFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const formatsFichiers = await FormatsFichiersDao.findAll();
      res.status(200).json(formatsFichiers);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const formatFichier = await FormatsFichiersDao.findById(id);
      res.status(200).json(formatFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateFormatFichier(req: Request, res: Response) {
    const formatFichier = new FormatFichier(req.body);
    try {
      const updateFormatFichier =
        await FormatsFichiersDao.updateFormatsFichiers(formatFichier);
      res.status(200).json(updateFormatFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteFormatFichier(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await FormatsFichiersDao.deleteFormatsFichiers(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new FormatsFichiersController();
