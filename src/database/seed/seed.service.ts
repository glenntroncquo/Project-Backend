import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from 'src/models/pizza/pizza.entity'
import { User } from 'src/models/user/user.entity'
import { Size } from 'src/models/size/size.entity'
import { Topping } from 'src/models/topping/topping.entity'

import users from '../data/user.json'
import pizzasjson from '../data/pizza.json'
import sizes from '../data/size.json'
import toppings from '../data/topping.json'

@Injectable()
export class SeedService {
  constructor(
    @Inject('UserRepository')
    private userRepository: Repository<User>,
    @Inject('PizzaRepository')
    private pizzaRepository: Repository<Pizza>,
    @Inject('SizeRepository')
    private sizeRepository: Repository<Size>,
    @Inject('ToppingRepository')
    private toppingRepository: Repository<Topping>,
  ) {}

  // USER
  async seedUser(): Promise<User[]> {
    return await this.userRepository.save(users)
  }

  async findUser(): Promise<User[]> {
    return await this.userRepository.find()
  }

  //PIZZA
  async seedPizza(): Promise<Pizza[]> {
    return await this.pizzaRepository.save(pizzasjson)
  }

  async findPizza(): Promise<Pizza[]> {
    return await this.pizzaRepository.find()
  }

  //SIZE
  async seedSize(): Promise<Size[]> {
    return await this.sizeRepository.save(sizes)
  }

  async findSize(): Promise<Size[]> {
    return await this.sizeRepository.find()
  }

  //TOPPING
  async seedTopping(): Promise<Topping[]> {
    return await this.toppingRepository.save(toppings)
  }

  async findTopping(): Promise<Topping[]> {
    return await this.toppingRepository.find()
  }
}
