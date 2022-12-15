import { Body, Controller, Post, Get } from '@nestjs/common';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { NotificationMapper } from '../mapper/notification-mapper';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Get()
  getHello() {
    console.log('Hello');
    return 'Hello World!';
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // Precisamos de um Decorator para conseguir o Req e o Res
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    const raw = NotificationMapper.toHTTP(notification);

    return {
      notification: raw,
    };
  }
}
