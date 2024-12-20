import { QueryResult } from "pg";
import pool from "../Db/Db";
import Notifications from "../Models/NotificationsModels";
import { UUID } from "crypto";

class NotificationsDao {
  async createNotifications(
    idStatusNotifications: UUID,
    idRoles: UUID,
    idGestions: UUID,
    message: string
  ): Promise<Notifications> {
    const query = `
            INSERT INTO public."Notifications" ("idNotifications", "idStatusNotifications", "message", "idRoles", "idGestions") 
            VALUES (gen_random_uuid(), $1, $2, $3, $4)
            RETURNING *;
        `;
    const values = [idStatusNotifications, message, idRoles, idGestions];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de la notification: ${error.message}`
      );
    }
  }

  async findAll(): Promise<Notifications[]> {
    const query = `
            SELECT * FROM public."Notifications";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des notifications: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<Notifications> {
    const query = `
            SELECT * FROM public."Notifications" WHERE "idNotifications" = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de la notification: ${error.message}`
      );
    }
  }

  async updateNotifications(
    notifications: Notifications
  ): Promise<Notifications> {
    const query = `
            UPDATE public."Notifications"
            SET "idStatusNotifications" = $1, "message" = $2
            WHERE "idNotifications" = $3
            RETURNING *;
        `;
    const values = [
      notifications.idStatusNotifications,
      notifications.message,
      notifications.idNotifications,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour de la notification: ${error.message}`
      );
    }
  }

  async updateStatusNotifications(
    idNotifications: UUID,
    statusNotifications: UUID
  ): Promise<Notifications> {
    const query = `
            UPDATE public."Notifications"
            SET "idStatusNotifications" = $1
            WHERE "idNotifications" = $2
            RETURNING *;
        `;
    const values = [statusNotifications, idNotifications];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour du statut de la notification: ${error.message}`
      );
    }
  }

  async deleteNotifications(id: number): Promise<Notifications> {
    const query = `
            DELETE FROM public."Notifications"
            WHERE "idNotifications" = $1
            RETURNING *;
        `;
    const values = [id];
    try {
      const result = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression de la notification: ${error.message}`
      );
    }
  }

  async tableauNotifications(mail: string) {
    const query = `
    SELECT noti."idNotifications",
      typ_eve."typesEvenements",
      eve."date",
      eve."commentaire", 
      noti."message",
      sta_noti."statusNotifications"
    FROM public."Notifications" noti
      LEFT JOIN public."StatusNotifications" sta_noti ON sta_noti."idStatusNotifications" = noti."idStatusNotifications"
      LEFT JOIN public."Gestions" ges ON ges."idGestions" = noti."idGestions"
      LEFT JOIN public."Utilisateurs" uti ON uti."idUtilisateurs" = ges."idUtilisateurs"
      LEFT JOIN public."Evenements" eve ON eve."idEvenements" = ges."idEvenements"
      LEFT JOIN public."TypesEvenements" typ_eve ON typ_eve."idTypesEvenements" = eve."idTypesEvenements"
      LEFT JOIN public."Roles" rol ON rol."idRoles" = noti."idRoles"
    WHERE uti."mail" = $1
      AND rol."roles" = 'Etudiant'
    ORDER BY eve."date" DESC;
    `;
    const values = [mail];
    try {
      const result = await pool.query(query, values);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des notifications: ${error.message}`
      );
    }
  }
}

export default new NotificationsDao();
