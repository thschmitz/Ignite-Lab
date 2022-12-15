import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma solicitacao de amizade!');

    expect(content).toBeTruthy();
  });
});
