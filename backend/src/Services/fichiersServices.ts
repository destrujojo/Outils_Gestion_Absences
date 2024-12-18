import FichiersDao from "../Dao/FichiersDao";
import FormatsFichiersDao from "../Dao/FormatsFichiersDao";
import multer from "multer";
import scp from "node-scp";
import { Fichiers } from "../Models/FichiersModels";
import { UUID } from "crypto";
import path from "path";
import fs from "fs";
import { Response } from "express";

interface Fichier {
  fieldname: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
}

class FichiersServices {
  // Configuration de stockage pour multer
  private stockage = multer.diskStorage({
    destination: (req, fichier, cb) => cb(null, "uploads/"),
    filename: (req, fichier, cb) => cb(null, fichier.originalname),
  });

  private televersement = multer({ storage: this.stockage });

  // Configuration SCP centralisée
  private configurationScp = {
    host: "10.40.150.2",
    port: 2222,
    username: "paj",
    password: "Junia_AP5",
  };

  // Gestion du téléversement des fichiers via multer
  gererTeleversementFichier() {
    return this.televersement.single("file");
  }

  // Initialisation du client SCP
  private async initialiserClientScp() {
    try {
      return await scp(this.configurationScp);
    } catch (erreur) {
      throw new Error(
        "Erreur lors de la connexion au serveur SCP : " +
          (erreur as Error).message
      );
    }
  }

  // Vérification et création du répertoire si nécessaire
  private async verifierOuCreerRepertoire(
    client: any,
    cheminRepertoire: string
  ) {
    try {
      const repertoireExiste = await client.exists(cheminRepertoire);
      if (!repertoireExiste) {
        await client.mkdir(cheminRepertoire);
        console.log(`Répertoire créé : ${cheminRepertoire}`);
      }
    } catch (erreur) {
      throw new Error(
        `Erreur lors de la vérification ou création du répertoire : ${cheminRepertoire}. ${
          (erreur as Error).message
        }`
      );
    }
  }

  // Dépôt d'un fichier
  async depoFichiers(
    fichier: Fichier,
    email: string,
    idEvenement: UUID
  ): Promise<Fichiers> {
    const nomFichier = fichier.originalname;
    const cheminRepertoire = `/home/paj/documents/${email}`;
    const cheminFichier = `${cheminRepertoire}/${nomFichier}`;
    let extensionFichier = nomFichier.split(".").pop();

    extensionFichier = extensionFichier?.toUpperCase();

    // console.log(`Nom du fichier : ${nomFichier}`);
    // console.log(`Chemin de destination : ${cheminFichier}`);

    try {
      const client = await this.initialiserClientScp();

      // Vérification ou création du répertoire
      await this.verifierOuCreerRepertoire(client, cheminRepertoire);

      // Téléversement du fichier
      await client.uploadFile(fichier.path, cheminFichier);
      await client.close();

      // Récupération des informations sur le format de fichier
      const formatFichier = await FormatsFichiersDao.findByExtension(
        extensionFichier
      );
      if (!formatFichier) {
        throw new Error(`Format de fichier inconnu : ${extensionFichier}`);
      }

      // Sauvegarde des informations du fichier dans la base de données
      const fichierSauvegarde = await FichiersDao.createFichiers(
        idEvenement,
        formatFichier.idFormatsFichiers,
        cheminFichier,
        nomFichier
      );

      console.log(`Fichier sauvegardé avec succès :`, fichierSauvegarde);
      return fichierSauvegarde;
    } catch (erreur: any) {
      console.error("Erreur lors du dépôt du fichier :", erreur.message);
      throw new Error("Erreur lors de la transmission du fichier !");
    }
  }

  // Téléchargement d'un fichier
  // async telechargerFichiers(
  //   idFichier: string,
  //   res: Response
  // ): Promise<Response | void> {
  //   if (!idFichier) {
  //     return res.status(400).send("L'identifiant du fichier est requis !");
  //   }

  //   try {
  //     const fichier = await FichiersDao.findById(idFichier);
  //     if (!fichier) {
  //       return res.status(404).send("Fichier non trouvé !");
  //     }

  //     const client = await this.initialiserClientScp();
  //     const userProfile = process.env.USERPROFILE || "";
  //     const destinationLocale = path.join(
  //       userProfile,
  //       "downloads",
  //       fichier.nom
  //     );

  //     console.log(
  //       `Téléchargement du fichier : ${fichier.chemin} -> ${destinationLocale}`
  //     );

  //     // Téléchargement du fichier depuis le serveur SCP
  //     await client.downloadFile(fichier.chemin, destinationLocale);
  //     await client.close();

  //     res.download(destinationLocale, fichier.nom, (erreur) => {
  //       if (erreur) {
  //         console.error(
  //           "Erreur lors de la réponse du téléchargement :",
  //           erreur.message
  //         );
  //         if (!res.headersSent) {
  //           return res.status(500).send("Erreur lors du téléchargement.");
  //         }
  //       } else {
  //         console.log("Fichier téléchargé avec succès :", fichier.nom);
  //       }
  //     });
  //   } catch (erreur: any) {
  //     console.error(
  //       "Erreur lors du téléchargement du fichier :",
  //       erreur.message
  //     );
  //     if (!res.headersSent) {
  //       return res
  //         .status(500)
  //         .send(
  //           "Erreur lors de la récupération ou du téléchargement du fichier."
  //         );
  //     }
  //   }
  // }

  async telechargerFichiers(idFichier: string): Promise<string | null> {
    try {
      const fichier = await FichiersDao.findById(idFichier);
      if (!fichier) {
        return null; // Si le fichier n'est pas trouvé
      }

      const userProfile = process.env.USERPROFILE || "";
      const destinationLocale = path.join(
        userProfile,
        "downloads",
        fichier.nom
      );

      console.log(
        `Téléchargement du fichier : ${fichier.chemin} -> ${destinationLocale}`
      );

      // Assurer que le fichier a une extension valide
      const extname = path.extname(fichier.nom);
      const fileWithExtension = extname ? fichier.nom : `${fichier.nom}.txt`; // Par défaut, on ajoute .txt

      // Renvoie le nom du fichier à télécharger
      return fileWithExtension;
    } catch (erreur: any) {
      console.error(
        "Erreur lors de la récupération du fichier :",
        erreur.message
      );
      return null;
    }
  }
}

export default new FichiersServices();
