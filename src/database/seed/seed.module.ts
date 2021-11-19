import { Module } from '@nestjs/common'
import { DatabaseModule } from '../database.module'
import { repositoryProviders } from '../repository.providers'
import { SeedService } from './seed.service'
@Module({
  imports: [DatabaseModule],
  providers: [...repositoryProviders, SeedService],
  exports: [SeedService],
})
export class SeedModule {}
