import { QueryResult } from "pg";
import pool from "../Db/Db";
import Gestions from "../Models/GestionsModels";

class GestionsDao {
  async createGestions(gestions: Gestions): Promise<Gestions> {
    const query = `
            INSERT INTO public."Gestions" (idGestions, idUtilisateurs, idNotifications, idEvenements, idStatusGestions) 
            VALUES (gen_random_uuid(), $1, $2, $3, $4)
            RETURNING *;
        `;
    const values = [
      gestions.idUtilisateurs,
      gestions.idNotifications,
      gestions.idEvenements,
      gestions.idStatusGestions,
    ];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de la gestion: ${error.message}`
      );
    }
  }

  async findAll(): Promise<Gestions[]> {
    const query = `
            SELECT * FROM public."Gestions";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des gestions: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<Gestions> {
    const query = `
            SELECT * FROM public."Gestions" WHERE idGestions = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de la gestion: ${error.message}`
      );
    }
  }

  async updateGestions(gestions: Gestions): Promise<Gestions> {
    const query = `
            UPDATE public."Gestions"
            SET idUtilisateurs = $1, idNotifications = $2, idEvenements = $3, idStatusGestions = $4
            WHERE idGestions = $5
            RETURNING *;
        `;
    const values = [
      gestions.idUtilisateurs,
      gestions.idNotifications,
      gestions.idEvenements,
      gestions.idStatusGestions,
      gestions.idGestions,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la modification de la gestion: ${error.message}`
      );
    }
  }

  async deleteGestions(id: number): Promise<void> {
    const query = `
            DELETE FROM public."Gestions"
            WHERE idGestions = $1;
        `;
    const values = [id];
    try {
      await pool.query(query, values);
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression de la gestion: ${error.message}`
      );
    }
  }
}

export default new GestionsDao();
