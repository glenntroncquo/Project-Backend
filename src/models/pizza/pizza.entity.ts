import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderPizzaSizeTopping } from '../order_pizza/order.pizza.size.entity'

@Entity('Pizza')
@ObjectType()
export class Pizza {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  pizza_id?: string
  @Column()
  @Field()
  name?: string
  @Column()
  @Field()
  description?: string
  @Column()
  @Field()
  stock?: number
  @Column()
  @Field()
  price?: number
  @Column()
  @Field()
  img_url?: string

  @OneToMany(() => OrderPizzaSizeTopping, (orders) => orders.pizza)
  pizzaSizeToppings?: OrderPizzaSizeTopping[]
}
