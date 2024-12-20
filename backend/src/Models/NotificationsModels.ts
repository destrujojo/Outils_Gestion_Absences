import { UUID } from "crypto";

export interface Notifications {
  idNotifications: UUID;
  idStatusNotifications: UUID;
  message: string;
  idRoles: UUID;
  idGestions: UUID;
}

export default Notifications;
