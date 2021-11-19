import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { Order } from '../order/order.entity'
import { Pizza } from '../pizza/pizza.entity'
import { Size } from '../size/size.entity'
import { Topping } from '../topping/topping.entity'

@Entity('Order_Pizza_Size')
export class OrderPizzaSizeTopping {
  @PrimaryColumn('uuid')
  order_id?: string

  @PrimaryColumn('uuid')
  pizza_id?: string

  @PrimaryColumn()
  size_id?: number

  @ManyToOne(() => Order, (order) => order.pizzaSizeToppings, { primary: true })
  @JoinColumn({ name: 'order_id' })
  order?: Order

  @ManyToOne(() => Pizza, (pizza) => pizza.pizzaSizeToppings, {
    primary: true,
  })
  @JoinColumn({ name: 'pizza_id' })
  pizza?: Pizza

  @ManyToOne(() => Size, (size) => size.pizzaSizeToppings, {
    primary: true,
  })
  @JoinColumn({ name: 'size_id' })
  size?: Size

  @ManyToMany(() => Topping, (topping) => topping.orderPizzaSizeToppings, {
    cascade: true,
  })
  @JoinTable({ name: 'Topping_Order' })
  toppings?: Topping[]
}
