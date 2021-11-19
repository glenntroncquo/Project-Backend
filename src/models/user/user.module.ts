import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { repositoryProviders } from 'src/database/repository.providers'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  imports: [DatabaseModule],
  providers: [...repositoryProviders, UserService],
  exports: [UserService],
})
export class UserModule {}
