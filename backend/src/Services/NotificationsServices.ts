import NotificationsDao from "../Dao/NotificationsDao";
import StatusNotificationsDao from "../Dao/StatusNotificationsDao";

class NotificationServices {
  async creationNotification(message: string) {
    //récupérer l'id du status de la notification non lu
    const idStatusNotifications =
      await StatusNotificationsDao.findStatusNotification("Non lue");

    console.log("idStatusNotifications", idStatusNotifications);

    try {
      const newNotification = await NotificationsDao.createNotifications(
        idStatusNotifications,
        message
      );
      return newNotification;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de la notification: ${error.message}`
      );
    }
  }
}

export default new NotificationServices();
