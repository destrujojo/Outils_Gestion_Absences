import FichiersDao from "../Dao/FichiersDao";
import FormatsFichiersDao from "../Dao/FormatsFichiersDao";
import multer from "multer";
import scp from "node-scp";
import { Fichiers } from "../Models/FichiersModels";
import { UUID } from "crypto";
import path from "path";

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
  async telechargerFichiers(idFichier: string): Promise<Fichiers | null> {
    if (!idFichier) {
      throw new Error("L'identifiant du fichier est requis !");
    }

    try {
      const fichier = await FichiersDao.findById(idFichier);
      if (!fichier) {
        throw new Error("Fichier non trouvé !");
      }

      const client = await this.initialiserClientScp();
      const destinationLocale = `downloads/${fichier.nom}`;

      console.log(
        `Téléchargement du fichier : ${fichier.chemin} -> ${destinationLocale}`
      );
      await client.downloadFile(fichier.chemin, destinationLocale);
      await client.close();

      return fichier;
    } catch (erreur: any) {
      console.error(
        "Erreur lors du téléchargement du fichier :",
        erreur.message
      );
      throw new Error("Erreur lors de la récupération du fichier !");
    }
  }
}

export default new FichiersServices();
