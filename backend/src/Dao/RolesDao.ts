import { QueryResult } from "pg";
import pool from "../Db/Db";
import Roles from "../Models/RolesModels";

class RolesDao {
  async createRoles(roles: Roles): Promise<Roles> {
    const query = `
            INSERT INTO public."roles" (role) 
            VALUES ($1)
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
            SELECT * FROM public."roles";
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

  async findById(id: number): Promise<Roles> {
    const query = `
            SELECT * FROM public."roles" WHERE idRoles = $1;
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

  async updateRoles(roles: Roles): Promise<Roles> {
    const query = `
            UPDATE public."roles"
            SET role = $1
            WHERE idRoles = $2
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

  async deleteRoles(id: number): Promise<Roles> {
    const query = `
            DELETE FROM public."roles"
            WHERE idRoles = $1
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
