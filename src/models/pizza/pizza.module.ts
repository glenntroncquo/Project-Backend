import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { PizzaController } from './pizza.controller'
import { PizzaService } from './pizza.service'

@Module({
  controllers: [PizzaController],
  imports: [DatabaseModule],
  providers: [...repositoryProviders, PizzaService],
  exports: [PizzaService],
})
export class PizzaModule {}
