import { Request, Response } from "express";
import NotificationsDao from "../Dao/NotificationsDao";
const Notification = require("../Models/NotificationsModels");

class NotificationsController {
  async createNotification(req: Request, res: Response) {
    const notifications = new Notification(req.body);
    try {
      const newNotification = await NotificationsDao.createNotifications(
        notifications
      );
      res.status(201).json(newNotification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const notifications = await NotificationsDao.findAll();
      res.status(200).json(notifications);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const notification = await NotificationsDao.findById(id);
      res.status(200).json(notification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateNotification(req: Request, res: Response) {
    const notification = new Notification(req.body);
    try {
      const updateNotification = await NotificationsDao.updateNotifications(
        notification
      );
      res.status(200).json(updateNotification);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteNotification(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await NotificationsDao.deleteNotifications(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new NotificationsController();