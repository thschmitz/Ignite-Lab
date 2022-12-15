import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/database.module';
import { HttpModule } from './infra/http/http.module';

// Acomplador de servicos e de controladores
@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}

// Injecao de dependencia -> Esta injetando dentro do AppController, nao estou passando para ele em momento nenhum.
