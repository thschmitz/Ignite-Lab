import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

// Partial esta deixando todos os campos opcionais
type Override = Partial<NotificationProps>;

// Override = sobrepor
export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Social',
    content: new Content('Nova solicitacao de amizade'),
    recipientId: 'recipient-1',
    ...override,
  });
}
