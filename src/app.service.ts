import { Injectable, OnApplicationBootstrap } from '@nestjs/common'
import { SeedService } from './database/seed/seed.service'
import { Pizza } from './models/pizza/pizza.entity'
import { Size } from './models/size/size.entity'
import { Topping } from './models/topping/topping.entity'
import { User } from './models/user/user.entity'

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(private readonly seedService: SeedService) {}

  getHello(): string {
    return 'Hello World!'
  }

  async onApplicationBootstrap() {
    // Seed users if not exists
    const users: User[] = await this.seedService.findUser()
    users.length > 0 ? null : this.seedService.seedUser()

    // Seed pizza if not exists
    const pizzas: Pizza[] = await this.seedService.findPizza()
    pizzas.length > 0 ? null : await this.seedService.seedPizza()

    // Seed size if not exists
    const sizes: Size[] = await this.seedService.findSize()
    sizes.length > 0 ? null : await this.seedService.seedSize()

    // Seed toppings if not exists
    const toppings: Topping[] = await this.seedService.findTopping()
    toppings.length > 0 ? null : await this.seedService.seedTopping()
  }
}
