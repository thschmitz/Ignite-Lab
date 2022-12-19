import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
import { UpdateNotificationBody } from '@infra/http/dtos/update-notification-body';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface UpdateNotificationRequest {
  notificationId: string;
}

type UpdateNotificationResponse = void;

@Injectable()
export class UpdateNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: UpdateNotificationRequest,
    body: UpdateNotificationBody,
  ): Promise<UpdateNotificationResponse> {
    const { notificationId } = request;
    const { recipientId, category, content } = body;

    console.log(recipientId, category, content);

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    console.log(notification);

    if (!notification) {
      throw new NotificationNotFound();
    }

    await this.notificationsRepository.update(notification, body);
  }
}
