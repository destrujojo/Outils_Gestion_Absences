import { Request, Response } from "express";
import StatusGestionsDao from "../Dao/StatusGestionsDao";
const StatusGestion = require("../Models/StatusGestionsModels");

class StatusGestionsController {
  async createStatusGestion(req: Request, res: Response) {
    const statusGestions = new StatusGestion(req.body);
    try {
      const newStatusGestion = await StatusGestionsDao.createStatusGestions(
        statusGestions
      );
      res.status(201).json(newStatusGestion);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const statusGestions = await StatusGestionsDao.findAll();
      res.status(200).json(statusGestions);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const statusGestion = await StatusGestionsDao.findById(id);
      res.status(200).json(statusGestion);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatusGestion(req: Request, res: Response) {
    const statusGestion = new StatusGestion(req.body);
    try {
      const updateStatusGestion = await StatusGestionsDao.updateStatusGestions(
        statusGestion
      );
      res.status(200).json(updateStatusGestion);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteStatusGestion(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await StatusGestionsDao.deleteStatusGestions(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new StatusGestionsController();
