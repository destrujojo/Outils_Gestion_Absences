import GestionsDao from "../Dao/GestionsDao";
import UtilisateursDao from "../Dao/UtilisateursDao";
import StatusGestionsDao from "../Dao/StatusGestionsDao";

import NotificationsServices from "./NotificationsServices";
import EvenementsServices from "./EvenementsServices";
import fichiersServices from "./fichiersServices";

interface Fichier {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
}

class GestionsServices {
  async creationGestion(
    mail: string,
    typeEvenements: string,
    notificationsMessage: string,
    evenementsMessage: string,
    evenementsDate: Date,
    evenementsDuree: string,
    fichiers: Fichier | null
  ) {
    // console.log(
    //   "test" + mail,
    //   typeEvenements,
    //   notificationsMessage,
    //   evenementsMessage,
    //   evenementsDate,
    //   evenementsDuree
    // );
    const utilisateur = await UtilisateursDao.findByMail(mail);
    if (!utilisateur) {
      throw new Error("L'utilisateur n'existe pas");
    }
    // console.log("1" + utilisateur);

    // console.log("2" + Notifications);

    const Evenements = await EvenementsServices.createEvenement(
      evenementsMessage,
      evenementsDate,
      evenementsDuree,
      typeEvenements
    );
    if (!Evenements) {
      throw new Error("L'événement n'a pas pu être créé");
    }
    // console.log("3" + Evenements);

    if (fichiers) {
      const Fichiers = await fichiersServices.depoFichiers(
        fichiers,
        mail,
        Evenements.idEvenements
      );
      if (!Fichiers) {
        throw new Error("Le fichier n'a pas pu être déposé");
      }
      // console.log("4" + Fichiers);
    }

    const StatusGestions = await StatusGestionsDao.findStatusGestion(
      "En attente"
    );
    if (!StatusGestions) {
      throw new Error("Le status de gestion n'existe pas");
    }
    // console.log("5" + StatusGestions);

    const gestions = await GestionsDao.createGestions(
      utilisateur.idUtilisateurs,
      Evenements.idEvenements,
      StatusGestions.idStatusGestions
    );

    const Notifications = await NotificationsServices.creationNotification(
      gestions.idGestions,
      notificationsMessage
    );
    console.log(Notifications);
    if (!Notifications) {
      throw new Error("La notification n'a pas pu être créée");
    }

    // const NotificationsAdmin =
    //   await NotificationsServices.creationNotificationAdmin(
    //     gestions.idGestions,
    //     notificationsMessage
    //   );

    return gestions;
  }
}

export default new GestionsServices();
