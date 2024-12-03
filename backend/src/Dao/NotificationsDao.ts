import { QueryResult } from "pg";
import pool from "../Db/Db";
import Notifications from "../Models/NotificationsModels";

class NotificationsDao {
  async createNotifications(
    notifications: Notifications
  ): Promise<Notifications> {
    const query = `
            INSERT INTO public."Notifications" (idStatusNotifications, message) 
            VALUES ($1, $2)
            RETURNING *;
        `;
    const values = [notifications.idStatusNotifications, notifications.message];

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
            SELECT * FROM public."Notifications" WHERE idNotifications = $1;
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
            SET idStatusNotifications = $1, message = $2
            WHERE idNotifications = $3
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

  async deleteNotifications(id: number): Promise<Notifications> {
    const query = `
            DELETE FROM public."Notifications"
            WHERE idNotifications = $1
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
}

export default new NotificationsDao();
