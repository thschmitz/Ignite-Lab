import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { UpdateNotificationBody } from '@infra/http/dtos/update-notification-body';
import { Notification as rawNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static updateToPrisma(
    notification: Notification,
    body: UpdateNotificationBody,
  ) {
    return {
      id: notification.id,
      category: body.category || notification.category,
      content: body.content || notification.content.value,
      recipientId: body.recipientId || notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  static updateToDomain(notification: any, body: UpdateNotificationBody) {
    return {
      id: notification.id,
      category: body.category || notification.category,
      content: new Content(body.content) || new Content(notification.content),
      recipientId: body.recipientId || notification.recipientId,
      readAt: notification.readAt,
      canceledAt: notification.canceledAt,
      createdAt: notification.createdAt,
    };
  }

  //Notificacao do prisma para a camada das entidades
  static toDomain(raw: rawNotification): Notification {
    return new Notification(
      {
        category: raw.category,
        content: new Content(raw.content),
        recipientId: raw.recipientId,
        readAt: raw.readAt,
        canceledAt: raw.canceledAt,
        createdAt: raw.createdAt,
      },
      raw.id,
    );
  }
}
