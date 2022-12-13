import { Controller, Get } from '@nestjs/common';
// import { AppService } from './app.service';
import { MailService } from './mail/mail.service';

@Controller()
export class AppController {
  constructor(private readonly mailService: MailService) {} // Inversao de dependencia, ele nao busca informacoes, mas recebe

  @Get()
  getHello(): string {
    return this.mailService.sendEmail();
  }
}
