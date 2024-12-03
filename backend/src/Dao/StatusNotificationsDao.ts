import { QueryResult } from "pg";
import pool from "../Db/Db";
import StatusNotification from "../Models/StatusNotificationsModels";

class StatusNotificationDao {
  async createStatusNotifications(
    statusNotification: StatusNotification
  ): Promise<StatusNotification> {
    const query = `
            INSERT INTO public."statusNotification" (status) 
            VALUES ($1)
            RETURNING *;
        `;
    const values = [statusNotification.statusNotification];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création du statut de notification: ${error.message}`
      );
    }
  }

  async findAll(): Promise<StatusNotification[]> {
    const query = `
            SELECT * FROM public."statusNotification";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des statuts de notification: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<StatusNotification> {
    const query = `
            SELECT * FROM public."statusNotification" WHERE idStatusNotification = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du statut de notification: ${error.message}`
      );
    }
  }

  async updateStatusNotifications(
    statusNotification: StatusNotification
  ): Promise<StatusNotification> {
    const query = `
            UPDATE public."statusNotification"
            SET status = $1
            WHERE idStatusNotification = $2
            RETURNING *;
        `;
    const values = [
      statusNotification.statusNotification,
      statusNotification.idStatusNotification,
    ];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour du statut de notification: ${error.message}`
      );
    }
  }

  async deleteStatusNotifications(id: number): Promise<StatusNotification> {
    const query = `
            DELETE FROM public."statusNotification" WHERE idStatusNotification = $1
            RETURNING *;
        `;
    const values = [id];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression du statut de notification: ${error.message}`
      );
    }
  }
}

export default new StatusNotificationDao();
