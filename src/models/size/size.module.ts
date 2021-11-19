import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { SizeController } from './size.controller'
import { SizeService } from './size.service'

@Module({
  controllers: [SizeController],
  imports: [DatabaseModule],
  providers: [...repositoryProviders, SizeService],
  exports: [SizeService],
})
export class SizeModule {}
