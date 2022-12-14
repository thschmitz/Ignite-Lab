// Mudei aqui tmb
import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationMapper } from '@infra/http/mapper/notification-mapper';
import { CancelNotification } from '@application/use-cases/cancel-notification';
import { ReadNotification } from '@application/use-cases/read-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CountRecipientNotification } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { UpdateNotification } from '@application/use-cases/update-notification';
import { UpdateNotificationBody } from '../dtos/update-notification-body';
import { GetAllNotifications } from '@application/use-cases/get-all-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotification,
    private getRecipientNotifications: GetRecipientNotifications,
    private updateNotification: UpdateNotification,
    private getAllNotifications: GetAllNotifications,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Put(':id/update')
  async update(@Param('id') id: string, @Body() body: UpdateNotificationBody) {
    const { recipientId, content, category } = body;
    await this.updateNotification.execute(
      {
        notificationId: id,
      },
      {
        recipientId,
        content,
        category,
      },
    );
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationMapper.toHTTP),
    };
  }

  @Get()
  async getNotifications() {
    const { notifications } = await this.getAllNotifications.execute();

    return {
      notifications: notifications.map(NotificationMapper.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: NotificationMapper.toHTTP(notification),
    };
  }
}
