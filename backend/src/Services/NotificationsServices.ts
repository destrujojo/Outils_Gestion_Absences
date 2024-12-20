import { UUID } from "crypto";
import NotificationsDao from "../Dao/NotificationsDao";
import RolesDao from "../Dao/RolesDao";
import StatusNotificationsDao from "../Dao/StatusNotificationsDao";

class NotificationServices {
  async creationNotification(idGestions: UUID, message: string) {
    //récupérer l'id du status de la notification non lu
    const idStatusNotifications =
      await StatusNotificationsDao.findStatusNotification("Non lue");

    const idRoles = await RolesDao.findRoles("Etudiant");

    console.log("idStatusNotifications", idStatusNotifications);

    try {
      const newNotification = await NotificationsDao.createNotifications(
        idStatusNotifications,
        idRoles.idRoles,
        idGestions,
        message
      );
      return newNotification;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de la notification: ${error.message}`
      );
    }
  }

  async creationNotificationAdmin(idGestions: UUID, message: string) {
    //récupérer l'id du status de la notification non lu
    const idStatusNotifications =
      await StatusNotificationsDao.findStatusNotification("Non lue");

    const idRoles = await RolesDao.findRoles("Admin");

    console.log("idStatusNotifications", idStatusNotifications);

    try {
      const newNotification = await NotificationsDao.createNotifications(
        idStatusNotifications,
        idRoles.idRoles,
        idGestions,
        message
      );
      return newNotification;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de la notification: ${error.message}`
      );
    }
  }

  async updateStatusNotifications(
    idNotifications: UUID,
    statusNotifications: string
  ) {
    // console.log("idNotifications", statusNotifications);
    const allStatusNotifications = await StatusNotificationsDao.findAll();
    // console.log("allStatusNotifications", allStatusNotifications);

    //récupère l'id du status qui n'est pas passer en paramètre
    const idStatusNotifications = allStatusNotifications.find(
      (status) => status.statusNotifications !== statusNotifications
    );

    if (!idStatusNotifications) {
      throw new Error("Status de notification non trouvé");
    }

    // console.log("idStatusNotifications", idStatusNotifications);

    try {
      const updateNotification =
        await NotificationsDao.updateStatusNotifications(
          idNotifications,
          idStatusNotifications?.idStatusNotifications
        );
      return updateNotification;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour de la notification: ${error.message}`
      );
    }
  }
}

export default new NotificationServices();
