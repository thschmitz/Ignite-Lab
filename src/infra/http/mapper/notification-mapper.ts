import { Notification } from '@application/entities/notification';

export class NotificationMapper {
  static toHTTP(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
    };
  }
}
// Dinamiza na maneira de centralizar os dados e nao precisar configurar sempre a mesma coisa, feito para nao repetir codigo
// e melhorar a manutencao
