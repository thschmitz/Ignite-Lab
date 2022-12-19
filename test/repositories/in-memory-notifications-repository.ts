import { NotificationsRepository } from '@application/repositories/notifications-repository';
import { Notification } from '@application/entities/notification';
import { UpdateNotificationBody } from '@infra/http/dtos/update-notification-body';
import { PrismaNotificationMapper } from '@infra/database/prisma/mapper/prisma-notification-mapper';
import { Content } from '@application/entities/content';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  findMany(): Promise<Notification[]> {
    throw new Error('Method not implemented.');
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id === notificationId,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    );
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientId === recipientId,
    ).length;
  }

  async update(
    notification: Notification,
    body: UpdateNotificationBody,
  ): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex].content =
        new Content(body.content) ||
        this.notifications[notificationIndex].content;
      this.notifications[notificationIndex].category =
        body.category || this.notifications[notificationIndex].category;
      this.notifications[notificationIndex].recipientId =
        body.recipientId || this.notifications[notificationIndex].recipientId;
    }
    console.log('AA: ', this.notifications);
  }
}
