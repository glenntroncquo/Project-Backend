import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { ToppingController } from './topping.controller'
import { ToppingService } from './topping.service'

@Module({
  controllers: [ToppingController],
  imports: [DatabaseModule],
  providers: [...repositoryProviders, ToppingService],
  exports: [ToppingService],
})
export class ToppingModule {}
