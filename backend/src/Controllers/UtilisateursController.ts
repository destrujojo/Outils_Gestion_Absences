import { Request, Response } from "express";
import UtilisateursDao from "../Dao/UtilisateursDao";
import UtilisateursServices from "../Services/UtilisateursServices";
const Utilisateur = require("../Models/UtilisateursModels");

class UtilisateursController {
  async createUtilisateur(req: Request, res: Response) {
    const { classes, ...otherField } = req.body;
    const utilisateur = { ...otherField };
    try {
      const newUtilisateur = await UtilisateursServices.createUtilisateurs(
        utilisateur,
        classes
      );
      res.status(201).json(newUtilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async loginUtilisateurs(req: Request, res: Response) {
    const { mail, mdp } = req.body;
    try {
      const login = await UtilisateursServices.loginUtilisateurs({ mail, mdp });
      res.status(200).json(login);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const utilisateurs = await UtilisateursDao.findAll();
      res.status(200).json(utilisateurs);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const utilisateur = await UtilisateursDao.findById(id);
      res.status(200).json(utilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findByEmail(req: Request, res: Response) {
    const email = req.body.mail;
    try {
      const utilisateur = await UtilisateursDao.findByMail(email);
      res.status(200).json(utilisateur);
      // return true;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      // return false;
    }
  }

  async findByEmailEtudiant(req: Request, res: Response) {
    const email = req.body.mail;
    try {
      const utilisateur = await UtilisateursDao.findByMailEtudiant(email);
      res.status(200).json(utilisateur);
      // return true;
    } catch (error: any) {
      res.status(400).json({ message: error.message });
      // return false;
    }
  }

  async recuperationNbEssais(req: Request, res: Response) {
    const mail = req.body.mail;
    try {
      const nbEssais = await UtilisateursDao.recuperationNbEssais(mail);
      // console.log(nbEssais);
      res.status(200).json(nbEssais);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async recuperationBlocage(req: Request, res: Response) {
    const mail = req.body.mail;
    try {
      const blocage = await UtilisateursDao.recuperationBlocage(mail);
      // console.log(blocage);
      res.status(200).json(blocage);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateBlocage(req: Request, res: Response) {
    const { tableau } = req.body;
    try {
      const result = await UtilisateursServices.updateBlocage(tableau);
      // console.log(result);
      res.status(204).json();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateNbEssais(req: Request, res: Response) {
    const { mail, nbEssais, etat } = req.body;
    try {
      const result = await UtilisateursServices.updateNbEssais(
        mail,
        nbEssais,
        etat
      );
      // console.log(result);
      res.status(204).json();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateUtilisateur(req: Request, res: Response) {
    const utilisateur = new Utilisateur(req.body);
    try {
      const updateUtilisateur = await UtilisateursDao.updateUtilisateurs(
        utilisateur
      );
      res.status(200).json(updateUtilisateur);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteUtilisateur(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      await UtilisateursDao.deleteUtilisateurs(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async generateCode(req: Request, res: Response) {
    const email = req.body.email;
    try {
      const code = await UtilisateursServices.generateCode(email);
      res.status(204).json();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifMail(req: Request, res: Response) {
    const { mail } = req.body;
    try {
      const codeResult = await UtilisateursServices.verifMail(mail);
      res.status(200).json(codeResult);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async verifCode(req: Request, res: Response) {
    const { email, code } = req.body;
    try {
      const codeResult = await UtilisateursServices.verifyCode(email, code);
      res.status(200).json(codeResult);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async resetCode(req: Request, res: Response) {
    const email = req.body.email;
    try {
      const code = await UtilisateursServices.resetCode(email);
      res.status(204).json();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateMdp(req: Request, res: Response) {
    const { email, mdp } = req.body;
    try {
      const code = await UtilisateursServices.updateMdp(email, mdp);
      res.status(204).json();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UtilisateursController();
