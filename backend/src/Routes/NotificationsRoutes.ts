import { Router } from "express";
import NotificationsController from "../Controllers/NotificationsController";

const routerNotifications = Router();

routerNotifications.get(
  "/notificationFindsAll",
  NotificationsController.findAll
);

routerNotifications.get(
  "/notificationFindsId",
  NotificationsController.findById
);

routerNotifications.post(
  "/notificationCreate",
  NotificationsController.createNotification
);

routerNotifications.put(
  "/notificationUpdate",
  NotificationsController.updateNotification
);

routerNotifications.delete(
  "/notificationDelete",
  NotificationsController.deleteNotification
);

export default routerNotifications;
