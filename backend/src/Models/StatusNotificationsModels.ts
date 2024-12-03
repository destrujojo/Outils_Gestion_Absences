import { UUID } from "crypto";

export interface StatusNotifications {
  idStatusNotification: UUID;
  statusNotification: string;
}

export default StatusNotifications;
