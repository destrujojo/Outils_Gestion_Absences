import { QueryResult } from "pg";
import pool from "../Db/Db";
import FormatsFichiers from "../Models/FormatsFichiersModels";

class FormatsFichiersDao {
  async createFormatsFichiers(
    formatsFichiers: FormatsFichiers
  ): Promise<FormatsFichiers> {
    const query = `
            INSERT INTO public."FormatsFichiers" (idFormatsFichiers, formatFichiers) 
            VALUES (gen_random_uuid(), $1)
            RETURNING *;
        `;
    const values = [formatsFichiers.formatsFichiers];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création du format de fichier: ${error.message}`
      );
    }
  }

  async findAll(): Promise<FormatsFichiers[]> {
    const query = `
            SELECT * FROM public."FormatsFichiers";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des formats de fichiers: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<FormatsFichiers> {
    const query = `
            SELECT * FROM public."FormatsFichiers" WHERE "idFormatsFichiers" = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du format de fichier: ${error.message}`
      );
    }
  }

  async findByExtension(
    formatFichiers: string | undefined
  ): Promise<FormatsFichiers> {
    const query = `
            SELECT * FROM public."FormatsFichiers" WHERE "formatsFichiers" = $1;
        `;
    const values = [formatFichiers];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du format de fichier: ${error.message}`
      );
    }
  }

  async updateFormatsFichiers(
    formatsFichiers: FormatsFichiers
  ): Promise<FormatsFichiers> {
    const query = `
            UPDATE public."FormatsFichiers"
            SET "formatsFichiers" = $1
            WHERE "idFormatsFichiers" = $2
            RETURNING *;
        `;
    const values = [
      formatsFichiers.formatsFichiers,
      formatsFichiers.idFormatsFichiers,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour du format de fichier: ${error.message}`
      );
    }
  }

  async deleteFormatsFichiers(id: number): Promise<FormatsFichiers> {
    const query = `
            DELETE FROM public."FormatsFichiers" WHERE "idFormatsFichiers" = $1
            RETURNING *;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression du format de fichier: ${error.message}`
      );
    }
  }
}

export default new FormatsFichiersDao();
