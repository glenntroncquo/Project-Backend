import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'
import { User } from '../user/user.entity'

@Entity('Order')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id?: string
  @Column()
  price?: number
  @Column()
  order_date?: Date
  @Column()
  delivery_date?: Date
  @Column()
  delivery_cost?: number

  @ManyToOne(() => User, (user) => user.orderConnection)
  @JoinColumn({ name: 'user_id' })
  user?: User

  @OneToMany(() => OrderPizzaSizeTopping, (orders) => orders.order)
  pizzaSizeToppings?: OrderPizzaSizeTopping[]
}
