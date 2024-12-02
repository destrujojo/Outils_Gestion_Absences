import { Request, Response } from "express";
import RolesDao from "../Dao/RolesDao";
const Role = require("../Models/RolesModels");

class RolesController {
  async createRole(req: Request, res: Response) {
    const roles = new Role(req.body);
    try {
      const newRole = await RolesDao.createRoles(roles);
      res.status(201).json(newRole);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const roles = await RolesDao.findAll();
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const role = await RolesDao.findById(id);
      res.status(200).json(role);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new RolesController();
