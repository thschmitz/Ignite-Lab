import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from './http.module';
import { MailService } from './mail/mail.service';
import { PostmarkMail } from './mail/postmark-mail.service';
import { SMTPMail } from './mail/smtp-mail.service';

// Acomplador de servicos e de controladores
@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    {
      provide: MailService,
      useClass: PostmarkMail,
    },
  ], // Services
})
export class AppModule {}

// Injecao de dependencia -> Esta injetando dentro do AppController, nao estou passando para ele em momento nenhum.
