import { QueryResult } from "pg";
import pool from "../Db/Db";
import Classes from "../Models/ClassesModels";
import { UUID } from "crypto";

class ClassesDao {
  async createClasses(classes: Classes): Promise<Classes> {
    const query = `
            INSERT INTO public."Classes" (\"idClasses\", "classes") 
            VALUES (gen_random_uuid(), $1)
            RETURNING *;
        `;
    const values = [classes.classes];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de la classe: ${error.message}`
      );
    }
  }

  async findAll(): Promise<Classes[]> {
    const query = `
            SELECT * FROM public."Classes";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des classes: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<Classes> {
    const query = `
            SELECT * FROM public."Classes" WHERE "idClasses" = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de la classe: ${error.message}`
      );
    }
  }

  async findIdByClasses(classes: string): Promise<UUID> {
    const query = `
            SELECT "idClasses" FROM public."Classes" WHERE "classes" = $1;
        `;
    const values = [classes];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0].idClasses;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de l'id de la classe: ${error.message}`
      );
    }
  }

  async updateClasses(classes: Classes): Promise<Classes> {
    const query = `
            UPDATE public."Classes"
            SET "classes" = $1
            WHERE "idClasses" = $2
            RETURNING *;
        `;
    const values = [classes.classes, classes.idClasses];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour de la classe: ${error.message}`
      );
    }
  }

  async deleteClasses(id: number): Promise<Classes> {
    const query = `
            DELETE FROM public."Classes"
            WHERE "idClasses" = $1
            RETURNING *;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression de la classe: ${error.message}`
      );
    }
  }
}

export default new ClassesDao();
