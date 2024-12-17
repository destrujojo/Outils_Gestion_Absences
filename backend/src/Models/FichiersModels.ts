import { UUID } from "crypto";

export interface Fichiers {
  idFichiers: UUID;
  idEvenements: UUID;
  idFormatsFichiers: UUID;
  chemin: string;
  nom: string;
}

export default Fichiers;
