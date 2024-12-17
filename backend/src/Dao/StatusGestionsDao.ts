import { QueryResult } from "pg";
import pool from "../Db/Db";
import StatusGestions from "../Models/StatusGestionsModels";

class StatusGestionsDao {
  async createStatusGestions(
    statusGestions: StatusGestions
  ): Promise<StatusGestions> {
    const query = `
            INSERT INTO public."StatusGestions" (idStatusGestion, status) 
            VALUES (gen_random_uuid(), $1)
            RETURNING *;
        `;
    const values = [statusGestions.statusGestions];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création du statut de gestion: ${error.message}`
      );
    }
  }

  async findAll(): Promise<StatusGestions[]> {
    const query = `
            SELECT * FROM public."StatusGestions";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des statuts de gestion: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<StatusGestions> {
    const query = `
            SELECT * FROM public."StatusGestions" WHERE "idStatusGestions" = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du statut de gestion: ${error.message}`
      );
    }
  }

  async findStatusGestion(status: string): Promise<StatusGestions> {
    const query = `
            SELECT * FROM public."StatusGestions" WHERE "statusGestions" = $1;
        `;
    const values = [status];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du status de la gestion: ${error.message}`
      );
    }
  }

  async updateStatusGestions(
    statusGestions: StatusGestions
  ): Promise<StatusGestions> {
    const query = `
            UPDATE public."StatusGestions"
            SET "status" = $1
            WHERE "idStatusGestions" = $2
            RETURNING *;
        `;
    const values = [
      statusGestions.statusGestions,
      statusGestions.idStatusGestions,
    ];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour du statut de gestion: ${error.message}`
      );
    }
  }

  async deleteStatusGestions(id: number): Promise<StatusGestions> {
    const query = `
            DELETE FROM public."StatusGestions"
            WHERE "idStatusGestions" = $1
            RETURNING *;
        `;
    const values = [id];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression du statut de gestion: ${error.message}`
      );
    }
  }
}

export default new StatusGestionsDao();
