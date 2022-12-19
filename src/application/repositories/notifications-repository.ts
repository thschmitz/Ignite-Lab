import { UpdateNotificationBody } from '@infra/http/dtos/update-notification-body';
import { Notification } from '../entities/notification';

// Aqui so acontece um contrato para fazermos a regra de negocio dessa classe
export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract findMany(): Promise<Notification[]>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findManyByRecipientId(recipientId: string): Promise<Notification[]>;
  abstract update(
    notification: Notification,
    body: UpdateNotificationBody,
  ): Promise<void>;
}
