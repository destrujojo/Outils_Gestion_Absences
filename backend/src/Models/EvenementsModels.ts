import { UUID } from "crypto";

export interface Evenements {
  idEvenements: UUID;
  idTypesEvenements: UUID;
  commentaire: string;
  dateDebut: Date;
  dateFin: Date;
  duree: number;
}

export default Evenements;
