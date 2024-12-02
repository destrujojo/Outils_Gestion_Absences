import { QueryResult } from "pg";
import pool from "../Db/Db";
import Utilisateurs from "../Models/UtilisateursModels";

class UtilisateursDao {
  async createUtilisateurs(utilisateurs: Utilisateurs): Promise<Utilisateurs> {
    const query = `
            INSERT INTO public."utilisateurs" (idRoles, idClasses, nom, prenom, mail, resetMdp, codeUnique, mdp) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;
    const values = [
      utilisateurs.idRoles,
      utilisateurs.idClasses,
      utilisateurs.nom,
      utilisateurs.prenom,
      utilisateurs.mail,
      utilisateurs.resetMdp,
      utilisateurs.codeUnique,
      utilisateurs.mdp,
    ];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la création de l'utilisateur: ${error.message}`
      );
    }
  }

  async findAll(): Promise<Utilisateurs[]> {
    const query = `
            SELECT * FROM public."utilisateurs";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des utilisateurs: ${error.message}`
      );
    }
  }

  async findById(id: number): Promise<Utilisateurs> {
    const query = `
            SELECT * FROM public."utilisateurs" WHERE idUtilisateurs = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de l'utilisateur: ${error.message}`
      );
    }
  }

  async findByMail(mail: string): Promise<Utilisateurs> {
    const query = `
            SELECT * FROM public."utilisateurs" WHERE mail = $1;
        `;
    const values = [mail];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de l'utilisateur: ${error.message}`
      );
    }
  }

  async updateUtilisateurs(utilisateurs: Utilisateurs): Promise<Utilisateurs> {
    const query = `
            UPDATE public."utilisateurs"
            SET idRoles = $1, idClasses = $2, nom = $3, prenom = $4, mail = $5, resetMdp = $6, codeUnique = $7, mdp = $8
            WHERE idUtilisateurs = $9
            RETURNING *;
        `;
    const values = [
      utilisateurs.idRoles,
      utilisateurs.idClasses,
      utilisateurs.nom,
      utilisateurs.prenom,
      utilisateurs.mail,
      utilisateurs.resetMdp,
      utilisateurs.codeUnique,
      utilisateurs.mdp,
      utilisateurs.idUtilisateurs,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la modification de l'utilisateur: ${error.message}`
      );
    }
  }

  async deleteUtilisateurs(id: number): Promise<Utilisateurs> {
    const query = `
                DELETE FROM public."utilisateurs"
                WHERE idUtilisateurs = $1
                RETURNING *;
            `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression de l'utilisateur: ${error.message}`
      );
    }
  }
}

export default new UtilisateursDao();
