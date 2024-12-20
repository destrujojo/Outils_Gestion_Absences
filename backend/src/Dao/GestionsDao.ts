import { QueryResult } from "pg";
import pool from "../Db/Db";
import Gestions from "../Models/GestionsModels";
import { UUID } from "crypto";

class GestionsDao {
  async createGestions(
    idUtilisateurs: UUID,
    idEvenements: UUID,
    idStatusGestions: UUID
  ): Promise<Gestions> {
    const query = `
            INSERT INTO public."Gestions" ("idGestions", "idUtilisateurs", "idEvenements", "idStatusGestions") 
            VALUES (gen_random_uuid(), $1, $2, $3)
            RETURNING *;
        `;
    const values = [idUtilisateurs, idEvenements, idStatusGestions];

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

  async findById(id: UUID): Promise<Gestions> {
    const query = `
            SELECT * FROM public."Gestions" WHERE "idGestions" = $1;
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
            SET "idUtilisateurs" = $1, "idEvenements" = $3, "idStatusGestions" = $4
            WHERE "idGestions" = $5
            RETURNING *;
        `;
    const values = [
      gestions.idUtilisateurs,
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

  async deleteGestions(id: UUID): Promise<void> {
    const query = `
            DELETE FROM public."Gestions"
            WHERE "idGestions" = $1;
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

  async gestionsTableauSuiviEtudiant(
    mail: string,
    classes: string | null,
    dateDebut: Date | null,
    dateFin: Date | null
  ) {
    const query = `
      Select sta_ges."statusGestions",
        typ_eve."typesEvenements",  
        eve."commentaire",
        eve."date",
        eve."duree",
		    fic."idFichiers"
      From public."Gestions" ges
        LEFT JOIN public."StatusGestions" sta_ges ON sta_ges."idStatusGestions" = ges."idStatusGestions"
        LEFT JOIN public."Utilisateurs" uti ON uti."idUtilisateurs" = ges."idUtilisateurs"
        LEFT JOIN public."Classes" cla ON cla."idClasses" = uti."idClasses"
        LEFT JOIN public."Evenements" eve ON eve."idEvenements" = ges."idEvenements"
        LEFT JOIN public."TypesEvenements" typ_eve ON typ_eve."idTypesEvenements" = eve."idTypesEvenements"
		    LEFT JOIN public."Fichiers" fic ON fic."idEvenements" = eve."idEvenements"
      WHERE uti."mail" = $1
        AND ($2::TEXT IS NULL OR cla."classes" = $2::TEXT)
        AND ($3::DATE IS NULL OR eve."date" >= $3::DATE)
        AND ($4::DATE IS NULL OR eve."date" <= $4::DATE);
    `;

    const values = [mail, classes, dateDebut, dateFin];
    try {
      const result: QueryResult = await pool.query(query, values);
      console.log(result.rows);
      return result.rows;
    } catch (error: any) {
      console.log(error);
      throw new Error(
        `Erreur lors de la récupération du tableau de suivi de l'étudiant: ${error.message}`
      );
    }
  }
}

export default new GestionsDao();
