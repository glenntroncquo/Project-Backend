import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { OrderController } from './order.controller'
import { OrderService } from './order.service'

@Module({
  controllers: [OrderController],
  imports: [DatabaseModule],
  providers: [...repositoryProviders, OrderService],
  exports: [OrderService],
})
export class OrderModule {}
