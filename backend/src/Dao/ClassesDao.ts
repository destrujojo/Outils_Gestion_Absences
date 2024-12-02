import { QueryResult } from "pg";
import pool from "../Db/Db";
import Classes from "../Models/ClassesModels";

class ClassesDao {
  async createClasses(classes: Classes): Promise<Classes> {
    const query = `
            INSERT INTO public."classes" (class) 
            VALUES ($1)
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
            SELECT * FROM public."classes";
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
            SELECT * FROM public."classes" WHERE idClasses = $1;
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

  async updateClasses(classes: Classes): Promise<Classes> {
    const query = `
            UPDATE public."classes"
            SET class = $1
            WHERE idClasses = $2
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
            DELETE FROM public."classes"
            WHERE idClasses = $1
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
