import { QueryResult } from "pg";
import pool from "../Db/Db";
import Roles from "../Models/RolesModels";
import { UUID } from "crypto";

class RolesDao {
  async createRoles(roles: Roles): Promise<Roles> {
    const query = `
            INSERT INTO public."Roles" (idRoles, roles) 
            VALUES (gen_random_uuid(), $1)
            RETURNING *;
        `;
    const values = [roles.roles];

    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(`Erreur lors de la création du rôle: ${error.message}`);
    }
  }

  async findAll(): Promise<Roles[]> {
    const query = `
            SELECT * FROM public."Roles";
        `;
    try {
      const result: QueryResult = await pool.query(query);
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération des rôles: ${error.message}`
      );
    }
  }

  async findById(id: UUID): Promise<Roles> {
    const query = `
            SELECT * FROM public."Roles" WHERE "idRoles" = $1;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du rôle: ${error.message}`
      );
    }
  }

  async findIdByRoles(roles: string): Promise<UUID> {
    const query = `
            SELECT "idRoles" FROM public."Roles" WHERE "roles" = $1;
        `;
    const values = [roles];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0].idRoles;
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération de l'id du rôle: ${error.message}`
      );
    }
  }

  async findRoles(roles: string): Promise<Roles> {
    const query = `
            SELECT * FROM public."Roles" WHERE "roles" = $1;
        `;
    const values = [roles];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du rôle: ${error.message}`
      );
    }
  }

  async findByMail(mail: string): Promise<Roles> {
    const query = `
            SELECT rol.* 
            FROM public."Utilisateurs" uti
              LEFT JOIN public."Roles" rol ON rol."idRoles" = uti."idRoles"
            WHERE uti."mail" = $1;
        `;
    const values = [mail];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la récupération du rôle: ${error.message}`
      );
    }
  }

  async updateRoles(roles: Roles): Promise<Roles> {
    const query = `
            UPDATE public."Roles"
            SET "roles" = $1
            WHERE "idRoles" = $2
            RETURNING *;
        `;
    const values = [roles.roles, roles.idRoles];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la modification du rôle: ${error.message}`
      );
    }
  }

  async deleteRoles(id: UUID): Promise<Roles> {
    const query = `
            DELETE FROM public."Roles"
            WHERE "idRoles" = $1
            RETURNING *;
        `;
    const values = [id];
    try {
      const result: QueryResult = await pool.query(query, values);
      return result.rows[0];
    } catch (error: any) {
      throw new Error(
        `Erreur lors de la suppression du rôle: ${error.message}`
      );
    }
  }
}

export default new RolesDao();
