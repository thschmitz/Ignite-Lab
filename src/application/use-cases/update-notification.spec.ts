import { Content } from '@application/entities/content';
import { PrismaNotificationMapper } from '@infra/database/prisma/mapper/prisma-notification-mapper';
import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { UpdateNotification } from './update-notification';

describe('Send Notification', () => {
  it('should be able to update a notification', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();
    const updateNotification = new UpdateNotification(notificationsRepository);

    const notification = makeNotification();

    await notificationsRepository.create(notification);
    await updateNotification.execute(
      { notificationId: notification.id },
      { recipientId: '', content: 'testando', category: 'teste' },
    );

    const finalNotification = await PrismaNotificationMapper.toPrisma(
      notificationsRepository.notifications[0],
    );

    expect(finalNotification.content).toEqual('testando'); // Espero que o campo content seja igual ao valor que eu acabei de editar!
    expect(finalNotification.category).toEqual('teste');
  });
});
