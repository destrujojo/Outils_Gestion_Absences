import { QueryResult } from "pg";
import pool from "../Db/Db";
import Evenements from "../Models/EvenementsModels";
import { UUID } from "crypto";

class EvenementsDao {
  async createEvenements(
    idTypesEvenements: UUID,
    commentaire: string,
    date: Date,
    duree: string
  ): Promise<Evenements> {
    const query = `
            INSERT INTO public."Evenements" ("idEvenements", "idTypesEvenements", "commentaire", "date", "duree") 
            VALUES (gen_random_uuid(), $1, $2, $3, $4)
            RETURNING *;
        `;
    const values = [idTypesEvenements, commentaire, date, duree];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de l'événement: ${error.message}`
      );
    }
  }

  async findAll(): Promise<Evenements[]> {
    const query = `
            SELECT * FROM public."Evenements";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des événements: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<Evenements> {
    const query = `
            SELECT * FROM public."Evenements" WHERE "idEvenements" = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de l'événement: ${error.message}`
      );
    }
  }

  async updateEvenements(evenements: Evenements): Promise<Evenements> {
    const query = `
            UPDATE public."Evenements"
            SET "idTypeEvenements" = $1, "commentaire" = $2, "date" = $3, "duree" = $4
            WHERE "idEvenements" = $6
            RETURNING *;
        `;
    const values = [
      evenements.idTypesEvenements,
      evenements.commentaire,
      evenements.date,
      evenements.duree,
      evenements.idEvenements,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour de l'événement: ${error.message}`
      );
    }
  }

  async deleteEvenements(id: number): Promise<Evenements> {
    const query = `
            DELETE FROM public."Evenements"
            WHERE "idEvenements" = $1
            RETURNING *;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression de l'événement: ${error.message}`
      );
    }
  }
}

export default new EvenementsDao();
