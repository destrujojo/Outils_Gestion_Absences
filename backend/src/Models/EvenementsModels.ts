import { UUID } from "crypto";

export interface Evenements {
  idEvenements: UUID;
  idTypesEvenements: UUID;
  commentaire: string;
  date: Date;
  duree: string;
}

export default Evenements;
