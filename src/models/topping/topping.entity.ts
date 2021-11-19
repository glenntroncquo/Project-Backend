import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'

@Entity('Topping')
export class Topping {
  @PrimaryGeneratedColumn('uuid')
  topping_id?: string
  @Column()
  name?: string
  @Column()
  img_url?: string
  @Column()
  type?: string
  @Column()
  price?: number

  @ManyToMany(() => OrderPizzaSizeTopping, orderPizzaSizeTopping => orderPizzaSizeTopping.toppings)
  orderPizzaSizeToppings?: OrderPizzaSizeTopping[]

}
