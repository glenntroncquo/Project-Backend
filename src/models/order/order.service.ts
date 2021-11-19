import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Pizza } from '../pizza/pizza.entity'
import { User } from '../user/user.entity'
import { Order } from './order.entity'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { OrderORM } from './order.orm'
import { Topping } from '../topping/topping.entity'

@Injectable()
export class OrderService {
  constructor(
    @Inject('OrderRepository') private orderRepository: Repository<Order>,
    @Inject('OrderPizzaSizeRepository')
    private orderPizzaSizeRepository: Repository<OrderPizzaSizeTopping>,
    @Inject('PizzaRepository')
    private pizzaRepository: Repository<Pizza>,
  ) {}

  async placeOrder(orderORM: OrderORM[]) {
    //Get the user from request
    let user: User = { user_id: '59b1d72f-e34c-482e-ac5f-8e67fb5c7f5a' }

    //Get pizzaIds from request
    const pizzaIds = orderORM.map((order) => order.pizza_id)

    //Get pizzas from db to calculate the price and add to order
    const pizzas = await this.pizzaRepository
      .createQueryBuilder('pizza')
      .where('pizza.pizza_id IN (:pizzaIds)', { pizzaIds })
      .getMany()

    //Create the order
    const order: Order = {
      delivery_date: new Date(),
      order_date: new Date(),
      //Calculate total price from all pizzas
      price: pizzas.reduce((total, currVal) => total + currVal.price, 0),
      user: user,
    }
    //If price below or equal to 15 -> delivery cost 5
    order.price <= 15 ? (order.delivery_cost = 5) : (order.delivery_cost = 0)

    //Save order + id
    const result = await this.orderRepository.save(order)
    const order_id = result.order_id

    let toppings: Array<Array<Topping>>

    //Return an arrray of an array with toppings -> Each pizza can have
    toppings = orderORM.map((order) =>
      order.topping_ids.map((topping_id) => {
        let topping: Topping = new Topping()
        topping.topping_id = topping_id
        return topping
      }),
    )

    //Save into many to many relation
    let orderPizzaSizeTopping: OrderPizzaSizeTopping[] = pizzas.map(
      (pizza, index) => ({
        pizza_id: pizza.pizza_id,
        order_id: result.order_id,
        size_id: orderORM[index].size_id,
        toppings: toppings[index],
      }),
    )

    //Save into many to many relation
    await this.orderPizzaSizeRepository.save(orderPizzaSizeTopping)

    //Return order from db
    return await this.orderRepository
      .createQueryBuilder('order')
      .select('order.order_id')
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoinAndSelect('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .innerJoinAndSelect('pizzaSizeTopping.toppings', 'topping')

      .where('order.order_id = :order_id', { order_id })
      .getOne()
  }

  async getAll() {
    return await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.order_id', 'order.order_date'])
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .orderBy('order.order_date', 'DESC')
      .getMany()
  }

  async getOne(order_id: string) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.order_id', 'order.order_date'])
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .where('order.order_id = :order_id', { order_id })
      .getOne()
  }

  async getAllUser(user_id: string) {
    return await this.orderRepository
      .createQueryBuilder('order')
      .select(['order.order_id', 'order.order_date'])
      .addSelect(['user.user_id', 'user.name', 'user.lastname'])
      .innerJoin('order.user', 'user')
      .addSelect('pizzaSizeTopping.order_id')
      .innerJoin('order.pizzaSizeToppings', 'pizzaSizeTopping')
      .innerJoinAndSelect('pizzaSizeTopping.pizza', 'pizza')
      .addSelect(['size.size_name', 'size.price'])
      .innerJoin('pizzaSizeTopping.size', 'size')
      .orderBy('order.order_date', 'DESC')
      .where('order.user_id = :user_id', { user_id })
      .getMany()
  }
}
