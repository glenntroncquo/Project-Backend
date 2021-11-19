import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { SeedModule } from './database/seed/seed.module'
import { DatabaseModule } from './database/database.module'
import { UserModule } from './models/user/user.module'
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy'
import { ConfigModule } from '@nestjs/config'
import { PizzaModule } from './models/pizza/pizza.module'
import { OrderModule } from './models/order/order.module'
import { SizeModule } from './models/size/size.module'
import { ToppingModule } from './models/topping/topping.module'
import { GraphQLModule } from '@nestjs/graphql'

@Module({
  imports: [
    DatabaseModule,
    SeedModule,
    UserModule,
    PizzaModule,
    OrderModule,
    SizeModule,
    ToppingModule,
    FirebaseAuthStrategy,
    // declare this to use dot env files
    ConfigModule.forRoot({
      envFilePath: ['ormconfig.env', '.env'],
    }),
    GraphQLModule.forRoot({
      installSubscriptionHandlers: true,
      autoSchemaFile: true,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
