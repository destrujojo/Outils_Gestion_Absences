import { Request, Response } from "express";
import FichiersDao from "../Dao/FichiersDao";
import fichiersServices from "../Services/fichiersServices";
import path from "path";
const Fichier = require("../Models/FichiersModels");
const fs = require("fs");

class FichiersController {
  async createFichier(req: Request, res: Response) {
    const { idEvenements, idFormatsFichiers, chemin, nom } = req.body;
    try {
      const newFichier = await FichiersDao.createFichiers(
        idEvenements,
        idFormatsFichiers,
        chemin,
        nom
      );
      res.status(201).json(newFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const fichiers = await FichiersDao.findAll();
      res.status(200).json(fichiers);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findById(req: Request, res: Response) {
    const id = req.body.idFichiers;
    try {
      const fichier = await FichiersDao.findById(id);
      res.status(200).json(fichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async findByIdEvenements(req: Request, res: Response) {
    const idEvenements = req.params.idEvenements;
    try {
      const fichiers = await FichiersDao.findByIdEvenements(idEvenements);
      res.status(200).json(fichiers);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async updateFichier(req: Request, res: Response) {
    const fichier = new Fichier(req.body);
    try {
      const updateFichier = await FichiersDao.updateFichiers(fichier);
      res.status(200).json(updateFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteFichier(req: Request, res: Response) {
    const id = req.params.id;
    try {
      await FichiersDao.deleteFichiers(id);
      res.status(204).end();
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async depoFichiers(req: Request, res: Response) {
    const { idEvenements, chemin, mail } = req.body;
    try {
      const newFichier = await fichiersServices.depoFichiers(
        chemin,
        mail,
        idEvenements
      );
      res.status(201).json(newFichier);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  // async telechargerFichiers(req: Request, res: Response) {
  //   const idFichiers = req.params.idFichiers;
  //   console.log(idFichiers);
  //   try {
  //     await fichiersServices.telechargerFichiers(idFichiers, res);

  //     res.status(200).end();
  //   } catch (error: any) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  async telechargerFichiers(req: Request, res: Response): Promise<void> {
    const { idFichiers } = req.params;

    // Appeler le service pour télécharger le fichier
    const fichier = await fichiersServices.telechargerFichiers(idFichiers);

    if (!fichier) {
      res.status(404).send("Fichier non trouvé !");
    } else {
      try {
        // Utiliser un flux de lecture pour envoyer le fichier
        const fichierStream = fs.createReadStream(fichier.chemin);

        fichierStream.on("error", (erreur: { message: any }) => {
          console.error("Erreur lors de l'envoi du fichier :", erreur.message);
          if (!res.headersSent) {
            res.status(500).send("Erreur lors du téléchargement du fichier.");
          }
        });

        // Configurer les en-têtes pour le téléchargement
        res.setHeader("Content-Type", "application/octet-stream");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${fichier.nom}"`
        );

        // Pipe le fichier dans la réponse
        fichierStream.pipe(res);
        // res.status(201).json({ fileName: fileName });
      } catch (erreur: any) {
        console.error("Erreur lors de l'envoi du fichier :", erreur.message);
        if (!res.headersSent) {
          res.status(500).send("Erreur lors de l'envoi du fichier.");
        }
      }
    }
  }
}

export default new FichiersController();
