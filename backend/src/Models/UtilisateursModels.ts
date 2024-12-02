import { UUID } from "crypto";

const { v4: uuidv4 } = require("uuid");

export interface Utilisateurs {
  idUtilisateurs: UUID;
  idRoles: number;
  idClasses: number;
  nom: string;
  prenom: string;
  mail: string;
  resetMdp: boolean;
  codeUnique: string;
  mdp: string;
}

export default Utilisateurs;
