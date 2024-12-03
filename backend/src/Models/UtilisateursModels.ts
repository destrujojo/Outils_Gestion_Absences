import { UUID } from "crypto";

export interface Utilisateurs {
  idUtilisateurs: UUID;
  idRoles: UUID;
  idClasses: UUID;
  nom: string;
  prenom: string;
  mail: string;
  mdp: string;
  resetMdp: boolean;
  codeUnique: string;
  nbRetards: number;
  nbAbsences: number;
  tempsTotRetards: number;
  tempsTotAbsences: number;
  semestreRetardsAbsenses: string;
  nbEssais: number;
}

export default Utilisateurs;
