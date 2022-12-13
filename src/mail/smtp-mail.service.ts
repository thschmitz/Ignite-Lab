import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';

@Injectable()
export class SMTPMail implements MailService {
  sendEmail(): string {
    return 'SMTP Mail!';
  }
}
