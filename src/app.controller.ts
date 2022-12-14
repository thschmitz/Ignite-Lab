import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { randomUUID } from 'node:crypto';
import { CreateNotificationBody } from './create-notification-body';

@Controller('notifications')
export class AppController {
  constructor(private readonly prismaService: PrismaService) {} // Inversao de dependencia, ele nao busca informacoes, mas recebe

  @Get()
  getHello() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // Precisamos de um Decorator para conseguir o Req e o Res
    const { recipientId, content, category } = body;
    /*await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        content: 'Voce tem uma nova solicitacao de amizade',
        category: 'Social',
        recipientId: randomUUID(),
      },
    });*/
  }
}
