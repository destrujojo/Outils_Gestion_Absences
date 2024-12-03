import { QueryResult } from "pg";
import pool from "../Db/Db";
import TypesEvenements from "../Models/TypesEvenementsModels";

class TypesEvenementsDao {
  async createTypesEvenements(
    typesEvenements: TypesEvenements
  ): Promise<TypesEvenements> {
    const query = `
            INSERT INTO public."typesEvenements" (typesEvenements) 
            VALUES ($1)
            RETURNING *;
        `;
    const values = [typesEvenements.typesEvenements];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création du type d'événement: ${error.message}`
      );
    }
  }

  async findAll(): Promise<TypesEvenements[]> {
    const query = `
            SELECT * FROM public."typesEvenements";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des types d'événements: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<TypesEvenements> {
    const query = `
            SELECT * FROM public."typesEvenements" WHERE idTypesEvenements = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du type d'événement: ${error.message}`
      );
    }
  }

  async updateTypesEvenements(
    typesEvenements: TypesEvenements
  ): Promise<TypesEvenements> {
    const query = `
            UPDATE public."typesEvenements"
            SET typesEvenements = $1
            WHERE idTypesEvenements = $2
            RETURNING *;
        `;
    const values = [
      typesEvenements.typesEvenements,
      typesEvenements.idTypesEvenements,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour du type d'événement: ${error.message}`
      );
    }
  }

  async deleteTypesEvenements(id: number): Promise<TypesEvenements> {
    const query = `
            DELETE FROM public."typesEvenements" WHERE idTypesEvenements = $1
            RETURNING *;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression du type d'événement: ${error.message}`
      );
    }
  }
}

export default new TypesEvenementsDao();
