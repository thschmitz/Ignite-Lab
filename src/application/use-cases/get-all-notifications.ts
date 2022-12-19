import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notifications-repository';

interface getRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetAllNotifications {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(): Promise<getRecipientNotificationsResponse> {
    // A resposta esperada eh uma Promise, pq eh um metodo async, que temque ser no formato Notification
    const notifications = await this.notificationsRepository.findMany();

    return {
      notifications,
    };
  }
}
