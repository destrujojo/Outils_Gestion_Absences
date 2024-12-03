import { Request, Response } from "express";
import TypesEvenementsDao from "../Dao/TypesEvenementsDao";
const TypesEvenement = require("../Models/TypesEvenementsModels");

class TypesEvenementsController {
  async createTypesEvenement(req: Request, res: Response) {
    const typesEvenements = new TypesEvenement(req.body);
    try {
      const newTypesEvenement = await TypesEvenementsDao.createTypesEvenements(
        typesEvenements
      );
      res.status(201).json(newTypesEvenement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const typesEvenements = await TypesEvenementsDao.findAll();
      res.status(200).json(typesEvenements);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const typesEvenement = await TypesEvenementsDao.findById(id);
      res.status(200).json(typesEvenement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateTypesEvenement(req: Request, res: Response) {
    const typesEvenement = new TypesEvenement(req.body);
    try {
      const updateTypesEvenement =
        await TypesEvenementsDao.updateTypesEvenements(typesEvenement);
      res.status(200).json(updateTypesEvenement);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteTypesEvenement(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await TypesEvenementsDao.deleteTypesEvenements(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new TypesEvenementsController();
