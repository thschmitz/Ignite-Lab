import { NotificationNotFound } from '@application/use-cases/errors/notification-not-found';
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
  ): Promise<UpdateNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationsRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationsRepository.save(notification);
  }
}
