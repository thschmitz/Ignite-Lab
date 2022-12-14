import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { HttpModule } from './http.module';
import { PrismaService } from './prisma.service';

// Acomplador de servicos e de controladores
@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [PrismaService], // Services
})
export class AppModule {}

// Injecao de dependencia -> Esta injetando dentro do AppController, nao estou passando para ele em momento nenhum.
