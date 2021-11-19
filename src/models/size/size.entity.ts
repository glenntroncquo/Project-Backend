import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'

@Entity('Size')
export class Size {
  @PrimaryGeneratedColumn('increment')
  size_id?: number
  @Column()
  size_name?: string
  @Column()
  price?: number

  @OneToMany(() => OrderPizzaSizeTopping, (order) => order.size)
  pizzaSizeToppings?: OrderPizzaSizeTopping[]
}
