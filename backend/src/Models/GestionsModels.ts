import { UUID } from "crypto";

export interface Gestions {
  idGestions: number;
  idUtilisateurs: UUID;
  idNotifications: number;
  idEvenements: number;
  idStatusGestions: number;
}

export default Gestions;
