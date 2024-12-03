import { QueryResult } from "pg";
import pool from "../Db/Db";
import Fichiers from "../Models/FichiersModels";

class FichiersDao {
  async createFichiers(fichiers: Fichiers): Promise<Fichiers> {
    const query = `
            INSERT INTO public."Fichiers" (idFichiers, idEvenements, idFormatsFichiers, chemin) 
            VALUES (gen_random_uuid(), $1, $2, $3)
            RETURNING *;
        `;
    const values = [
      fichiers.idEvenements,
      fichiers.idFormatsFichiers,
      fichiers.chemin,
    ];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création du fichier: ${error.message}`
      );
    }
  }

  async findAll(): Promise<Fichiers[]> {
    const query = `
            SELECT * FROM public."Fichiers";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des fichiers: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<Fichiers> {
    const query = `
            SELECT * FROM public."Fichiers" WHERE idFichiers = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du fichier: ${error.message}`
      );
    }
  }

  async updateFichiers(fichiers: Fichiers): Promise<Fichiers> {
    const query = `
            UPDATE public."Fichiers"
            SET idEvenements = $1, idFormatsFichiers = $2, chemin = $3
            WHERE idFichiers = $4
            RETURNING *;
        `;
    const values = [
      fichiers.idEvenements,
      fichiers.idFormatsFichiers,
      fichiers.chemin,
      fichiers.idFichiers,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la modification du fichier: ${error.message}`
      );
    }
  }

  async deleteFichiers(id: number): Promise<Fichiers> {
    const query = `
            DELETE FROM public."Fichiers" WHERE idFichiers = $1 RETURNING *;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression du fichier: ${error.message}`
      );
    }
  }
}

export default new FichiersDao();
