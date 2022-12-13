import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {} // Inversao de dependencia, ele nao busca informacoes, mas recebe

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
