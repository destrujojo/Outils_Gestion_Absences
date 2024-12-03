import { UUID } from "crypto";

export interface Notifications {
  idNotifications: UUID;
  idStatusNotifications: UUID;
  message: string;
}

export default Notifications;
