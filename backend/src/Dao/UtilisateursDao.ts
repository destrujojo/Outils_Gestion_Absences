import { QueryResult } from "pg";
import pool from "../Db/Db";
import Utilisateurs from "../Models/UtilisateursModels";

class UtilisateursDao {
  async createUtilisateurs(utilisateurs: Utilisateurs): Promise<Utilisateurs> {
    const query = `
            INSERT INTO public."Utilisateurs" (
              "idUtilisateurs",
              "idRoles",
              "idClasses",
              "nom",
              "prenom",
              "mail",
              "mdp",
              "resetMdp",
              "codeUnique",
              "nbRetards",
              "nbAbsences",
              "tempsTotRetards",
              "tempsTotAbsences",
              "semestreRetardabsenses",
              "nbEssais"
            )
            VALUES (
              gen_random_uuid(),
              $1,
              $2,
              $3,
              $4,
              $5,
              $6,
              $7,
              $8,
              $9,
              $10,
              $11,
              $12,
              $13,
              $14
            )
            RETURNING *;
        `;
    const values = [
      utilisateurs.idRoles,
      utilisateurs.idClasses,
      utilisateurs.nom,
      utilisateurs.prenom,
      utilisateurs.mail,
      utilisateurs.mdp,
      utilisateurs.resetMdp,
      utilisateurs.codeUnique,
      utilisateurs.nbRetards,
      utilisateurs.nbAbsences,
      utilisateurs.tempsTotRetards,
      utilisateurs.tempsTotAbsences,
      utilisateurs.semestreRetardsAbsenses,
      utilisateurs.nbEssais,
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
            SELECT * FROM public."Utilisateurs";
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
            SELECT * FROM public."Utilisateurs" WHERE idUtilisateurs = $1;
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
            SELECT * FROM public."Utilisateurs" WHERE mail = $1;
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
            UPDATE public."Utilisateurs"
            SET idRoles = $1,
                idClasses = $2,
                nom = $3,
                prenom = $4,
                mail = $5,
                mdp = $6,
                resetMdp = $7,
                codeUnique = $8,
                nbRetards = $9,
                nbAbsences = $10,
                tempsTotRetards = $11,
                tempsTotAbsences = $12,
                semestreRetardAbsenses = $13,
                nbEssais = $14
            WHERE idUtilisateurs = $15
            RETURNING *;
        `;
    const values = [
      utilisateurs.idRoles,
      utilisateurs.idClasses,
      utilisateurs.nom,
      utilisateurs.prenom,
      utilisateurs.mail,
      utilisateurs.mdp,
      utilisateurs.resetMdp,
      utilisateurs.codeUnique,
      utilisateurs.nbRetards,
      utilisateurs.nbAbsences,
      utilisateurs.tempsTotRetards,
      utilisateurs.tempsTotAbsences,
      utilisateurs.semestreRetardsAbsenses,
      utilisateurs.nbEssais,
      utilisateurs.idUtilisateurs,
    ];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la mise à jour de l'utilisateur: ${error.message}`
      );
    }
  }

  async deleteUtilisateurs(id: number): Promise<Utilisateurs> {
    const query = `
            DELETE FROM public."Utilisateurs" WHERE idUtilisateurs = $1
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
