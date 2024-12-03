import { Request, Response } from "express";
import StatusNotificationsDao from "../Dao/StatusNotificationsDao";
const StatusNotification = require("../Models/StatusNotificationsModels");

class StatusNotificationsController {
  async createStatusNotification(req: Request, res: Response) {
    const statusNotifications = new StatusNotification(req.body);
    try {
      const newStatusNotification =
        await StatusNotificationsDao.createStatusNotifications(
          statusNotifications
        );
      res.status(201).json(newStatusNotification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const statusNotifications = await StatusNotificationsDao.findAll();
      res.status(200).json(statusNotifications);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const statusNotification = await StatusNotificationsDao.findById(id);
      res.status(200).json(statusNotification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateStatusNotification(req: Request, res: Response) {
    const statusNotification = new StatusNotification(req.body);
    try {
      const updateStatusNotification =
        await StatusNotificationsDao.updateStatusNotifications(
          statusNotification
        );
      res.status(200).json(updateStatusNotification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteStatusNotification(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await StatusNotificationsDao.deleteStatusNotifications(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new StatusNotificationsController();
