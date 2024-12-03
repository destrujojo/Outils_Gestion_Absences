import { Router } from "express";
import StatusNotificationsController from "../Controllers/StatusNotificationsController";

const routerStatusNotifications = Router();

routerStatusNotifications.get(
  "/statusNotificationFindsAll",
  StatusNotificationsController.findAll
);

routerStatusNotifications.get(
  "/statusNotificationFindsId",
  StatusNotificationsController.findById
);

routerStatusNotifications.post(
  "/statusNotificationCreate",
  StatusNotificationsController.createStatusNotification
);

routerStatusNotifications.put(
  "/statusNotificationUpdate",
  StatusNotificationsController.updateStatusNotification
);

routerStatusNotifications.delete(
  "/statusNotificationDelete",
  StatusNotificationsController.deleteStatusNotification
);

export default routerStatusNotifications;
