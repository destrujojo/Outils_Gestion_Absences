import { UUID } from "crypto";

export interface Gestions {
  idGestions: UUID;
  idUtilisateurs: UUID;
  idNotifications: UUID;
  idEvenements: UUID;
  idStatusGestions: UUID;
}

export default Gestions;
