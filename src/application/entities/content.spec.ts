import { Content } from './content';

describe('Notification Content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Voce recebeu uma solicitacao de amizade!');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    const content = new Content('aaa');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    const content = new Content('aaa'.repeat(250));

    expect(content).toBeTruthy();
  });
});
