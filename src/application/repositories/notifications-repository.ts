import { Notification } from '../entities/notification';

// Aqui so acontece um contrato para fazermos a regra de negocio dessa classe
export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
}
